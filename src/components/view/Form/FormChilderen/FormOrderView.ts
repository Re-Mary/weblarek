/*
    выбор способа оплаты;
    ввод адреса доставки;
    если адрес доставки не введён, появляется сообщение об ошибке;
    если способ оплаты не выбран, появляется сообщение об ошибке;
    кнопка «Далее» может быть активной, если: на форме нет ошибок, выбран способ оплаты и поле адреса доставки непустое;
    при нажатии «Далее» открывается вторая форма оформления покупки.
#### Класс FormOrderView

Назначение:
Форма первого шага оформления заказа — выбор способа оплаты и ввод адреса доставки.

Поля:
private cardPaymentButtonElement: HTMLButtonElement;
private cashPaymentButtonElement: HTMLButtonElement;
private addressInputElement: HTMLInputElement;

Конструктор:
constructor(protected events: IEvents, container: HTMLElement) {
// ...
//eventListner and emits

//Validation through abstarct FormParent's methods
//reset method
//toggle state
//clear validation
};

Методы:
protected onInputChange(): void - обработчик события изменения значения в полях
// метод render() класса, вызываемый без передачи аргументов, должен возвращать разметку класса;
render(): HTMLElement





Особенности:
При изменении любого поля эмитирует событие AppEvents.ORDER_UPDATE;
Проверяет, заполнен ли адрес и выбран ли способ оплаты;
Активирует кнопку «Далее», если данные валидны.
*/


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

        this.container.addEventListener('focusin', (event) => {
            if (event.target instanceof HTMLInputElement)
                this.events.emit(State.FORM_INPUT_FOCUS)
        });
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

    // is it necessary?
    // toggleErrorClass(value: boolean): void {
    //     this._formError.classList.toggle('form__errors-active', value);
    // }   


    clearAderessInput(): void {
        this._addressInput.value = '';
    }

}