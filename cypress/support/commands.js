export class AuthControler{
    constructor(lg, ps){
      this.lg = lg
      this.ps = ps
    }
    makeAuth(){
      
      cy.request({ //заполняем запрос
        method: 'POST', // указываем метод запроса
        url: 'https://back.dev.mashuk.tltpro.org/get_token/', // урл, куда будем отправлять запрос
        body: { // тело запроса с данными
          email: this.lg, // мыло для логина
          password: this.ps // пароль для логина
        }
      }).then((response) => { // ловим ответ
        expect(response.status).to.eq(200) // Проверяем статус-код ответа
        expect(response.body).to.have.property('success', true) // Проверяем содержимое ответа
        authtoken = response.body.authtoken // полученный токен авторизации пихаем в переменную
        cy.wrap(authtoken).as('authtoken') // проверяем токен в переменной
        this.authtoken = authtoken
      })
    }
  }