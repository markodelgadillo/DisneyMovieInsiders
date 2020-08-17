context("The Sign Up form modal", () => {
  beforeEach(() => {
    cy.visit("https://www.disneymovieinsiders.com/");
    cy.get('[data-test-id="dmi-signup-button"]').click();
  });

  it("verifies the sign up modal exists", () => {
    /* wrap the iFrame */
    cy.get("#disneyid-iframe") // get the element of the iframe //
      .eq(0) // gets the first iframe element
      .its("0.contentDocument") // referring to the contentDocument of the ifame
      .should("exist"); // verifies  its existance
  });
});
