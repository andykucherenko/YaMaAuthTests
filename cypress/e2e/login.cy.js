describe("Login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    it("should login with valid credentials", () => {
        const email = "test@test.com";
        const password = "test";

        cy.intercept("POST", "/api/login").as("login");

        cy.get('input[id="email"]').type(email);
        cy.get('input[id="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.url().should("include", "/confirmation");

        cy.wait("@login").its("request.body").should("deep.equal", {
            email,
            password,
        });

        cy.get("@login").its("response.body").should("deep.equal", {
            success: true,
        });

        cy.get("p[id=error]").should("not.exist");
    });

    it("should not login with invalid credentials", () => {
        const email = "test@test.com";
        const password = "test123";

        cy.intercept("POST", "/api/login").as("login");

        cy.get('input[id="email"]').type(email);
        cy.get('input[id="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.url().should("include", "/");

        cy.wait("@login").its("request.body").should("deep.equal", {
            email,
            password,
        });

        cy.get("@login").its("response.body").should("deep.equal", {
            success: false,
        });

        cy.get('p[id="error"]').should("be.visible");
    });
});