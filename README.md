# xstatePrez

![Tests status](https://github.com/rbung/xstatePrez/actions/workflows/main.yml/badge.svg)

An [XState](https://xstate.js.org/) presentation

## Slides

Slides are available on the `./Slides` directory

## Run the app

The presentation needs an [Node.js](https://nodejs.org/) installation

```bash
# install the dependencies
npm install
# run the app in dev mode
npm run dev
```

## Run the test

This presentation uses [Cypress](https://www.cypress.io/) to run the tests.

```bash
# UI mode
npx cypress open
```

or

```bash
# Headless mode (for CICD)
npx cypress open
```
