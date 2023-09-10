const user = require('../support/user')

describe("Yandex Passport Authorization Tests", () => {
    beforeEach(() => {
        cy.visit("https://passport.yandex.ru/auth/welcome");
    });

    it("Positive Test: Successful Authorization", () => {
        cy.get("input[name='login']").type(user.email);
        cy.get("button[type='submit']").click();
        cy.get("input[name='passwd']").type(user.password);
        cy.get("button[type='submit']").click();
        //cy.intercept('POST', '/api/https://passport.yandex.ru/registration-validations/auth/challenge/submit').as('smsVerification');
        //cy.get("button[data-t='submit-phone-code-btn']").click();
        //cy.wait('@smsVerification').then((interception) => {
        //    const request = interception.request;      // Получаю запрос и ответ
        //    const response = interception.response;
        //    request.body.code = '123456';
        //    cy.intercept('POST', '/api/sms-verification-endpoint', request).as('modifiedSmsVerification');
        //});
        //cy.wait('@modifiedSmsVerification');
        //cy.get("body > div._111XI.main > div:nth-child(6) >").should("contain", "Распродажа хитов по промокодам");
        //cy.get("contain", "Добавьте питомца — вместе уютнее");
        cy.url().should("include", "https://id.yandex.ru/");
    });

    it("Negative Test: Invalid Email", () => {
        cy.get("input[name='login']").type(user.incorrectEmail);
        cy.get("button[type='submit']").click();
        //cy.get("div[data-cy='#field\:input-login\:hint' ]").should('exist'); // Проверяем наличие элемента
        //cy.get("div[data-cy='#field\:input-login\:hint' ]").should('not.be.empty'); // Проверяем, что элемент не пустой
        //cy.get("div[data-cy='#field\:input-login\:hint' ]").should("contain", "Такой логин не подойдет");
        cy.contains('Такой логин не подойдет');
    });

    it("Negative Test: Invalid Password", () => {
        cy.get("input[name='login']").type(user.email);
        cy.get("button[type='submit']").click();
        cy.get("input[name='passwd']").type(user.incorrectPassword);
        cy.get("button[type='submit']").click();
        //cy.get("div[data-cy='#field:\input-passwd\:hint' ]").should('exist'); // Проверяем наличие элемента
        //cy.get("div[data-cy='#field:\input-passwd\:hint' ]").should('not.be.empty'); // Проверяем, что элемент не пустой
        //cy.get("div[data-cy='#field\:input-passwd\:hint' ]").should("contain", "Неверный пароль"); // Проверяем текст внутри элемента
        cy.contains('Неверный пароль');
    });
});
