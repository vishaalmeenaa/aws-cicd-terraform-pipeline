variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Prefix used for resource names"
  type        = string
  default     = "cicd-demo"
}

variable "container_port" {
  description = "Port the application listens on"
  type        = number
  default     = 3000
}

variable "image_tag" {
  description = "Docker image tag to deploy (the pipeline passes the Git commit SHA)"
  type        = string
  default     = "latest"
}

variable "alert_email" {
  description = "Optional email for CloudWatch alarm notifications (leave empty to skip)"
  type        = string
  default     = ""
}
