# VueJS Template Generation

This repository provides a duplicable [VueJS](https://vuejs.org) code base:

- Customizable layout (Navbar, Sidebar, Footer) & generic components with [Vuetify](https://vuetify.com)
- API axios client wrapped into reusable service
- Form validation & unit tests
- Dark theme & i18n support

  [See ReadMe](app/{{cookiecutter.project_slug}}/README.md)

- - -

The template is

- Based on [cookiecutter](https://www.cookiecutter.io/)
- Auto-pushable on Github when generated
- Auto-deployable on [Cloud Run](https://cloud.google.com/run)

## Usage

**(Recommended)** Use [Stack generator module](https://pypi.org/project/stack-gen/) to generate a new code base from this template.

- - -
OR
- - -

Clone this repository and install dependencies

  ```bash
  cd vuejs-generator
  python3 -m pip install -r requirements.txt
  ```

(Optional): Add a github access token to .env file if you want the branch protection to be automated at generation

```bash
# .env content ...
GITHUB_ACCESS_TOKEN="<PERSONAL_ACCESS_TOKEN>"
```

Generate the code base

```bash
cookiecutter vuejs-generator/app   # Will ask your needs from cookiecutter.json
```

## Options

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
