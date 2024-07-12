<h1 align="center">Repair Technician Training Platform <br/></h1>

<p align="center">A Mobile Repair Service That Trains Repair Technicians to Fix Computers While Exceeding Customer Expectations</p>

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Setup Instructions](setup-instructions)
    1. [Install Dependencies](install-dependencies)
    2. [Dev Commands List](dev-commands-list)
    3. [Testing](testing)
    4. [Logs](logs)
    5. [Debugging](debugging)
        1. [Debugging with VS Code](debugging-with-vs-code)
    6. [Troubleshooting](troubleshooting)
    7. [Learn More](learn-more)
    8. [How to Contribute](how-to-contribute)
   

## Introduction

This project aims to guide entry-level repair technicians from repairing simple devices like vacuum cleaners to repairing more complex devices like computers. We want to build a path from "never fixed anything in my life" to "able to fix anything and everything" while providing a high-quality, easy-to-use experience for customers

## Project Structure

```
repair
├── docker
├── public
├── src
│ └── app
│ └── db
```

## Setup Instructions

### Install Dependencies

1. Make sure you have [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed, as well as [make](https://stackoverflow.com/a/32127632) if you use Windows (Linux and MacOS distributives have it by default).
2. Copy `.env.example` into `.env` and rewrite it with your own credentials (could be left default ones for dev environment).
3. Run `make init` in order to build and start an application. This should be run only once at the start and after that just manipulate `make down` and `make up`.
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Dev Commands List

- `make build` - builds everything needed for development.
- `make up` - starts all containers.
- `make down` - stops and removes all containers.
- `make docker-down-all` - stops and removes all containers and also **_removes mounted volumes_** (be careful with this command as it deletes e.g. database or any other mounted folders/files).
- `make restart` - restarts all containers.
- `make init` - initialize everything from the scratch.
- `make check` - check code for errors and runs tests.
- `make npm-install` - runs `npm install` inside container.
- `make npm-install-package p=package_name` - installs a npm package inside container (replace "package_name" with the target package name).
- `make npm-remove-package p=package_name` - removes a npm package inside container (replace "package_name" with the target package name).
- `make prisma-generate` - regenerates [prisma client](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction#5-evolving-your-application). You need to do that whenever you make changes to your database that are reflected in the Prisma schema.
- `make sh c=container_name` - opens a bash terminal inside "container_name" (this can be found within `docker compose ps -a`).

### Testing

- To make all checks (tests, lints) run `make check`.
- In order to run only linter run `make lint`.
- In order to run only all tests run `make test`.
- To use more complex command you can just get inside container `make sh c=repair-app` and do your stuff.

### Logs

Error logs can be obtained from `/var/log/error.log` inside container (`make sh c=repair-app`).

Application logs can be seen by running `make logs`.

### Debugging

#### Debugging with VS Code

Create a file named `.vscode/launch.json` at the root of your project with the following content:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Repair: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Repair: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Repair: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

Now go to the Debug panel (Ctrl+Shift+D on Windows/Linux, ⇧+⌘+D on macOS), select a launch configuration, then press F5 or select Debug: Start Debugging from the Command Palette to start your debugging session.

> Note: For `Repair: debug client-side` configuration you need to run `npm run dev` prio to a launch of this configuration.

### Troubleshooting

> If you have issues with a hot reload on Windows - add `.env.local` file to your root and put this line on it:

```
WATCHPACK_POLLING=true
```

Now, restar docker-compose with `make restart`.

---

> If you have an error

```
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

while running `make` command - you [need to install](https://apple.stackexchange.com/questions/254380/why-am-i-getting-an-invalid-active-developer-path-when-attempting-to-use-git-a) the `Xcode Command Line Tools` (run `xcode-select --install`) or reset it if has been already done (run `xcode-select --reset`).

## Learn More

To learn more about Repair, take a look at the following resources:

- [Project system design schema](https://lucid.app/lucidchart/eaf7af53-d0dc-4af1-8dbe-56b2f839225a/edit?viewport_loc=-1697%2C-508%2C3345%2C1996%2C0_0&invitationId=inv_809c0783-5a80-448b-895b-2602dcaa7604) - learn about our project's features and structure.

Feel free to [create an issue](https://github.com/O1SoftwareNetwork/repairs/issues/new) in case you see one.

## How to contribute

In order to contribute:

1. [Fork current repository](https://github.com/O1SoftwareNetwork/repairs/fork).
2. Clone your fork with `git clone [your-clone-repo-url]`. In order to get an url you need click on the `<> Code` button, and then copy needed link.
   Be sure that you clone **your fork**, not the original repository.
3. Add `O1SoftwareNetwork/repairs` repo as your remote - `git remote add upstream git@github.com:O1SoftwareNetwork/repairs.git`. After that, you can update your fork with the main repo easily with `git pull upstream`.
4. Create a new feature branch (e.g. `fix/signup` or `add/assignment-page`) - `git checkout -b fix/signup`.
5. After your job is done, commit and push your code into your repo feature branch - `git push origin fix/signup`. Make sure to push only to your forked repo.
6. Create a pull request **from your fork repo** from your feature branch into dev branch of [the main project repo](https://github.com/O1SoftwareNetwork/repairs).