context("The Sign Up form modal", () => {
  beforeEach(() => {
    cy.visit("");
    cy.clickSignUp();
  });

  it("verifies the last name input field of the sign up modal form", () => {
    cy.getIframeBody()
      .find(".main .field-last-name input")
      .as("lNameInput")
      .should("have.attr", "type", "text")
      .should("not.be.disabled")
      .should("have.attr", "placeholder", "Last Name")
      .should("have.attr", "required", "required")
      .log(
        "Verified the attribute, enabled/disabled, required and input validity."
      );
  });

  it("Verify the last name input field error message", () => {
    cy.getIframeBody()
      .find(".main .field-last-name input")
      .as("lNameInput")
      .type("Delgadillo")
      .should("have.class", "ng-valid")
      .find(".container .ng-scope")
      .should("not.exist")

      .get("@lNameInput")
      .clear()
      .should("have.class", "ng-invalid")
      .getIframeBody()
      .find(".main input")
      .eq(0)
      .click()
      .getIframeBody()
      .find(".main .field-last-name")
      .contains("Please enter your last name.")
      .should("exist")
      .log("The first name error message is verified!");
  });

  it.only("Verify the UI changes for an error", () => {
    cy.getIframeBody().find(".main .field-last-name input").as("lNameInput");
    cy.getIframeBody().find(".main .field-last-name").as("lNameField");
    cy.get("@lNameField")
      .should("not.have.class", "field-error")
      .get("@lNameInput")
      .type("Test")
      .get("@lNameField")
      .should("not.have.class", "field-error")
      .get("@lNameInput")
      .clear()
      .getIframeBody()
      .find(".main .field-first-name")
      .click()
      .get("@lNameField")
      .should("have.class", "field-error")
      .log("The last name error UI (input field red border) is verified");
  });
});
