import { IEvents } from "../../../base/Events";
import { FormParentView } from "../FormParentView";
import { State } from "../../../../utils/constants";
import { ensureElement } from "../../../../utils/utils";
import { TPayment } from "../../../../types";

export interface IFormOrderView {
    payment: TPayment | null;
    address: string;
    errors?: string;
    stateButton?: boolean;
}

export class FormOrderView extends FormParentView<IFormOrderView> {
    private paymentByCard: HTMLButtonElement;
    private cashPayment: HTMLButtonElement;
    private addressInput: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);

        this.paymentByCard = ensureElement<HTMLButtonElement>('[name="card"]', container);
        this.cashPayment = ensureElement<HTMLButtonElement>('[name="cash"]', container);
        this.addressInput = ensureElement<HTMLInputElement>('[name="address"]', container);

        //eventListner
        this.paymentByCard.addEventListener('click', () => this.events.emit(State.FORM_PAYMENT_CHANGED, { payment: 'card' }));
        this.cashPayment.addEventListener('click', () => this.events.emit(State.FORM_PAYMENT_CHANGED, { payment: 'cash' }));
        this.addressInput.addEventListener('input', () => this.events.emit(State.FORM_ADDRESS_CHANGED, { address: this.addressInput.value }));

    }

    set address(value: string) {
        this.addressInput.value = value;
    };

    set payment(value: TPayment) {
        this.paymentByCard.classList.toggle('button_alt-active', value === 'card');
        this.cashPayment.classList.toggle('button_alt-active', value === 'cash');
    };
    

}