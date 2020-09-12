context("The Sign Up form modal birth date input field", () => {
  beforeEach(() => {
    cy.visit("");
    cy.clickSignUp();
  });
  it("is displayed.", () => {
    cy.getIframeBody()
      .find(".main .field-dob input")
      .eq(0)
      .should("have.attr", "name", "dateOfBirth")
      .log("The Birth Date input field is displayed.");
  });

  it("has a label and the label changes when clicking into it.", () => {
    cy.getIframeBody()
      .find(".main .field-dob label")
      .should("have.attr", "data-mask", "Birth Date mm/dd/yyyy")
      .click()
      .should("have.attr", "data-mask", "mm/dd/yyyy")
      .and("have.class", "monospace");
  });

  it("does not accept invalid or future dates.", () => {
    cy.getIframeBody() // logging the current attribute value
      .find(".main .field-dob label")
      .eq(0)
      .type("1233333")
      .invoke("attr", "data-mask")
      .then(($attr) => {
        const attrValue = $attr;
        cy.log(attrValue);
      });

    cy.getIframeBody()
      .find(".main .field-dob input")
      .eq(0)
      .clear()
      .type("1233333")
      .should("have.value", "12/3")
      .getIframeBody()
      .find(".main .field-dob label")
      .should("have.attr", "data-mask")
      .getIframeBody()
      .find(".main .field-dob input")
      .eq(0)
      .clear()
      .type("12312021")
      .should("have.value", "12/31/202")
      .getIframeBody()
      .find(".main .field-dob label")
      .should("have.attr", "data-mask")
      .log("The input field does not accept invalid or future dates.");
  });

  it("accepts a valid date.", () => {
    cy.getIframeBody()
      .find(".main .field-dob label")
      .eq(0)
      .type("12312019")
      .invoke("attr", "data-mask")
      .then(($attr) => {
        const attrValue = $attr;
        cy.log(attrValue);
      });
    cy.getIframeBody()
      .find(".main .field-dob input")
      .eq(0)
      .type("12312019")
      .should("have.value", "12/31/2019")
      .and("not.have.attr", "data-mask");
  });
});
