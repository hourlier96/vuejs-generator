import json
import os
import shutil
import git
import requests

import hooks_modules.utils as utils


def checkSidebarOption():
    """
    Remove Sidebar from the project if not selected
    """
    # Remove Sidebar from the project if not selected
    path_to_remove = "{% if not cookiecutter.sidebar %} src/components/NavigationDrawer.vue {% endif %}"
    path = path_to_remove.strip()
    if path and os.path.exists(path):
        os.unlink(path)
        utils.remove_reference_from_project("NavigationDrawer")
        utils.remove_function_from_project(
            os.path.abspath("src/App.vue"), "adaptMargin"
        )


def checkNavBarOption():
    """
    Remove Navbar from the project if not selected
    """
    # Remove Navbar from the project if not selected
    path_to_remove = (
        "{% if not cookiecutter.navbar %} src/components/NavBar.vue {% endif %}"
    )
    path = path_to_remove.strip()
    if path and os.path.exists(path):
        os.unlink(path)
        utils.remove_reference_from_project("NavBar")


def checkBottomNavOption():
    """
    Remove BottomNav from the project if not selected
    """
    # Remove BottomNav from the project if not selected
    path_to_remove = (
        "{% if not cookiecutter.footer %} src/components/BottomNav.vue {% endif %}"
    )
    path = path_to_remove.strip()
    if path and os.path.exists(path):
        os.unlink(path)
        utils.remove_reference_from_project("BottomNav")


def checkRepositoryNameOption(repo_name):
    """
    Check if repository_name is empty,
    if not init & fill empty git repo
    """
    repo_name = "{{ cookiecutter.repository_name }}"
    if not repo_name:
        return

    g = git.cmd.Git(repo_name)
    g.init()
    g.remote("add", "origin", f"git@github.com:{repo_name}.git")
    g.add(".")
    g.commit("-m", "Commit made by cookiecutter")
    g.branch("-M", "main")

    g.branch("develop")
    g.merge("develop")

    g.branch("uat")
    g.merge("uat")

    g.config("init.defaultBranch", "develop")

    g.push("-u", "origin", "--all")
    print(f"Pushed to remote repository: https://github.com/{repo_name}")


def enableBranchesProtection(repo_name, github_token):
    """
    Use GITHUB_TOKEN to enable & set branches protection
    """
    owner = repo_name.split("/")[0]
    repo = repo_name.split("/")[1]
    base_url = f"https://api.github.com/repos/{owner}/{repo}/branches"

    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {github_token}",
    }

    # https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28#update-branch-protection
    # Update the config according to your needs
    body = json.dumps(json.load(open("./hooks_modules/branch_protection.json")))

    branches = ["develop", "uat", "main"]
    for branch in branches:
        url = f"{base_url}/{branch}/protection"
        response = requests.put(url, body, headers=headers)
        if response.status_code != 200:
            print(f"Failed to activate protection for branch {branch}:")
            print(response.json())
            break

    shutil.rmtree("hooks_modules")


def checkAsContainerOption():
    """
    Check if as_container is empty,
    if not init & fill empty git repo
    """
    as_container = "{% if cookiecutter.as_container %}y{% endif %}"
    if not as_container:
        print("Removing docker requirements...")
        os.remove("Dockerfile")
        os.remove("Dockerfile.prod")
        os.remove("nginx.conf")
        os.remove(".dockerignore")
        shutil.rmtree(".cloudbuild")
