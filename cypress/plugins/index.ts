/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
import {
  getSecretsFromSecretManager,
  updateSecretToSecretManager
} from "../support/aws-helper";
import { User } from "../support/user";
import * as dotenv from "dotenv";
import { getConfigValue } from "../../test-env-config-reader";
dotenv.config();
module.exports = (on, config) => {
  on("task", {
    async getUserPassword(user: User) {
      await getSecretsFromSecretManager(user.secretId, user.secretName)
        .then((secret: string) => {
          user.password = secret;
        })
        .catch((err) => {
          throw err;
        });
      return user;
    },
    async updatePasswordToSecretManager(user: User) {
      await updateSecretToSecretManager(user.secretName, user.secretId)
        // .then((response) => {
        //   //resolve retuns arn, name, versionid
        //   console.log(response);
        // })
        .catch((err) => {
          throw err;
        });
      return user;
    },
    log(message) {
      console.log(message);
      return null;
    }
  });

  // copy any needed variables from process.env to config.env
  config.env.USER_POOL_ID = getConfigValue("UserPoolId");
  config.env.CLIENT_ID = getConfigValue("UserPoolClientId");
  config.env.CYPRESS_BASE_URL = getConfigValue("BaseDomain");
  config.baseUrl = "https://" + getConfigValue("BaseDomain");
  // do not forget to return the changed config object!
  return config;
};
