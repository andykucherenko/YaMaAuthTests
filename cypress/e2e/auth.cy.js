
describe("Verification", () => {
    it("should successfully verify with correct url parameters", () => {
        const email = "test@test.com";
        const verificationCode = "12345";
        const url = `http://localhost:3000/verification?email=${email}&verificationCode=${verificationCode}`;

        cy.intercept("POST", "/api/verify").as("verify");

        cy.visit(url);

        cy.wait("@verify").its("request.body").should("deep.equal", {
            email,
            verificationCode,
        });

        cy.get("@verify").its("response.body").should("deep.equal", {
            success: true,
        });

        cy.get('p[id="success"]').should("be.visible");
    });

    it("should not verify with incorrect url parameters", () => {
        const email = "test@test.com";
        const verificationCode = "123456";
        const url = `http://localhost:3000/verification?email=${email}&verificationCode=${verificationCode}`;

        cy.intercept("POST", "/api/verify").as("verify");

        cy.visit(url);

        cy.wait("@verify").its("request.body").should("deep.equal", {
            email,
            verificationCode,
        });

        cy.get("@verify").its("response.body").should("deep.equal", {
            success: false,
        });

        cy.get('p[id="error"]').should("be.visible");
    });
});