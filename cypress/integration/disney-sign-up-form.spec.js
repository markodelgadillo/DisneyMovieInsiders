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

    cy.get(this.iFrame)
      .get("@fNameInput")
      .type("Marko")
      .should("have.class", "ng-valid") // verifies valid characters
      .find(".container .ng-scope")
      .should("not.exist") // verifies the error message is NOT displayed
      .get("@fNameInput")
      .clear()
      .should("have.class", "ng-invalid") // verifies invalid/no characters
      .get(this.iFrame)
      .find(".main input")
      .eq(1) // finds the last name input field
      .click() // clicks away from the cleared input field
      .get(this.iFrame)
      .find(".main .container .ng-scope")
      .contains("Please enter your first name.")
      .should("exist") // verifies the error message is displayed
      .log("The first name error message is verified!");

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

  //   it("verifies the last name input field of the sign up modal form", () => {
  //   });

  //   it("verifies the email address input field of the sign up modal form", () => {});

  //   it("verifies the mobile phone input field of the sign up modal form", () => {});

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
