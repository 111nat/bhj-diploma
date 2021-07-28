/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebar_toggle = document.getElementsByClassName('sidebar-toggle')[0];
    const body = document.getElementsByTagName('body')[0];

    sidebar_toggle.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    //console.log(App.getModal('register').element);

    //const modal = new Modal(App.getModal('register').element);
    document.getElementsByClassName('menu-item_register')[0].addEventListener('click', () => {
      new Modal(App.getModal('register').element).open();
    });

    document.getElementsByClassName('menu-item_login')[0].addEventListener('click', () => {
      new Modal(App.getModal('login').element).open();
    });

    document.getElementsByClassName('menu-item_logout')[0].addEventListener('click', () => {
      User.logout(() => {
        App.setState('init');
      });
      //if response.success App.setState('init')
    });
    
  }
}