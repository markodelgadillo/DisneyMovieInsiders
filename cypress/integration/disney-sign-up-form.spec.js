context("The Sign Up form modal", () => {
  beforeEach(() => {
    cy.visit("https://www.disneymovieinsiders.com/");
    cy.get('[data-test-id="dmi-signup-button"]').click();

    cy.get("#disneyid-iframe") // get the element of the iframe //
      .eq(0) // gets the first iframe element
      .its("0.contentDocument") // referring to the contentDocument of the ifame
      .as("iFrame"); // created an alias for the iFrame
  });

  // must use the standard function syntax in order to call the alias
  it("verifies the sign up modal exists", function () {
    cy.get(this.iFrame) // calls the alias from the beforeEach
      .should("exist")
      .get(this.iFrame)
      .find(".wrapper button#close")
      .click();
  });

  it("verifies the first name input field of the sign up modal form", function () {
    /* Verify the first name input field dom element */
    cy.get(this.iFrame)
      .find(".main input") // looks for the element with the class
      .eq(0)
      .as("fNameInput") // gets the first instance of the class
      .should("have.attr", "type", "text") // type of input
      .should("not.be.disabled") // enabled/disabled check
      .should("have.attr", "placeholder", "First Name") // value
      .should("have.attr", "required", "required") // input required
      .log(
        "Verified the attribute, enabled/disabled, required and input validity."
      );

    /* Verify the first name input field error message */
    cy.get(this.iFrame)
      // input a first name
      .get("@fNameInput")
      .type("Marko")
      .should("have.class", "ng-valid") // verifies valid characters
      .find(".container .ng-scope")
      .should("not.exist") // verifies the error message is NOT displayed

      // clear the first name input field
      .get("@fNameInput")
      .clear()
      .should("have.class", "ng-invalid") // verifies invalid/no characters

      // click on another input field to display an error
      .get(this.iFrame)
      .find(".main input")
      .eq(1) // finds the last name input field
      .click() // clicks away from the cleared input field

      // Looks for and verifies the error message for the first name
      .get(this.iFrame)
      .find(".main .field-group .field-first-name .ng-scope")
      .contains("Please enter your first name.")
      .should("exist") // verifies the error message is displayed
      .log("The first name error message is verified!");

    /* Verify the UI changes for an error */
    cy.get(this.iFrame)
      .find(".main .field-first-name")
      .should("have.class", "field-error") // verifies the error class IS present
      .get(this.iFrame)
      .find(".main input")
      .eq(0)
      .type("Test")
      .get(this.iFrame)
      .find(".main .field-first-name")
      .should("not.have.class", "field-error") // verifies the error class is not present
      .get(this.iFrame)
      .find(".wrapper button#close")
      .click()
      .log("The first name error UI (input field red border) is verified");
  });

  it("verifies the last name input field of the sign up modal form", function () {
    /* Verify the last name input field dom element */
    cy.get(this.iFrame)
      .find(".main input") // looks for the element with the class
      .eq(1)
      .as("lNameInput") // gets the second instance of the class
      .should("have.attr", "type", "text") // type of input
      .should("not.be.disabled") // enabled/disabled check
      .should("have.attr", "placeholder", "Last Name") // value
      .should("have.attr", "required", "required") // input required
      .log(
        "Verified the attribute, enabled/disabled, required and input validity."
      );

    /* Verify the last name input field error message */
    cy.get(this.iFrame)
      .get("@lNameInput")
      .type("Delgadillo")
      .should("have.class", "ng-valid") // verifies valid characters
      .find(".container .ng-scope")
      .should("not.exist") // verifies the error message is NOT displayed
      .get("@lNameInput")
      .clear()
      .should("have.class", "ng-invalid") // verifies invalid/no characters
      .get(this.iFrame)
      .find(".main input")
      .eq(0) // finds the first name input field
      .click() // clicks away from the cleared input field
      .get(this.iFrame)
      .find(".main .field-group .field-last-name .ng-scope")
      .contains("Please enter your last name.")
      .should("exist") // verifies the error message is displayed
      .log("The last name error message is verified!");

    /* Verify the UI changes for an error */
    cy.get(this.iFrame)
      .find(".main .field-last-name")
      .should("have.class", "field-error") // verifies the error class IS present
      .get(this.iFrame)
      .find(".main input")
      .eq(1)
      .type("Test")
      .get(this.iFrame)
      .find(".main .field-last-name")
      .should("not.have.class", "field-error") // verifies the error class is not present
      .get(this.iFrame)
      .find(".wrapper button#close")
      .click()
      .log("The last name error UI (input field red border) is verified");
  });

  it("verifies the email address input field of the sign up modal form", function () {
    /* Verify the email input field dom element */
    cy.get(this.iFrame)
      .find(".main input") // looks for the element with the class
      .eq(2)
      .as("emailInput") // gets the third instance of the class
      .should("have.attr", "type", "email") // type of input
      .should("not.be.disabled") // enabled/disabled check
      .should("have.attr", "placeholder", "Email Address") // value
      .should("have.attr", "required", "required") // input required
      .log(
        "Verified the attribute, enabled/disabled, required and input validity."
      );

    /* Verify the email input field error messages */
    cy.get(this.iFrame)
      .get("@emailInput")
      .type("j@dog.com")
      .should("have.class", "ng-valid") // verifies valid characters
      .find(".container .ng-scope")
      .should("not.exist") // verifies the error message is NOT displayed
      .get("@emailInput")
      .clear()
      .should("have.class", "ng-invalid") // verifies invalid/no characters
      .get("@emailInput")
      .type("12345")
      .get(this.iFrame)
      .find(".main input")
      .eq(0) // finds the first name input field
      .click() // clicks away from the cleared input field
      .get(this.iFrame)
      .find(".main .field-group .field-email .ng-scope")
      .contains("Please enter a valid email address.")
      .should("exist") // verifies the error message is displayed
      .get("@emailInput")
      .clear()
      .get(this.iFrame)
      .find(".main input")
      .eq(1)
      .click()
      .get(this.iFrame)
      .find(".main .field-group .field-email .ng-scope")
      .contains("Please enter your email address.")
      .should("exist") // verifies the error message is displayed
      .log("The last name error message is verified!");

    /* Verify the UI changes for an error */
    cy.get(this.iFrame)
      .find(".main .field-email")
      .should("have.class", "field-error") // verifies the error class IS present
      .get(this.iFrame)
      .find(".main input")
      .eq(2)
      .type("Test@test.com")
      .get(this.iFrame)
      .find(".main .field-email")
      .should("not.have.class", "field-error") // verifies the error class is not present
      .get(this.iFrame)
      .find(".wrapper button#close")
      .click()
      .log("The email error UI (input field red border) is verified");
  });

  it("verifies the mobile phone input field of the sign up modal form", function () {
    /* Verify the mobile phone input field dom element */
    cy.get(this.iFrame)
      .find(".main input")
      .eq(3)
      .as("phoneInput")
      .should("have.id", "phoneid-MOBILE")
      .should("have.attr", "type", "tel")
      .should("not.be.disabled")
      .should("have.attr", "placeholder", "Mobile Phone (optional)")
      .log("Verified the attribute, enabled/disabled and input validity.");

    /* Verify the mobile phone input field error messages */
    cy.get(this.iFrame)
      .get("@phoneInput")
      .click()
      .should("have.class", "ng-valid")
      .find(".container .ng-scope")
      .should("not.exist")
      .get("@phoneInput")
      .type("123")
      .should("have.class", "ng-invalid")
      .get(this.iFrame)
      .find(".main input")
      .eq(0)
      .click()
      .get(this.iFrame)
      .find(".main .field-phone .container div")
      .contains("Please enter a valid phone number.")
      .should("exist")
      .get("@phoneInput")
      .clear()
      .type("3235551212")
      .should("have.class", "ng-valid")
      .find(".main .field-phone .container div")
      .should("not.exist")
      .log("The mobile phone error message is verified!");

    /* Verify the UI changes for an error */
    cy.get(this.iFrame)
      .find(".main .field-phone")
      .should("not.have.class", "field-error")
      .get(this.iFrame)
      .get("@phoneInput")
      .clear()
      .type("1234")
      .get(this.iFrame)
      .find(".main input")
      .eq(0)
      .click()
      .get(this.iFrame)
      .find(".main .field-phone")
      .should("have.class", "field-error")
      .get(this.iFrame)
      .find(".wrapper button#close")
      .click()
      .log("The mobile phone UI (input field red border) is verified");
  });

  //   it("verifies the password input field of the sign up modal form", () => {});

  //   it("verifies the password checkbox of the sign up modal form", () => {});

  //   it("verifies the gender selection of the sign up modal form", () => {});

  //   it("verifies the birthday input field of the sign up modal form", () => {});

  //   it("verifies the Home Address title text of the sign up modal form", () => {});

  //   it("verifies the country/region dropdown of the sign up modal form", () => {});

  //   it("verifies the address and second address line input field of the sign up modal form", () => {});

  //   it("verifies the city input field of the sign up modal form", () => {});

  //   it("verifies the state dropdown of the sign up modal form", () => {});

  //   it("verifies the postal code input field of the sign up modal form", () => {});

  //   it("verifies the checkbox to receive special offers of the sign up modal form", () => {});

  //   it("verifies the first name input field of the sign up modal form", () => {});

  //   it("verifies the legal agreement text with links of the sign up modal form", () => {});

  //   it("verifies the first legal agreement checkbox and text of the sign up modal form", () => {});

  //   it("verifies the second legal agreement checkbox and text of the sign up modal form", () => {});

  //   it("verifies the Create Account button of the sign up modal form", () => {});

  //   it("verifies the footer text and link of the sign up modal form", () => {});
  //   });
});
