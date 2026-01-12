import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { State } from "../../utils/constants";

interface IBasket {
    basketList: IProduct[];
    totalPrice: number;
    emptyMessage: boolean;
}

export class BasketView extends Component<IBasket> {
    protected basketListElement: HTMLUListElement; // Элемент, содержащий список товаров в корзине, порядок не важен
    protected submitButton: HTMLButtonElement;
    protected totalPriceElement: HTMLElement;
  
    constructor(protected event: IEvents, container: HTMLElement, /**actions?: actions*/) {
        super(container);
        this.basketListElement = ensureElement<HTMLUListElement>('.basket__list', container);
        this.submitButton = ensureElement<HTMLButtonElement>('.basket__button', container);
        this.totalPriceElement = ensureElement<HTMLElement>('.basket__price', container);
        this.setSubmitButtonState(false);

        //eventlistner
        this.submitButton.addEventListener('click', () => this.event.emit(State.BASKET_ADD_ORDERED));
    }

    //methods
    set basketList(items: HTMLElement[]) {
        this.basketListElement.replaceChildren(...items);
    }

    set totalPrice(value: number) {
        this.totalPriceElement.textContent = `${value} синапсов`;
    }


    
    setButtonText(value: string): void {
        this.submitButton.textContent = value;
    }

    setSubmitButtonState(isDisabled: boolean): void {
        this.submitButton.toggleAttribute('disabled', !isDisabled);
    }

}