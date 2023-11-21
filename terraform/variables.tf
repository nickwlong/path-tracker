variable "access_key" {
  description = "Access key of AWS IAM user with the required permissions of SQS Queue creation and deletion"
}

variable "secret_key" {
  description = "Secret key of AWS IAM user with the required permissions of SQS Queue creation and deletion"
}

variable "sqs_name" {
  description = "Name of the sqs queue to be created. You can assign any unique name for the Queue"
  default = "my-first-sqs"
}