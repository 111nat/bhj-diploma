
/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if (response && response.success) {
        if (this.element.querySelector('#expense-accounts-list')) {
          for (let i = 0; i < response.data.length; i++) {
            this.element.querySelector('#expense-accounts-list').innerHTML = this.element.querySelector('#expense-accounts-list').innerHTML + `<option value="${response.data[i].id}">${response.data[i].name}</option>`;
          }
        }
  
        if (this.element.querySelector('#income-accounts-list')) {
          for (let i = 0; i < response.data.length; i++) {
            this.element.querySelector('#income-accounts-list').innerHTML = this.element.querySelector('#income-accounts-list').innerHTML + `<option value="${response.data[i].id}">${response.data[i].name}</option>`;
          }
        }
      }
     // console.log(response);
     // console.log(this.element);

      //console.log(this.element.querySelector('#income-accounts-list'));
      //console.log(this.element.querySelector('#expense-accounts-list'));

      

    });
    //this.element.getElementById('expense-accounts-list');
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {

   
    //console.log(data);
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        for (let i = 0; i < this.element.querySelectorAll('input').length; i++) {
          this.element.querySelectorAll('input')[i].value = '';
        }

        if (this.element.getAttribute('id') == 'new-expense-form') {
          new Modal(App.getModal('newExpense').element).close();
        }
        else {
          new Modal(App.getModal('newIncome').element).close();
        }

        App.update();
        
      }
    });


    Transaction.list(User.current(), (err, response) => {
      console.log(response);
    });

  }
}