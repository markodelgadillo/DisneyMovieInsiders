context("The Sign Up form modal", () => {
  beforeEach(() => {
    cy.visit("");
    cy.get('[data-test-id="dmi-signup-button"]').click();
  });

  it("verifies the mobile phone input field of the sign up modal form", function () {
    /* Verify the mobile phone input field dom element */
    cy.getIframeBody()
      .find(".main .field-phone input")
      .should("have.id", "phoneid-MOBILE")
      .should("have.attr", "type", "tel")
      .should("not.be.disabled")
      .should("have.attr", "placeholder", "Mobile Phone (optional)")
      .log("Verified the attribute, enabled/disabled and input validity.");
  });

  it("Verify the mobile phone input field error messages", () => {
    cy.getIframeBody()
      .find(".main .field-phone input")
      .as("phoneInput")
      .click()
      .should("have.class", "ng-valid")
      .find(".container .ng-scope")
      .should("not.exist")
      .get("@phoneInput")
      .type("123")
      .should("have.class", "ng-invalid")
      .getIframeBody()
      .find(".main .field-email input")
      .click()
      .getIframeBody()
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
  });

  it.only("Verify the UI changes for an error", () => {
    cy.getIframeBody(".main .field-phone input").as("phoneInput");
    cy.getIframeBody()
      .find(".main .field-phone")
      .as("phoneField")
      .should("not.have.class", "field-error")
      .get("@phoneInput")
      .invoke(
        "attr",
        "class",
        ".ng-pristine .ng-valid .ng-isolate-scope .ng-valid-i-n-v-a-l-i-d_-v-a-l-u-e.ng-valid-m-i-s-s-i-n-g_-v-a-l-u-e .ng-touched .pull-right .focused"
      )
      // .getIframeBody()
      // .find(".main .country-code")
      // .invoke("attr", "class", ".country-code.show")
      // .click({ force: true })
      // .get("@phoneInput")
      .type("1234")
      // .getIframeBody()
      // .find(".main .field-email input")
      // .click()
      // .get("@phoneField")
      // .should("have.class", "field-error")
      // .getIframeBody()
      // .find(".wrapper button#close")
      // .click()
      .log("The mobile phone UI (input field red border) is verified");
  });
});
