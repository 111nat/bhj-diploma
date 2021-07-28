/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */




class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
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
      this.update();
      
    }
    catch (e) {
      console.log(e);
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    

    document.querySelector('.create-account').addEventListener('click', () => {
      new Modal(App.getModal('createAccount').element).open();
    });
    
    if (!User.current()) {
      let acc = this.element.querySelectorAll('.account');
      for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', this.onSelectAccount());
      }
    }

  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        //console.log(response);
        this.clear();
        this.renderItem(response.data);
        
        let acc = this.element.querySelectorAll('.account');
        for (let i = 0; i < acc.length; i++) {
          acc[i].addEventListener('click', () => {
            this.onSelectAccount(acc[i]);
          });
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const acc = this.element.getElementsByClassName('account');
    while (acc.length != 0) {
      acc[0].outerHTML = '';
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    let acc = this.element.querySelectorAll('.account');
    for (let i = 0; i < acc.length; i++) {
      if (acc[i].classList.contains('active')) {
        acc[i].classList.remove('active')
      }
    }

    element.classList.add('active');

    const use_id = element.dataset.userId;
    App.showPage('transactions', { /*[`${use_id}`]*/account_id : element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `<li class="account" data-id="${item.id}" data-user-id="${item.user_id}">
      <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum} ₽</span>
      </a>
    </li>`;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    for (let i = 0; i < data.length; i++) {
      this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data[i]));
    }
  }
}
