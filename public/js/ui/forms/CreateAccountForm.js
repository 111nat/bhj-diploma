/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response && response.success) {
        for (let i = 0; i < this.element.querySelectorAll('input').length; i++) {
          this.element.querySelectorAll('input')[i].value = '';
        }
       new Modal(App.getModal('createAccount').element).close();
       App.update();
      }
    })
  }
}