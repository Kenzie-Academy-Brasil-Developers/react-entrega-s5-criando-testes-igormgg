context("Search", () => {
  it("Enters on site and search for CEP adress", () => {
    cy.visit("http://localhost:3000/");
    cy.viewport(1400, 900);

    cy.contains("Busca de endereço");

    cy.get("input[type=number]").type("71936250");

    cy.contains("Buscar pelo CEP").click();

    cy.contains("Complemento");
  });
});
