import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface IFormParent {
  errors?: string;
  stateButton?: boolean;
}

export interface IFormValidation {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}



export abstract class FormParentView<T> extends Component<T> {
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
      const name = this.container.getAttribute('name');
      if (name) {
        this.events.emit(`${name}:submit`);
      }

    });
  }

  set formError(value: string) {
    this._formError.textContent = value;
  }

  set setSubmitState(enabled: boolean) {
    this._submitButton.disabled = !enabled;
  }

}