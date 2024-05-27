# This file is used to initialize the deployment

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  project = "{{ cookiecutter.gcloud_project }}"
}

resource "google_artifact_registry_repository" "cookiecutter-repository" {
  location      = "europe"
  repository_id = "cookiecutter-template"
  description   = "Repository for template generation"
  format        = "DOCKER"
}

resource "null_resource" "build_push_image" {
  provisioner "local-exec" {
    command = <<-EOT
      gcloud auth configure-docker
      docker build --platform linux/amd64 -t "europe-docker.pkg.dev/{{ cookiecutter.gcloud_project }}/cookiecutter-template/{{ cookiecutter.project_slug.replace('_', '-') }}" -f Dockerfile.prod .
      docker push "europe-docker.pkg.dev/{{ cookiecutter.gcloud_project }}/cookiecutter-template/{{ cookiecutter.project_slug.replace('_', '-') }}"
    EOT
  }
}

resource "google_cloud_run_service" "frontend_service" {
  name     = "{{ cookiecutter.project_slug.replace('_', '-') }}"
  location = "{{ cookiecutter.gcloud_region }}"

  template {
    spec {
      containers {
        image = "europe-docker.pkg.dev/{{ cookiecutter.gcloud_project }}/cookiecutter-template/{{ cookiecutter.project_slug.replace('_', '-') }}"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [null_resource.build_push_image]
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.frontend_service.location
  project  = google_cloud_run_service.frontend_service.project
  service  = google_cloud_run_service.frontend_service.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_secret_manager_secret" "frontend_secret" {
  secret_id = "{{ cookiecutter.project_slug.replace('_', '-') }}"

  replication {
    automatic = true
  }
}

data "google_project" "current" {}
resource "google_secret_manager_secret_version" "secret-version" {
  secret = google_secret_manager_secret.frontend_secret.id

  secret_data = <<EOT
VITE_BASE_URL="https://{{ cookiecutter.project_slug.replace('_', '-') }}-${data.google_project.current.number}.{{cookiecutter.gcloud_region}}.run.app/api"
  EOT
}

# Cloud Build Trigger exemple
resource "google_cloudbuild_trigger" "cloudbuild_trigger" {
  name = "{{ cookiecutter.project_slug.replace('_', '-') }}"
  trigger_template {
    branch_name = "main"
    repo_name   = "{{ cookiecutter.repository_name }}"
  }
  filename = ".cloudbuild/cloudbuild.yaml"
}
