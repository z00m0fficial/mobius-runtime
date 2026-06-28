terraform {
  required_version = ">= 1.6.0"
}

variable "environment" {
  type    = string
  default = "dp1"
}

output "mobius_runtime_service" {
  value = "mobius-runtime-${var.environment}"
}
