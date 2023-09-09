//const consts = require('./consts')
//const functions = require('./functions')

function TestStandartFunctional(visit) { // тест базовых действий на странице
    describe('Тестовый набор для проверки повторяющихся элементов', () => {  // Название теста в консоли
  
      it ('Проверка протокола', () => {               // Проверка протокола на странице, делаем 1 раз и не повторяем на каждом разрешении
        cy.visit(visit)
        cy.wait(2000)
        cy.location('protocol').should('eq', 'https:')// Команда проверяющая протокол, где написано 'https:' - протокол, который ищем
      })
  
      it ('Проверка поиска', () => {           // Проверка поиска на странице, делаем 1 раз и не повторяем на каждом разрешении    
        cy.visit(visit)
        cy.wait(2000) 
        cy.get('input[type="search"]').type('Масло').should('have.value', 'Масло')
      })
  
      consts.Viewport.forEach(({ name, width, height, popapTrigger }) => { // цикл с различными разрешениями, от пк до мелкого телефона
        context(name, () => {                          // Название разрешения
          beforeEach(() => {                        // Функция с условиями тестирования
            cy.viewport(width, height)                     //  Расширение экрана
            cy.visit(visit)                               // Какую страницу посетить. Ставлю visit, так как на странице, где буду вызывать данную функцию, буду указывать переменную с нужным слагом
          })
          functions.TestPopap.Telephone(popapTrigger)
          functions.TestPopap.Code(popapTrigger)
        })
      })
    })
  }

function TestCartRequest() {
    describe('Тест запросов для корзины', () => {
        context('пк', () => {                           // Название подпункта тестирования
          beforeEach(() => {                            // Функция с условиями тестирования
            functions.Auth.Login() // Авторизируемся и получаем токен 
          })
        it ('Очистка всей корзины', () => {
          functions.CartBack.DeleteItemAll() // Очищаем всю корзину
          })
      
          it ('Получение корзины', () => {
            functions.CartBack.GetCard() 
            })
      
          it ('Добавление товара id 27', () => {
            functions.CartBack.AddItem()
            })
      
          it ('Получение корзины', () => {
            functions.CartBack.GetCard() 
            })
      
          it ('Добавление количества товара id 27', () => {
            functions.CartBack.ItemCount()
            })
      
          it ('Получение корзины', () => {
            functions.CartBack.GetCard() 
            })
            
          it ('Удаление товара id 27', () => {
            functions.CartBack.DeleteItem()
            })
      
          it ('Получение корзины', () => {
            functions.CartBack.GetCard() 
            })
          
          it ('Добавление товара id 27 и 28', () => {
            functions.CartBack.AddItem()
            cy.get('@authtoken').then((authtoken) => {
              cy.request({
                method: 'POST',
                url: 'https://back.dev.mashuk.tltpro.org/card/add_item/',
                headers: {
                  Authorization: `Token ${authtoken}`
                },
                body: {
                  product_id: 28, 
                  count: 1
                }
              }).then((response) => {
                cy.log(response.body)
                expect(response.status).to.eq(200) // Проверяем статус-код ответа
              })
            })
            })
      
          it ('Получение корзины', () => {
            functions.CartBack.GetCard() 
            })
          
          it ('Удаление нескольких товаров id 27 и 28', () => {
            functions.CartBack.DeleteItems()
            })
      
          it ('Получение корзины', () => {
            functions.CartBack.GetCard() 
            })
            })
          })
}

  module.exports = { // экспортируемые функции
    TestStandartFunctional, TestCartRequest
    }