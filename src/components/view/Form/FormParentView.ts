/*
Class FormParentView
  Родительский класс для форм
  Содержит общие методы и свойства для всех форм
  Наследуется классами FormOrderView и FormContactView
    Отвечает за отображение формы и обработку событий
    Использует методы Класса Buyer для валидации формы и отправки данных

    View-слой не хранит данные — он получает их от Presenter и отображает с помощью метода render().

#### Интерфейс IFormParent
Эта сущность создана для описания данных
```interface IFormParent {
  formElement: HTMLElement;
}```


#### Абстрактеный Класс FormParentView
Описание:
Абстрактеный Класс FormParentView является родительским классом для всех форм в приложении. 
Он содержит общие методы и свойства, которые используются в формах заказа и контактов, например, методы для валидации формы и отправки данных.

Поля класса:
`protected formElement: HTMLElement` - Элемент формы.
`protected submitButton: HTMLButtonElement` - Кнопка отправки формы.

Методы класса:
`formValidation()` - Метод для валидации формы.
`formSubmit()` - Метод для отправки данных формы.



#### Класс FormOrderView
Описание:
Класс FormOrderView наследуется от FormParentView и отвечает за отображение и управление формой заказа.
Класс содержит методы для отправки данных формы заказа, обработки событий и валидации формы.

поля класса:
`protected formElement: HTMLElement` - элемент формы заказа


#### Класс FormContactView
Описание:
Класс FormContactView наследуется от FormParentView и отвечает за отображение и управление формой контактов.
Класс содержит методы для отправки данных формы контактов, обработки событий и валидации формы.

*/

import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";
import { State } from "../../../utils/constants";

interface IFormParent {
  formErrorElement: HTMLElement;
}

export interface IFormValidation {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export abstract class FormParentView extends Component<IFormParent> {
  protected _formError: HTMLElement;
  protected _submitButton: HTMLButtonElement;


  //все слушатели событий устанавливаются один раз в конструкторе класса;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this._formError = ensureElement<HTMLElement>('.form__errors', container);
    this._submitButton = ensureElement<HTMLButtonElement>('[type="submit"]', container);


    //eventListner
    // old variant: this._submitButton.addEventListener('click', () => this.events.emit(State.FORM_SUBMIT));
    this.container.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit(State.FORM_SUBMIT);
    });
  }

  //methods
  set formError(value: string) {
    this._formError.textContent = value;
  }


  //method to check validity of form
  abstract formValidation(error: IFormValidation): boolean;

  //method to clear error messages
  clearErrorMessages(): void {
    this._formError.textContent = '';
  };

  //method to toggle attribute state 'disabled'
  setSubmitEnabled(isEnabled: boolean): void {
  this._submitButton.disabled = !isEnabled;
}

  //method to toggle error class for input 'form__errors-active'
  toggleErrorClass(value: boolean): void {
    this._formError.classList.toggle('form__errors-active', value);
  };

  resetForm(): void {
    this.clearErrorMessages();
    this._submitButton.toggleAttribute('disabled', true);
  };



}