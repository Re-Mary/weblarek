import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";
import { State } from "../../../utils/constants";

/**
 * @description
 * Класс FormParentView
 * Описание:
 * Абстрактный класс FormParentView служит базовым классом для всех форм в приложении.
 * Он предоставляет общие методы и свойства для управления формами, включая обработку ошибок,
 * валидацию и управление состоянием кнопки отправки.
 */

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