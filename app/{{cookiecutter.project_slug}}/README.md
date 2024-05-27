# {{cookiecutter.project_name}}

{{ '=' * cookiecutter.project_name|length }}

## Description

{{cookiecutter.description}}

[GCP Project](https://console.cloud.google.com/home/dashboard?authuser=0&project={{cookiecutter.gcloud_project}}&supportedpurview=project)

## Template Stack

- [Vue3 with Composition API](https://vuejs.org/guide/introduction.html)
- [Vuetify](https://vuetifyjs.com/en/getting-started/installation/)
- [Pinia](https://pinia.vuejs.org/)
- [piniaPluginPersistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate/)

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

## Deployment

:warning: Everything under this section assumes you specified a repository to push to, and choosed 'yes' to "as_container" question. Otherwise update the main.tf according yo your needs before running  :warning:

### Initialisation

To deploy the infrastructure, make sure ADC is configured correctly.

The main.tf will deploy:

- Image into the Artifact Registry used by Cloud Run
- Cloud Run service
- Secret in Secret Manager

```bash
# Ensure your .env content is the deployed version before running
cd {{ cookiecutter.project_slug }}
terraform init
terraform apply

```

## CI/CD

### CI with Github Actions

Use .github/workflows/lint.yaml **by enabling Github Actions API** in your repository

This will run linting for every Pull Request on develop, uat and main branches

### CD with Cloud Build & Cloud Run

.cloudbuild/cloudbuild.yaml is used automatically to deploy to Cloud Run according to your Cloud Build trigger configuration

*Requirements*:

- From the trigger created by Terraform, give Github repository access to Cloud Build

- Copy .env into the secret '{{ cookiecutter.project_slug.replace('_', '-') }}'' to ensure Cloud Build will have the correct environement.

- Roles:
  - Cloud Build Service Account has Cloud Run Admin role
  - Cloud Build Service Account has Secret Manager Secret Accessor role

## Maintainers

{{cookiecutter.maintainer}}
