import { User, test_user } from "../../support/user";

describe("First api tests", () => {
  before(() => {
    cy.visit("/");
    /**
     * "getUserPassword" code needs access to the secret manager
     * Add secretid to user.ts
     * signin needs userpool & clientid as environmentvariable
     * Use "changepassword" & "updatePasswordToSecretManager" only with care.
     * Those functions updating password to cognito and secretmanager
     */
    // Commented sign in-functionality off until tests can use secretmanager
    cy.task<User>("getUserPassword", test_user).then((user: User) => {
      cy.signin(user.user_name, user.password).then(() => {
        cy.task("log", "AccessToken:");
        cy.task("log", window.localStorage.getItem("accessToken"));
      });
      /**
       * So the next one is only for example, recommend that you do not use "changepassword"-functionality
       */
      /*   .then(() => {
        cy.changepassword(user).then((user: User) => {
          cy.task("updatePasswordToSecretManager", user);
        });
       }); */
    });
  });

  it("First test", () => {
    cy.visit("");
    //Verify that logging completed succesfully
    //cy.get("h1").should("include.text", "Etusivu");
    //cy.get("h1")
  });

  it("Signout test", () => {
    cy.signout();
    cy.visit("");
    //cy.get("h1").should("include.text", "Kirjaudu sisään");
    //cy.get("h1")
  });
});
