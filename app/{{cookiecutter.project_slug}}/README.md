# {{cookiecutter.project_name}}

{{ '=' * cookiecutter.project_name|length }}

## Description

{{cookiecutter.description}}

[GCP Project](https://console.cloud.google.com/home/dashboard?authuser=0&project={{cookiecutter.gcloud_project}}&supportedpurview=project)

## Template Stack

- [Vue3 with Composition API](https://vuejs.org/guide/introduction.html)
- [Vuetify](https://vuetifyjs.com/en/getting-started/installation/)
- [Axios client](https://axios-http.com/docs/intro)
- [Pinia](https://pinia.vuejs.org/)
- [piniaPluginPersistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate/)

## Project Setup

### Run locally

```sh
# WITHOUT DOCKER
npm install
npm run dev

# OR 

# WITH DOCKER
# Dev server (vite)
docker build -t <image>:<tag> -f Dockerfile .
docker run --name {{ cookiecutter.project_slug }} -p 5173:5173 <image>:<tag>

# Prod server (nginx)
docker build -t <image>:<tag> -f Dockerfile.prod .
docker run --name {{ cookiecutter.project_slug }} -p <host_port>:8080 <image>:<tag>  # Port forward to nginx

```

## Tests

```sh
npm run test:unit
npm run type-check
```

## Application structure

```bash
{{cookiecutter.project_slug}}
│
├── .cloudbuild                              - Cloud Build configuration
│   └── cloudbuild.yaml
│
├── .eslintrc.cjs                            - eslint rules configuration
│
├── .github                                  - Github Actions
│   └── workflows
│
├── Dockerfile
│
├── Dockerfile.prod                          - Used to build and deploy on Cloud Run
│
├── i18n                                     - Multi langage support configuration
│
├── iac                                      - Terraform resources
│
├── deploy.sh                                - Deployment script
│
├── index.html                               - Entrypoint
│
├── main.tf                                  - Terraform configuration for deployment
│
├── nginx.conf                               - Nginx conf used by Dockerfile.prod
│
├── src                                      - Web stuffs
│   ├── App.vue                                - Vue root component
│   ├── api                                    - Api Settings & axios wrapper
│   ├── assets                                 - Global css & images 
│   └── components
│       └── common                             - Reusable components (Form, Container, Table...)
│       └── BottomNav.vue
│       └── Navbar.vue
│       └── NavigationDrawer.vue               - Left Sidebar
│   ├── composables                            - Reusable JS wrappers
│   ├── helpers                                - Global utils
│   ├── main.ts                                - App global conf (i18n, store, router, themes...)
│   ├── middleware                             - Interceptor
│   ├── router                                 - Routes definitions
│   ├── stores                                 - Pinia store management
│   ├── types                                  - Custom/Missing types
│   └── views                                  - Pages
│
├── tests                                    - Unit Tests
```

## Formatting / Linting

The template is using [ESLint for VueJS](https://eslint.vuejs.org/).

By default, **auto formatting is enabled on save**.

You can run prettier formatting, but ensure eslint for VueJS is re-apply after.

## I18N

To add any new langage:

- Add new languages in JSON format to `i18n` directory
- Complete 'languages' & 'countries_info' variables in `i18n/index.js`

(see [vue-i18n](https://kazupon.github.io/vue-i18n/) for more documentation)

(see [vue-country-flag-next](https://www.npmjs.com/package/vue-country-flag-next) for country flags)

## Deployment

:warning: Everything under this section assumes you specified **a repository to push to**, a **gcloud project name**, and answered **'yes' to "as_container" question**.

### Initialisation

First, **make sure ADC is configured correctly.**

#### Start a first deployment

- [Connect your repository to Cloud Build](https://console.cloud.google.com/cloud-build/repositories/1st-gen;region={{cookiecutter.gcloud_region}}?authuser=0&project={{cookiecutter.gcloud_project}}&supportedpurview=project)

- Init required resources and start deployment:

```bash
gcloud components update && gcloud components install beta
./deploy.sh -e <dev|staging|prod> # Will get the correct .env.x file & inject variables

# Creates required resources & IAM permissions
# - Secret in Secret Manager filled with .env.dev
# - Cloud Storage bucket to store terraform state
# - Artifact registry repository to store Cloud Run images
# - Required IAM permissions for Cloud Build default SA
#     - run.admin
#     - artifactregistry.admin
#     - secretmanager.secretAccessor
#     - storage.admin
#     - serviceusage.serviceUsageAdmin
# 
# - Cloud Build trigger to run deployment on push

# Then it starts the Cloud Build trigger
```

Cloud Build is now ready to auto deploy new Cloud Run revision after each push

#### ...or re-deploy the app

```bash
./deploy.sh -e <dev|staging|prod> # Will get the correct .env.x file & inject variables

# - Replaces secret version content if it differs from .env.x
# - Runs the existing Cloud Build trigger
```

## CI/CD

### CI with Github Actions

[**Enable Github Actions API**](https://github.com/{{cookiecutter.repository_name}}/actions) in your repository

Actions are configured to run linting for every Pull Request on develop, uat and main branches

### CD with Cloud Build & Terraform

On push, .cloudbuild/cloudbuild.yaml will:

- Build and push new image
- re-apply the iac/main.tf infrastructure to ensure consistency
- Deploy the new Cloud Run revision

Use iac/main.tf to deploy new GCP resources if possible to make terraform aware of it

## Maintainers

{{cookiecutter.maintainer}}
