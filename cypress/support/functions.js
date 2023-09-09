const consts = require('./consts')

const Auth = { // функции авторизации
  Login: function() { // авторизация
    let authtoken // объявляем переменную

    cy.request({ //заполняем запрос
      method: 'POST', // указываем метод запроса
      url: 'https://back.dev.mashuk.tltpro.org/get_token/', // урл, куда будем отправлять запрос
      body: { // тело запроса с данными
        email: 'admin@admin.com', // мыло для логина
        password: 'admin' // пароль для логина
      }
    }).then((response) => { // ловим ответ
      expect(response.status).to.eq(200) // Проверяем статус-код ответа
      expect(response.body).to.have.property('success', true) // Проверяем содержимое ответа
      authtoken = response.body.authtoken // полученный токен авторизации пихаем в переменную
      cy.wrap(authtoken).as('authtoken') // проверяем токен в переменной
    })
    cy.get('@authtoken').then((authtoken) => {
      cy.request({
        method: 'GET',
        url: 'https://back.dev.mashuk.tltpro.org/',
        headers: {
          Authorization: `Token ${authtoken}`
        },
        body: {
          content: 'application/json',
          content: '123'
        }
        }).then((response) => {
          expect(response.status).to.eq(200) // Проверяем статус-код ответа
          expect(response.body).to.eq(true) // Проверяем содержимое ответа

        })
      })
      cy.request({
        method: 'POST',
        url: 'https://back.dev.mashuk.tltpro.org/get_token/',
        body: {
          email: 'admin@admin.com',
          password: 'admin'
        }
      }).then((response) => {
        expect(response.status).to.eq(200) // Проверяем статус-код ответа
        expect(response.body).to.have.property('success', true) // Проверяем содержимое ответа
        authtoken = response.body.authtoken
        cy.wrap(authtoken).as('authtoken')
      })
      cy.get('@authtoken').then((authtoken) => {
        cy.request({
          method: 'GET',
          url: 'https://back.dev.mashuk.tltpro.org/',
          headers: {
            Authorization: `Token ${authtoken}`
          },
          body: {
            content: 'application/json',
            content: '123'
          }
          }).then((response) => {
            expect(response.status).to.eq(200) // Проверяем статус-код ответа
            expect(response.body).to.eq(true) // Проверяем содержимое ответа

          })
        })
  }
}

const CartBack = { // функции для тестирования бэкенда корзины
  AddItem: function() { // тест корзины POST card/add_item/
  // cy.get('@authtoken').then((authtoken) => {
  cy.request({
    method: 'POST',
    url: 'https://back.dev.mashuk.tltpro.org/card/add_item/',
    headers: {
      // Authorization: `Token ${authtoken}`
    },
    body: {
      product_id: 27 
      // count: 1
    }
  }).then((response) => {
    cy.log(response.body)
    expect(response.status).to.eq(401) // Проверяем статус-код ответа
  })
  // })
  },
  GetCard: function() { // тест корзины GET card/get
  cy.get('@authtoken').then((authtoken) => {
    cy.request({
      method: 'GET',
      url: 'https://back.dev.mashuk.tltpro.org/card/get/',
      headers: {
        Authorization: `Token ${authtoken}`
      },
      body: {
      }
    }).then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.status).to.eq(200) // Проверяем статус-код ответа
    })
  })
  },
  ItemCount: function() {  // тест корзины POST card/change_item_count/
  cy.get('@authtoken').then((authtoken) => {
  cy.request({
    method: 'POST',
    url: 'https://back.dev.mashuk.tltpro.org/card/change_item_count/',
    headers: {
      Authorization: `Token ${authtoken}`
    },
    body: {
      product_id: 27, 
      count: 2
    }
  }).then((response) => {
    cy.log(response.body)
    expect(response.status).to.eq(200) // Проверяем статус-код ответа
  })
  })
  },
  DeleteItem: function() { // тест корзины POST card/delete_item/
  cy.get('@authtoken').then((authtoken) => {
    cy.request({
      method: 'POST',
      url: 'https://back.dev.mashuk.tltpro.org/card/delete_item/',
      headers: {
        Authorization: `Token ${authtoken}`
      },
      body: {
        product_id: 27
      }
    }).then((response) => {
      cy.log(response.body)
      expect(response.status).to.eq(200) // Проверяем статус-код ответа
    })
  })

  },
  DeleteItems:function() { // тест корзины POST card/delete_item_bulk/
  cy.get('@authtoken').then((authtoken) => {
    cy.request({
      method: 'POST',
      url: 'https://back.dev.mashuk.tltpro.org/card/delete_item_bulk/',
      headers: {
        Authorization: `Token ${authtoken}`
      },
      body: {
        product_ids: [27, 28]
      }
    }).then((response) => {
      cy.log(response.body)
      expect(response.status).to.eq(200) // Проверяем статус-код ответа
    })
  })
  },
  DeleteItemAll: function() { // тест корзины POST card/delete_card_all/
  cy.get('@authtoken').then((authtoken) => {
    cy.request({
      method: 'POST',
      url: 'https://back.dev.mashuk.tltpro.org/card/delete_card_all/',
      headers: {
        Authorization: `Token ${authtoken}`
      },
      body: {

      }
    }).then((response) => {
      cy.log(response.body)
      expect(response.status).to.eq(200) // Проверяем статус-код ответа
    })
  })
  }
}

const Cart = { // функции для тестирования корзины
  AddProduct: function(number){
    for (let i = 0; i < number; i++) { 
    cy.visit('/').wait(1000)
    cy.get('.swiper-slide').eq(i).click().wait(1000)
    cy.get('.flex-col.gap-2 > .items-center > .text-white').click('top')
    }
  },
  ChoiceFirst: function(){
    for (let i = 1; i < 4; i++) {
      cy.get(`:nth-child(${i}) > .px-6 > .flex > .w-7`).click()
    }
  },
  ChoiceFirstMobile: function(){
    for (let i = 1; i < 2; i++) {
      cy.get(`:nth-child(${i}) > .py-4 > :nth-child(1) > :nth-child(2) > .flex > .w-7`).click()
    }
  }
}

const TestPopap = { // функции для тестирования попапов реги авторизации
  Telephone: function(popapTrigger) {
    consts.ButtonTriggerClick.forEach(({ name: triggerName }) => { // цикл для проведения идентичных тестов по 2 кнопкам (войти и рега)
      consts.PopapTelephone.forEach(({ name: popapName, type, should, contains }) => {// цикл для попапа с вводом телефона, содержащий имя проверки, type - вводимые данные, should - проверяеммые данные и contains - проверка текста в попапе
        it(popapName, () => { // имя проверки
          cy.wait(2000) // задержка для подгрузки страницы
          eval(popapTrigger); // вызов переменной с кодом для поиска различных блоков
          cy.get('div[data-headlessui-state="open"]').first().within(() => { // вхождение в попап
            cy.contains(triggerName).click() // нахождение кнопки войти или регистрация и клик по ним
            cy.get('input[type="tel"]').type(type).should('have.value', should) // нахожу инпут и ввожу в него переданное значение, затем проверяю
            cy.contains('Получить код').click() // нажимаю на кнопку получить код
            cy.contains(contains) // проверяю текст на странице
          })
        })
      })
    })
  },
  Code: function(popapTrigger) {
    consts.PopapCode.forEach(({ name, type, should, contain}) => { // цикл переходящий к попапу с вводом кода, содержащий имя проверки, type - вводимые данные, should - проверяеммые данные и contain - проверка текста в попапе
      it(name, () => { // имя проверки
        cy.wait(2000) // задержка для подгрузки страницы
        eval(popapTrigger); // Вызов попапа
        cy.get('div[data-headlessui-state="open"]').first().within(() => { // вхождение в попап
          cy.contains('Войти').click()// нахождение кнопки войти и клик по ним
          cy.get('input[type="tel"]').type('89875521211') // нахожу инпут, ввожу валидный номер
          cy.contains('Получить код').click() // нахожу кнопку получить код и кликаю по ней
          cy.get('input[name="code"]').type(type).should('have.value', should) // нахожу инпут, ввожу в него код из константы, проверяю его
          cy.contains('Отправить и войти').click() // нахожу кнопку отправить и нажимаю
          cy.contains(contain) // проверяю текст в попапе
        })
      })
    })
  }
}

module.exports = { // экспортируемые функции
Auth, CartBack, Cart, TestPopap
}