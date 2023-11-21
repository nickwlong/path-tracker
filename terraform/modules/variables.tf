variable "queue_name" {
  description = "Name of the sqs queue to be created. You can assign any unique name for the Queue"
  default = "my-first-sqs"
}

variable "retention_period" {
  type = number
}

variable "visibility_timeout" {
  type = number
}

variable "receive_count" {
  type = number
}

# variable "lambda_consumer" {
#   type = string
# }

variable "lambda_producer" {
  type = string
}