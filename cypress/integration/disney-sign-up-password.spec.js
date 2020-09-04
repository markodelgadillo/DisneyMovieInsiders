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

  it("verifies the 'Show Password' checkbox of the sign up modal form", () => {
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

  it("verifies the password input field error UI", () => {
    cy.getIframeBody()
      .find(".main .field-new-password input")
      .click()
      .getIframeBody()
      .find(".main .field-email input")
      .click()
      .getIframeBody()
      .find(".main .field-new-password")
      .should("have.class", "field-error");
  });

  it('verifies the password input field "Please enter a password." error message', () => {
    cy.getIframeBody()
      .find(".main .field-new-password input")
      .click()
      .getIframeBody()
      .find(".main .field-email input")
      .click()
      .getIframeBody()
      .find(".main .field-new-password div.container .ng-scope")
      .contains("Please enter a password.")
      .should("exist");
  });

  it('verifies the password input field "The password is too short." error message', () => {
    cy.getIframeBody()
      .find(".main .field-new-password input")
      .click()
      .type("123")
      .getIframeBody()
      .find(".main .field-email input")
      .click()
      .getIframeBody()
      .find(".main .field-new-password div.container .ng-scope")
      .contains("The password is too short.")
      .should("exist");
  });

  it('verifies the password input field "The password is too easily guessed." error message', () => {
    cy.getIframeBody()
      .find(".main .field-new-password input")
      .click()
      .type("123456")
      .getIframeBody()
      .find(".main .field-email input")
      .click()
      .getIframeBody()
      .find(".main .field-new-password div.container .ng-scope")
      .contains("The password is too easily guessed.")
      .should("exist");
  });

  it("verifies the password input field minimum requirements", () => {
    cy.getIframeBody()
      .find(".main .field-new-password input")
      .click()
      .getIframeBody()
      .find(".main .field-email input")
      .click()
      .getIframeBody()
      .find(".main .field-new-password")
      .click()
      .should("have.class", "show-rules")
      // validates the first rule
      .getIframeBody()
      .find(".main ul li.message-info")
      .eq(0)
      .contains("Enter at least 6 characters.")
      .should("exist")
      .should("be.visible")
      // validates the second rule
      .getIframeBody()
      .find(".main ul li.message-info")
      .eq(1)
      .contains('Try a secret phrase, like: "dancing pizza hotel".')
      .should("exist")
      .should("be.visible")
      // validates the third rule
      .getIframeBody()
      .find(".main ul li.message-info")
      .eq(2)
      .contains(
        "Use letters together with spaces, numbers, or symbols (!@#$%^&*)."
      )
      .should("exist")
      .should("be.visible");
  });

  it('verifies using a single type of character only as "Weak"', () => {
    cy.getIframeBody()
      .find(".main .field-new-password input")
      .click()
      // using only alpha characters with minimum length
      .type("abcdef")
      .getIframeBody()
      .find(".main .strength-meter .state-weak")
      .contains("Weak")
      .should("exist")
      .should("be.visible")
      .getIframeBody()
      .find(".main .strength-meter")
      .should("have.attr", "score", "2")
      .getIframeBody()
      .find(".main .field-new-password input")
      .clear()

      .getIframeBody()
      .find(".main .field-new-password input")
      .click()
      // using numbers only with minimum length
      .type("123456")
      .getIframeBody()
      .find(".main .strength-meter .state-weak")
      .contains("Weak")
      .should("exist")
      .should("be.visible")
      .getIframeBody()
      .find(".main .strength-meter")
      .should("have.attr", "score", "2");
  });

  it('verifies using alpha/numeric characters as "OK"', () => {
    cy.getIframeBody()
      .find(".main .field-new-password input")
      .click()
      // using alpha/numeric and special characters at minimum length
      .type("1!a2@b")
      .getIframeBody()
      .find(".main .strength-meter .state-ok")
      .contains("OK")
      .should("exist")
      .should("be.visible")
      .getIframeBody()
      .find(".main .strength-meter")
      .should("have.attr", "score", "3");
  });

  it('verifies using two or more types of characters with a minimum of 12 characters as "Strong"', () => {
    cy.getIframeBody()
      .find(".main .field-new-password input")
      .click()
      // using alpha/numeric and special characters at minimum length
      .type("1!a2@b3#c4$d5%e")
      .getIframeBody()
      .find(".main .strength-meter .state-strong")
      .contains("Strong")
      .should("exist")
      .should("be.visible")
      .getIframeBody()
      .find(".main .strength-meter")
      .should("have.attr", "score", "6");
  });

  it('verifies using an invalid password displays "invalid"', () => {
    cy.getIframeBody()
      .find(".main .field-new-password input")
      .click()
      // using only alpha characters with less than the minimum length
      .type("abcdef")
      .getIframeBody()
      .find(".main .field-email input")
      .click()
      .getIframeBody()
      .find(".main .field-new-password input")
      .click()
      .getIframeBody()
      .find(".main .strength-meter")
      .should("have.class", "invalid")
      .should("be.visible")
      .should("have.attr", "score", "-1")
      .getIframeBody()
      .find(".main .strength-meter .state-invalid")
      .contains("Invalid")
      .should("exist");
  });
});
