| Environment | ej-front CI Status | ej-server CI Status |  Website |
|:-:|:-:|:-:|:-:|
| Development | [![pipeline status](https://gitlab.com/ejplatform/ej-front/badges/develop/pipeline.svg)](https://gitlab.com/ejplatform/ej-front/commits/develop)  | [![pipeline status](https://gitlab.com/ejplatform/ej-server/badges/develop/pipeline.svg)](https://gitlab.com/ejplatform/ej-server/commits/develop) | [dev.ejplatform.org](http://dev.ejplatform.org) |
| Production | [![pipeline status](https://gitlab.com/ejplatform/ej-front/badges/master/pipeline.svg)](https://gitlab.com/ejplatform/ej-front/commits/master) | [![pipeline status](https://gitlab.com/ejplatform/ej-server/badges/master/pipeline.svg)](https://gitlab.com/ejplatform/ej-server/commits/master) | [ejplatform.org](https://ejplatform.org) |

# ej-front

This project is the frontend of [ejplatform](https://ejplatform.org) made with [Angular CLI](https://github.com/angular/angular-cli)  v1.4.4.

For more information about the backend of ejplatform, please access the [ej-server](https://github.com/ejplatform/ej-server) project.

## Themes

This project support themes configuration. To create a new theme follow the steps bellow.

1. Create the theme folder inside themes;
1. Create at least the file `_skin.scss` inside the theme folder to make it work properly;
1. Configure application to use the new theme, e.g.:

  ```bash
  npm config set empurrandojuntos:theme custom-theme
  ```

The `_skin.scss` file contain all the available sass variables that could be replaced in your theme to make your customization possible.

### Themes in Development

To run the application with docker-compose you need to define the theme variable to containers as follow:

1. Build the application with the desired theme:

  ```bash
  THEME=custom-theme docker-compose build
  ```
1. Initialize the application

  ```bash
  sudo docker-compose up
  ```

### Themes in Production

Build all available themes with the command:

```
npm run build-all
```

## Development

The development and deployment process use [Docker CE](https://www.docker.com/). If you don't have Docker CE installed, please follow [this documentation](https://docs.docker.com/install/) in order to install the latest version.

To start the local server, use the following command and access [localhost:4200](http://localhost:4200/):

```bash
sudo docker-compose up
```

### Executing Angular CLI Commands

The Angular CLI is available in the development container. To access the development container, execute:

```bash
sudo docker-compose exec angular bash
```

### Creating New Components

To create new project components, use the Angular CLI:

```bash
sudo docker-compose exec angular ng generate <component> <component-name>
```

This command can be used to create other Angular elements:

```bash
sudo docker-compose exec angular ng generate directive|pipe|service|class|guard|interface|enum|module
```

### Branch Policy

This project follow the [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/) branch policy.

The most important rules are:

* `master` always reflects the most recent ready to production state of the project;
* `develop` have the latest updates ready to use, but not yet approved to the next release;
* Direct commits to `master` are prohibited;
* `master` receives new features with pull requests from `develop`;
* New features and fixes must be developed in their own branches. These branches must be forked from the `develop`. After the feature/fix development, the commits are merged back to `develop` with pull requests.

# Angular CLI Related Info

## Development Server

Run `$(npm bin)/ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `$(npm bin)/ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running Unit Tests

Run `$(npm bin)/ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-end Tests

Run `$(npm bin)/ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further Help

To get more help on the Angular CLI use `$(npm bin)/ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
