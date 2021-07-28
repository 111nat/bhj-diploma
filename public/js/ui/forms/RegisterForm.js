/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
      console.log(response);
      if (response && response.success) {
        App.setState( 'user-logged' );
        for (let i = 0; i < this.element.querySelectorAll('input').length; i++) {
          this.element.querySelectorAll('input')[i].value = '';
        }
       new Modal(App.getModal('register').element).close();
      }
      
    });
  }
}