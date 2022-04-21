import { User, test_user } from "../../support/user";

describe("First e2e tests", () => {
  before(() => {
    console.log(Cypress.config().baseUrl);
    Cypress.config().baseUrl = "https://demo2022xxxxxredirect_uri=https://gorest.co.in";
    cy.task("log", Cypress.config().baseUrl)
    cy.visit("");
    cy.url().should("include", "/login");
    cy.task<User>("getUserPassword", test_user).then((user: User) => {
      cy.login(user);
    });
  });

  it("First test after login", () => {
    //Verify that logging completed succesfully
    //cy.get("h1").should("include.text", "Etusivu");
    cy.get("h1")
  });

  it("First logout test", () => {
    // cy.get("#userInfo").click();
    // cy.get("#logout > .title").click();
    // cy.url().should("include", "/login");
    // cy.get("h1").should("include.text", "Kirjaudu sisään");
    cy.get("h1")
  });
});
