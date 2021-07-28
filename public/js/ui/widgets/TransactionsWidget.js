/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    try {
      if (element == undefined) {
        throw new Error();
      }
      this.element = element;
      this.registerEvents();
    }
    catch (e) {
      console.log(e);
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element.querySelector('.btn-success').addEventListener('click', () => {
      new Modal(App.getModal('newIncome').element).open();
    });

    this.element.querySelector('.btn-danger').addEventListener('click', () => {
      new Modal(App.getModal('newExpense').element).open();
    });
  }
}
