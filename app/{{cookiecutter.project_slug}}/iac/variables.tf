variable "needed_apis" {
  description = "List of APIs needed"
  type        = list(string)
  default = [
    "compute.googleapis.com", # Needed for network access
    "iam.googleapis.com",     # Needed for managing permissions
    "run.googleapis.com",     # Cloud Run API
  ]
}
