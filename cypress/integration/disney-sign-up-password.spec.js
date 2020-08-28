context("The Sign Up form modal", () => {
  beforeEach(() => {
    cy.visit("");
    cy.clickSignUp();
  });
  it("verifies the password input field of the sign up modal form", () => {
    cy.getIframeBody()
      .find(".main .field-new-password input")
      .should("have.attr", "type", "password")
      .should("not.be.disabled")
      .should("have.attr", "placeholder", "Password")
      .log("Verified the attribute, enabled/disabled and input validity.");
  });

  it.only("verifies the 'Show Password' checkbox of the sign up modal form", () => {
    cy.getIframeBody()
      .find(".main .show-password-action input")
      .should("have.attr", "aria-checked", "false")
      .click({ force: true })
      .should("have.attr", "aria-checked", "true")
      .getIframeBody()
      .find(".main .field-new-password input")
      .should("have.attr", "type", "text")
      .getIframeBody()
      .find(".main .show-password-action input")
      .click({ force: true })
      .should("have.attr", "aria-checked", "false");
  });

  it("verifies the password input field error UI", () => {});

  it('verifies the password input field "Please enter a password." error message', () => {});

  it('verifies the password input field "The password is too short." error message', () => {});

  it('verifies the password input field "The password is too easily guessed." error message', () => {});

  it("verifies the password input field minimum requirements", () => {});

  it('verifies using a single type of character only as "Weak"', () => {});

  it('verifies using alpha/numeric characters as "Ok"', () => {});

  it('verifies using two or more types of characters as with a minimum of 12 characters as "Strong"', () => {});
});
