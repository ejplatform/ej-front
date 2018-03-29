#!/usr/bin/env bash

npm install
npm run theme:setup

$(npm bin)/ng serve --host 0.0.0.0 --port 4200 --environment=dev
