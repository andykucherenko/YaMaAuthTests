const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'b8q2d3',
  e2e: {
    baseUrl: 'https://market.yandex.ru',
    scrollBehavior: 'center', // при нахождении элемента скролит так, чтоб элемент был в центре экрана
    defaultCommandTimeout: 10000, // увеличил таймаут завершения команды
    pageLoadTimeout: 30000 // увеличил таймаут загрузки страницы
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
      Browser: "Chrome",
    },
  },
});
