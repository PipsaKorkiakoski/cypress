/* eslint-disable @typescript-eslint/no-namespace */

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// "supportFile" configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import { User } from "./user";

// Alternatively you can use CommonJS syntax:
// require("./commands")
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Cognito identity -commands
       */
      signin(user_name: string, password: string): Promise<void>;
      signout(): Promise<void>;
      changepassword(testuser: User): Promise<User>;
      /**
       * For ui flow
       */
      login(testuser: User): Chainable;
      /**
       * Commands with aws-helper (aws-sdk)
       */
      getUserInformation(testuser: User): Promise<User>;
    }
  }
}
