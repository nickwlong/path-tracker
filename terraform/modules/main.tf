resource "aws_sqs_queue" "base_queue" {
 name                        = var.queue_name
 message_retention_seconds   = var.retention_period
 visibility_timeout_seconds  = var.visibility_timeout
 redrive_policy              = jsonencode({
                                   "deadLetterTargetArn" = aws_sqs_queue.deadletter_queue.arn,
                                   "maxReceiveCount" = var.receive_count
                               })
}
 
resource "aws_sqs_queue" "deadletter_queue" {
 name                        = "${var.queue_name}-DLQ"
 message_retention_seconds   = var.retention_period
 visibility_timeout_seconds  = var.visibility_timeout
}

 
resource "aws_iam_policy" "producer_policy" {
 name        = "SQS_${var.queue_name}_producer_policy"
 description = "Attach this policy to producers for ${var.queue_name} SQS queue"
 policy      = data.aws_iam_policy_document.producer_policy.json
}
 
data "aws_iam_policy_document" "producer_policy" {
 statement {
   actions = [
     "sqs:SendMessage"
   ]
   resources = [
     aws_sqs_queue.base_queue.arn
   ]
 }
}
 
resource "aws_iam_role_policy_attachment" "register_interest_SQS_producer" {
 role       = "aws_iam_role.${var.lambda_producer}-role.name"
 policy_arn = aws_iam_policy.producer_policy.arn
}
 
resource "aws_iam_policy" "consumer_policy" {
 name        = "SQS_${var.queue_name}_consumer_policy"
 policy      = data.aws_iam_policy_document.consumer_policy.json
}
 
data "aws_iam_policy_document" "consumer_policy" {
 statement {
   actions = [
     "sqs:DeleteMessage",
     "sqs:ReceiveMessage"
   ]
   resources = [
     aws_sqs_queue.base_queue.arn
   ]
 }
}
 
# resource "aws_iam_role_policy_attachment" "register_interest_SQS_producer" {
#   role       = "aws_iam_role.${var.lambda_consumer}-role.name"
#   policy_arn = aws_iam_policy.consumer_policy.arn
# }


