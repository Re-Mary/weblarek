/*
#### Класс FormContactView
Описание:
Класс FormContactView наследуется от FormParentView и отвечает за отображение и управление формой контактов.
Класс содержит методы для отправки данных формы контактов, обработки событий и валидации формы.
*/

import { IEvents } from "../../../base/Events";
import { FormParentView, IFormValidation } from "../FormParentView";
import { State } from "../../../../utils/constants";
import { ensureElement } from "../../../../utils/utils";

export class FormContactView extends FormParentView {
    private _email: HTMLInputElement;
    private _phone: HTMLInputElement;

    constructor(events: IEvents, container: HTMLElement) {
        super(events, container);
        this._email = ensureElement('[name="email"]', container) as HTMLInputElement;
        this._phone = ensureElement('[name="phone"]', container) as HTMLInputElement;

        //eventListner
        this._email.addEventListener('input', () => this.events.emit(State.FORM_EMAIL_CHANGED, { email: this._email.value }));
        this._phone.addEventListener('input', () => this.events.emit(State.FORM_PHONE_CHANGED, { phone: this._phone.value }));
        this._submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.events.emit(State.FORM_CONTACTS_ADD);
        });
        
    }


    formValidation(error: IFormValidation): boolean {
        this.clearErrorMessages();
        this.formError = error.email || error.phone || '';
        return !error.email && !error.phone;
        // if (error.email) {
        //     this._email.classList.add('form__errors-active');
        //     return false;
        // }
        // if (error.phone) {
        //     this._phone.classList.add('form__errors-active');
        //     return false;
        // }
        // return true;
    }

    clearPhoneEmailFields(): void {
        this._email.value = '';
        this._phone.value = '';
    }

    resetForm(): void {
        super.resetForm();
        this.clearPhoneEmailFields();
    }

}