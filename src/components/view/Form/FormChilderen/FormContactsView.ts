import { IEvents } from "../../../base/Events";
import { FormParentView } from "../FormParentView";
import { State } from "../../../../utils/constants";
import { ensureElement } from "../../../../utils/utils";


//NEW
export interface IFormContactsView {
  email: string;
  phone: string;
  errors?: string;
  stateButton?: boolean;
}


export class FormContactView extends FormParentView<IFormContactsView> {
    private _email: HTMLInputElement;
    private _phone: HTMLInputElement;

    constructor(events: IEvents, container: HTMLElement) {
        super(events, container);
        this._email = ensureElement('[name="email"]', container) as HTMLInputElement;
        this._phone = ensureElement('[name="phone"]', container) as HTMLInputElement;

        //eventListner
        this._email.addEventListener('input', () => this.events.emit(State.FORM_EMAIL_CHANGED, { email: this._email.value }));
        this._phone.addEventListener('input', () => this.events.emit(State.FORM_PHONE_CHANGED, { phone: this._phone.value }));
        
    };

    set email(value: string) {
        this._email.value = value;
    };
    set phone(value: string) {
        this._phone.value = value;
    };


}