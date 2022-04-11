# Cypress

## Useful links for testing testframework:

### For ux:

https://demoqa.com/select-menu
https://demoqa.com/automation-practice-form

### For api:

https://gorest.co.in

### Documentation:

https://docs.cypress.io/api/commands/visit

## Start using cypress framework

```shell
npm init -y
npm install cypress --save-dev
```

## Run cypress

```shell
npx cypress open
```

or configure run commands to package.json:
"scripts": {
"cy:run:watch": "npx cypress open",
"cy:run:chrome": "cypress run --browser chrome",
"cy:run:firefox": "cypress run --browser firefox",
"cy:run": "cypress run"
}

and then run them example:

> npm run cy:run

optional, give baseUrl

```shell
npx cypress open --config baseUrl=https://www.google.com
```

and use it like
cy.visit("/");

### $$$ See Dashboard documentation $$$

https://docs.cypress.io/guides/dashboard/introduction

## TypeScript

```shell
npm install --save-dev typescript
```

Then create tsconfig.json and add:

> {

"compilerOptions": {
"target": "es5",
"lib": ["es5", "dom"],
"types": ["cypress", "node"],
"resolveJsonModule": true,
"esModuleInterop": true
},
"include": ["**/*.ts", "../../node_modules/cypress", "cypress/*/*.ts"]

> }

# Default commands

> cy.visit()

> cy.get().click()

> cy.request({

    method: 'POST',
    form: true,
    url: `${baseRequestUrl}` + `/public/v2/users`,
    headers: headers,
    body: payload
    }).then(response => {
    const target = response.body.email;
    })

### Different resolutions

> cy.viewport('iphone-5')

# Custom commands

cypress/support/commands.js

> Cypress.Commands.add("login", () => {

    //your code here

> })

Rename support/index.js -> support/index.ts

Add:

> declare global {

    namespace Cypress {
      interface Chainable {
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         */
        login(): Chainable<Element>
        logout(): Chainable<Element>
        example(): Chainable<Element>
        exampleCustomCommand(): Chainable<Element>
      }
    }

> }

Use them in your test like :

> > > cy.login();

> > > cy.exampleCustomCommand();

# Plugin & aws-sdk access

Call aws-sdk functions via cypress plugin so that aws-sdk gets aws access from
os-level and you don't have to pass permissions as environment variable.

Create cy.task function to plugin/index, example:

module.exports = (on, config) => {
on("task", {
async getUserPassword(user: User) {
await getSecretsFromSecretManager(user.secretId, user.secretName) //Calling function which use aws-sdk
return user;
}
});

Then use then function on tests:
cy.task("getUserPassword", user: User).then....

# Plugins & libraries

## Faker (optional)

Helps generating random values for testing. Noticed that version 5.5.3 works fine, newer might not work at all.

```shell
npm i faker@5.5.3 --save-dev
```

import faker = require('faker');

## Chance (optional)

Generating randoms

```shell
npm i chance --save-dev
```

## AWS

```shell
npm i amazon-cognito-identity-js --save-dev
```

> import { CognitoUser } from "amazon-cognito-identity-js";

```shell
npm i aws-sdk --save-dev
```

> var AWS = require('aws-sdk');

# Cross-origin workaround:

cypress.json:

> "chromeWebSecurity": false

# Reporter

```shell
npm i cypress-mochawesome-reporter --save-dev
```

cypress.json

    "projectId": "9x3nar", <- for $Dashboard
    "reporter": "mochawesome",
    "reporterOptions": {
        "charts": true,
        "overwrite": false,
        "html": false,
        "json": true,
        "reportDir": "cypress/results"
        }

# Merge results to json

npm i mochawesome-merge --save-dev

run: npx mochawesome-merge cypress/results/\*.json > cypress/results/output.json

# Generate html -page

npx marge cypress/results/output.json --reportDir cypress/results/ --inline

# Environment

## .env (optional)

```shell
npm install dotenv --save-dev
```

OR

```shell
npm install --save-dev dotenv cypress-dotenv
```

Then create .env -file

> ENV_VARIABLE="examplesomething"

Use variable:

> Cypress.env("ENV_VARIABLE")
