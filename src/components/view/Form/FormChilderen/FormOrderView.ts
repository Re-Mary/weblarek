import { IEvents } from "../../../base/Events";
import { FormParentView, IFormValidation } from "../FormParentView";
import { State } from "../../../../utils/constants";
import { ensureElement } from "../../../../utils/utils";
import { TPayment } from "../../../../types";

export class FormOrderView extends FormParentView {
    private _paymentByCard: HTMLButtonElement;
    private _cashPayment: HTMLButtonElement;
    private _addressInput: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);

        this._paymentByCard = ensureElement<HTMLButtonElement>('[name="card"]', container);
        this._cashPayment = ensureElement<HTMLButtonElement>('[name="cash"]', container);
        this._addressInput = ensureElement<HTMLInputElement>('[name="address"]', container);

        //eventListner
        this._paymentByCard.addEventListener('click', () => this.events.emit(State.FORM_PAYMENT_CHANGED, { payment: 'card' }));
        this._cashPayment.addEventListener('click', () => this.events.emit(State.FORM_PAYMENT_CHANGED, { payment: 'cash' }));
        this._addressInput.addEventListener('input', () => this.events.emit(State.FORM_ADDRESS_CHANGED, { address: this._addressInput.value }));
        this._submitButton.addEventListener('click', () => this.events.emit(State.FORM_SUBMIT_ORDER));
    }

    //methods
    formValidation(error: IFormValidation): boolean {
        this.clearErrorMessages();
        this.formError = error.payment || error.address || ''
        return !error.payment && !error.address;
    }


    resetForm(): void {
        super.resetForm();
        this.clearErrorMessages();
        this._paymentByCard.classList.remove('button_alt-active');
        this._cashPayment.classList.remove('button_alt-active');
    }

    togglePaymentStatus(status: TPayment): void {
        this._paymentByCard.classList.toggle('button_alt-active', status === 'card')
        this._cashPayment.classList.toggle('button_alt-active', status === 'cash')
    }
    
    clearAderessInput(): void {
        this._addressInput.value = '';
    }

}