context("The Sign Up form modal", () => {
  beforeEach(() => {
    cy.visit("");
    cy.get('[data-test-id="dmi-signup-button"]').click();
  });

  it("verifies the first name input field of the sign up modal form", () => {
    /* Verify the first name input field dom element */
    cy.getIframeBody()
      .find(".main input") // looks for the element with the class
      .eq(0)
      .as("fNameInput") // gets the first instance of the class
      .should("have.attr", "type", "text") // type of input
      .should("not.be.disabled") // enabled/disabled check
      .should("have.attr", "placeholder", "First Name") // value
      .should("have.attr", "required", "required")
      .getIframeBody()
      .find(".wrapper button#close")
      .click() // input required
      .log(
        "Verified the attribute, enabled/disabled, required and input validity."
      );
  });

  it("Verify the first name input field error message", () => {
    cy.getIframeBody()
      .find(".main input")
      .eq(0)
      .as("fNameInput")
      .type("Marko")
      .should("have.class", "ng-valid") // verifies valid characters
      .find(".container .ng-scope")
      .should("not.exist") // verifies the error message is NOT displayed

      // clear the first name input field
      .get("@fNameInput")
      .clear()
      .should("have.class", "ng-invalid") // verifies invalid/no characters

      // click on another input field to display an error
      .getIframeBody()
      .find(".main input")
      .eq(1) // finds the last name input field
      .click() // clicks away from the cleared input field

      // Looks for and verifies the error message for the first name
      .getIframeBody()
      .find(".main .field-group .field-first-name .ng-scope")
      .contains("Please enter your first name.")
      .should("exist")
      //   .getIframeBody()
      //   .find(".wrapper button#close")
      //   .click() // verifies the error message is displayed
      .log("The first name error message is verified!");
  });

  it("Verify the UI changes for an error", () => {
    cy.getIframeBody().find(".main .field-first-name input").as("fNameInput");
    cy.getIframeBody().find(".main .field-first-name").as("fNameField");
    cy.get("@fNameField")
      .should("not.have.class", "field-error") // verifies the error class IS present
      .get("@fNameInput")
      .type("Test")
      .get("@fNameField")
      .should("not.have.class", "field-error")
      .get("@fNameInput")
      .clear()
      .getIframeBody()
      .find(".main .field-last-name")
      .click()
      .get("@fNameField")
      .should("have.class", "field-error")
      .getIframeBody()
      .find(".wrapper button#close")
      .click()
      .log("The first name error UI (input field red border) is verified");
  });
});
