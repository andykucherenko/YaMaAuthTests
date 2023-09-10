describe('Авторизация на сайте Хабр', function () {

    it('Логинимся на сайте', function () {
        cy.visit('https://habr.com/ru/all/');
        cy.get('#app > div.tm-layout__wrapper > header > div > div > div.tm-header-user-menu.tm-header_user-menu > div.tm-header-user-menu__item > button > svg > use').click();    
        cy.get('[href="https://habr.com/kek/v1/auth/habrahabr/?back=/ru/articles/&hl=ru"]').click();
        cy.get('#email_field').type('testqa1996@mail.ru');
        cy.get('#password_field').type('1q2w3e4rq');
        cy.get('.button').click()
        cy.contains('Все потоки');
    })
    it('Ввод не правильного пароля', function () {
        cy.visit('https://habr.com/ru/all/');
        cy.get('.tm-dropdown__head > .tm-svg-img > use').click();
        cy.get('[href="https://habr.com/kek/v1/auth/habrahabr/?back=/ru/all/&hl=ru"]').click();
        cy.get('#email_field').type('testqa1996@mail.ru');
        cy.get('#password_field').type('111111');
        cy.get('.button').click();
        cy.contains('Пользователь с такой электронной почтой или паролем не найден');
    })
})