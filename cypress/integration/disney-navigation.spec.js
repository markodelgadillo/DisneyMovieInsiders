context("Navigation", () => {
  beforeEach(() => {
    // Disney Movie Insiders homepage
    cy.visit("");
  });

  // test suite for the Sign Up button
  it("verifies the Sign Up button is displayed", () => {
    cy.get('[data-test-id="dmi-signup-button"]')
      .should("have.text", "sign up")
      .should("have.class", "css-uhzrxt")
      .should("have.attr", "type", "button")
      .should("be.visible")
      .should("not.be.disabled");
    debugger;
  });

  it("verifies the Sign In button is displayed", () => {
    cy.get('[data-cy="dmi-signin-button"]')
      .should("have.text", "sign in")
      .should("have.class", "css-uhzrxt")
      .should("have.attr", "type", "button")
      .should("be.visible")
      .should("not.be.disabled");
    debugger;
  });

  it("verifies the Disney.com link is displayed", () => {
    cy.get(
      "#app > div.css-1fw88hi > div.css-1oxmwik > div > div > a:nth-child(2)"
    )
      .should("be.visible")
      .should("not.be.disabled")
      .should("have.attr", "href", "https://www.disney.com")
      .should("have.text", "Disney.com");
    debugger;
  });

  it("verifies the Get the App link is displayed", () => {
    cy.get(
      "#app > div.css-1fw88hi > div.css-1oxmwik > div > div > a:nth-child(3)"
    )
      .should("be.visible")
      .should("not.be.disabled")
      .should("have.attr", "href", "/#dmi-footer")
      .should("have.text", "Get the App");
    debugger;
  });

  it("verifies the Link Accounts link is displayed", () => {
    cy.get(
      "#app > div.css-1fw88hi > div.css-1oxmwik > div > div > a:nth-child(4)"
    )
      .should("be.visible")
      .should("not.be.disabled")
      .should("have.attr", "href", "/my-account/link-accounts")
      .should("have.text", "Link Accounts");
    debugger;
  });

  it("verifies the Upload Tickets button is displayed", () => {
    cy.get('[data-cy="uploadtickets-topnav"]')
      .should("be.visible")
      .should("not.be.disabled")
      .should("have.text", "Upload Tickets")
      .should("have.attr", "role", "button");
    debugger;
  });

  it("verifies the Enter Code button is displayed", () => {
    cy.get('[data-cy="entercode-topnav"]')
      .should("be.visible")
      .should("not.be.disabled")
      .should("have.text", "Enter Code")
      .should("have.attr", "role", "button");
    debugger;
  });
});
