context("The Sign Up form modal", () => {
  beforeEach(() => {
    cy.visit("");
    cy.clickSignUp();
  });

  it("contains the Gender (Optional) selection buttons", () => {
    cy.getIframeBody()
      .find(".main .field-gender span")
      .contains("Gender (Optional")
      .should("exist")
      .getIframeBody()
      .find(".main .field-gender input")
      .eq(0)
      .should("have.attr", "type", "radio")
      .should("not.to.be.checked")
      .getIframeBody()
      .find(".main .field-gender input ~ span")
      .eq(0)
      .contains("Male")
      .should("exist")
      .getIframeBody()
      .find(".main .field-gender input")
      .eq(1)
      .should("have.attr", "type", "radio")
      .should("not.to.be.checked")
      .getIframeBody()
      .find(".main .field-gender input ~ span")
      .eq(1)
      .contains("Female")
      .should("exist")

      .log(
        "Verified the buttons have the correct label(s), are displayed and start disabled."
      );
  });

  it("can select/deselect Male of Female", () => {
    cy.getIframeBody()
      .getIframeBody()
      .find(".main .field-gender input")
      .eq(0)
      .should("have.attr", "type", "radio")
      .should("not.to.be.checked")
      .click({ force: true })
      .should("be.checked")
      .getIframeBody()
      .find(".main .field-gender input")
      .eq(1)
      .should("have.attr", "type", "radio")
      .should("not.to.be.checked")
      .click({ force: true })
      .should("be.checked")
      .getIframeBody()
      .find(".main .field-gender input")
      .eq(0)
      .should("have.attr", "type", "radio")
      .should("not.to.be.checked")

      .log(
        "Verified an option can be selected which deselects the other option if selected."
      );
  });

  it.only("can select/deselect Male of Female", () => {
    cy.getIframeBody()
      .getIframeBody()
      .find(".main .field-gender input")
      .eq(0)
      .should("have.attr", "type", "radio")
      .should("not.to.be.checked")
      .click({ force: true })
      .should("be.checked")
      .click({ force: true })
      .should("not.to.be.checked")
      .getIframeBody()
      .find(".main .field-gender input")
      .eq(1)
      .should("have.attr", "type", "radio")
      .should("not.to.be.checked")
      .click({ force: true })
      .should("be.checked")
      .click({ force: true })
      .should("not.to.be.checked")

      .log(
        "Verified an option can be selected which deselects the other option if selected."
      );
  });
});
