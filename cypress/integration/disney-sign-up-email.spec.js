context("The Sign Up form modal", () => {
  beforeEach(() => {
    cy.visit("");
    cy.clickSignUp();
  });

  it("verifies the email address input field of the sign up modal form", function () {
    /* Verify the email input field dom element */
    cy.getIframeBody()
      .find(".main .field-email input") // looks for the element with the class
      .should("have.attr", "type", "email") // type of input
      .should("not.be.disabled") // enabled/disabled check
      .should("have.attr", "placeholder", "Email Address") // value
      .should("have.attr", "required", "required") // input required
      .log(
        "Verified the attribute, enabled/disabled, required and input validity."
      );
  });

  it("Verify the email input field error messages", () => {
    cy.getIframeBody()
      .find(".main .field-email input")
      .as("emailInput")
      .type("j@dog.com")
      .should("have.class", "ng-valid") // verifies valid characters
      .find(".container .ng-scope")
      .should("not.exist") // verifies the error message is NOT displayed
      .get("@emailInput")
      .clear()
      .should("have.class", "ng-invalid") // verifies invalid/no characters
      .get("@emailInput")
      .type("12345")
      .getIframeBody()
      .find(".main .field-last-name input")
      .click() // clicks away from the cleared input field
      .getIframeBody()
      .find(".main .field-group .field-email .ng-scope")
      .contains("Please enter a valid email address.")
      .should("exist") // verifies the error message is displayed
      .get("@emailInput")
      .clear()
      .getIframeBody()
      .find(".main .field-last-name input")
      .click()
      .getIframeBody()
      .find(".main .field-group .field-email .ng-scope")
      .contains("Please enter your email address.")
      .should("exist") // verifies the error message is displayed
      .log("The last name error message is verified!");
  });

  it.only("Verify the UI changes for an error", () => {
    cy.getIframeBody()
      .find(".main .field-email input")
      .type("Test")
      .getIframeBody()
      .find(".main .field-last-name input")
      .click()
      .getIframeBody()
      .find(".main .field-email")
      .should("have.class", "field-error")
      .getIframeBody()
      .find(".main .field-email input")
      .clear()
      .should("not.have.class", "field-error") // verifies the error class IS present
      .getIframeBody()
      .find(".main .field-email input")
      .type("Test@test.com")
      .getIframeBody()
      .find(".main .field-email")
      .should("not.have.class", "field-error") // verifies the error class is not present
      .getIframeBody()
      .find(".wrapper button#close")
      .click()
      .log("The email error UI (input field red border) is verified");
  });
});
