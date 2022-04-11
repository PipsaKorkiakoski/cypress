import { signin, signout, changepassword } from "./aws-auth";
import { User } from "./user";
import { createRandomPassword } from "./common-helper";

/*
 * Login with amazon-cognito-identity-js
 */
Cypress.Commands.add("signin", async (username, password): Promise<void> => {
  await signin(username, password);
  console.log("AccessToken: ");
  console.log(window.localStorage.getItem("accessToken"));
});

Cypress.Commands.add("signout", async () => {
  await signout();
});
Cypress.Commands.add(
  "changepassword",
  async (userObject: User): Promise<User> => {
    const new_password = createRandomPassword();
    console.log("New is password going to be: " + new_password);
    await changepassword(userObject.password, new_password);
    const secretString = `{"${userObject.secretName}":"${new_password}"}`;
    console.log("Updating secret to secret manager: " + secretString);
    userObject.secretName = secretString;
    userObject.password = new_password;
    return userObject;
  }
);

/*
 * For ui login
 */
// Cypress.Commands.add("login", (user) => {
//   cy.get("#emailInput").type(user.user_name);
//   cy.get("#passwordInput").type(user.password);
//   cy.get("#loginButton").click();
// });

Cypress.Commands.add("login", (user) => {
  cy.get("#signInFormUsername").type(user.user_name, {force: true});
  cy.get("#signInFormPassword").type(user.password, {force: true});
  cy.get("input[name='signInSubmitButton']").click({force: true, multiple: true});
});
