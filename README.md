# VueJS Template Generation

This repository provides a [VueJS](https://vuejs.org) base stack:

- Customizable layout (Navbar, Sidebar, Footer) & generic components with [Vuetify](https://vuetify.com)
- API axios client wrapped into reusable service
- Form validation & unit tests
- Dark theme & i18n support

This templates is:

- Based on [cookiecutter](https://www.cookiecutter.io/)
- Auto-pushable on Github when generated
- Auto-deployable on [Cloud Run](https://cloud.google.com/run).

It assumes that the template is pushed on a separate Github repository

## Installation

- Install dependencies

  ```bash
  cd vuejs-generator
  python3 -m pip install -r requirements.txt
  ```

- (Optional): Add a github access token to .env file if you want the branch protection to be automated at generation

```bash
# .env content ...
GITHUB_ACCESS_TOKEN="<PERSONAL_ACCESS_TOKEN>"
```

## Generate Project

```bash
cookiecutter vuejs-generator/app   # Will ask your needs from cookiecutter.json
```

- **'repository_name'** allows you to specify an empty-existing Git repository to push the template on.

  ```bash
  <github_username>/<repo_name>  # Required format

  # 1. Ensure you have corrects SSH rights & access

  # 2. This will also set branch protection if you specified GITHUB_ACCESS_TOKEN variable in .env.
  # Change settings as your convenience in hooks_modules/branch_protection.json
  ```

- **'project_name'** is the name on the top of ReadMe.

- **'project_slug'** is the name of the generated folder

- **'description'** will be added under the project name in the ReadMe.

- **'maintainer'** has an informativ goal (not used in the template)

- **'navbar'** integrate a navbar with i18n support, and a dark mode switch.

- **'sidebar'** integrate a left sidebar with navigation.

- **'footer'** integrate a footer.

- **'as_container'** provide local dockerization and auto deploy on Cloud Run

## CICD

Github action is provided for testing the template generation, install dependencies, runs dev server & unit tests.

You can try github actions locally from root folder using [act](https://nektosact.com/):

```bash
act -j test-run-template --rm -W .github/workflows/template-generation.yaml
```

## TODO

Deployment:

- Add a specific database user and not postgres

Frontend:

- Add User entity into TableView
- Add edit action into TableView
