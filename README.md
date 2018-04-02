# Empurrando Juntos

[![build status](https://gitlab.com/empurrandojuntos/frontend/badges/master/build.svg)](https://gitlab.com/empurrandojuntos/frontend/commits/master)
[![coverage report](https://gitlab.com/empurrandojuntos/frontend/badges/master/coverage.svg)](https://gitlab.com/empurrandojuntos/frontend/commits/master)

Este projeto é o frontend da plataforma Empurrando Juntos e foi criado com [Angular CLI](https://github.com/angular/angular-cli) versão 1.4.4.

Para informações sobre o desenvolvimento do backend, acesso o [reposiótio correspondente](https://gitlab.com/empurrandojuntos/backend/).

## Desenvolvimento
Os processos de desenvolvimento e deploy usam Docker CE. Se você ainda não o tem instalado, consulte [esta documentação](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) para ter a versão mais recente.

Para levantar seu servidor local, rodeo seguinte comando e acesse [localhost:4200](http://localhost:4200/):

`docker-compose up`

### Execução de comandos no Angular CLI
A linha de comando do Angular está disponível dentro do container de desenvolvimento. Para acessar essa interface, execute:

`docker-compose exec angular bash`

### Criação de novos componentes
Para criar novos componentes no projeto, use o Angular CLI:

`ng generate component component-name`

Esse comando também pode ser usado para criar outros elementos de projeto:

`$(npm bin)/ng generate directive|pipe|service|class|guard|interface|enum|module`

### Uso e criação de branchs para fixes e novas implementações
Este projeto segue as a política de branches [proposta aqui](http://nvie.com/posts/a-successful-git-branching-model/).

As normas mais importantes são:
- `master` sempre reflete o estado mais recente e "pronto para produção" da plataforma
- `develop` tem as última melhorias prontas para uso, mas ainda não aprovadas para o próximo release
- commits feitos diretamente em `master` são proibidos
- `master` recebe novos desenvolvimentos com merges a partir de `develop`
- novos features e fixes devem ser desenvolvidos em branchs próprias. Tais branchs devem ser forkadas a partir de `develop`. Quando esses desenvolvimentos são concluídos, eles são mergeados de volta para `develop`. Idealmente, essa volta só acontece depois de o código ser aprovado


# Angular CLI related info
## Development server

Run `$(npm bin)/ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `$(npm bin)/ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `$(npm bin)/ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `$(npm bin)/ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `$(npm bin)/ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
