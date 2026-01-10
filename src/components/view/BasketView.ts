/*
#### Интерфейс IBasket
Эта сущность создана для описания данных
```
interface IBasket {
  basketList: IProduct[];
  totalPrice: number;
  emptyMessage: boolean;
}
```
#### Класс BasketView
Класс, отвечающий за отображение корзины покупок. 
В этом классе реализованы методы для добавления, удаления и отображения товаров в корзине.
Отвечает за взаимодействие с пользователем при работе с корзиной. 
*/
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

// type actions = {
//     onOrder?: () => void;
// };

export class BasketView extends Component<IBasket> {
    protected basketListElement: HTMLUListElement; // Элемент, содержащий список товаров в корзине, порядок не важен
    protected submitButton: HTMLButtonElement;
    protected totalPriceElement: HTMLElement;
    protected emptyMessageElement: HTMLElement;

    //все необходимые элементы должны быть найдены в конструкторе класса
    constructor(protected event: IEvents, container: HTMLElement, /**actions?: actions*/) {
        super(container);
        this.basketListElement = ensureElement<HTMLUListElement>('.basket__list', container);
        this.submitButton = ensureElement<HTMLButtonElement>('.basket__button', container);
        this.totalPriceElement = ensureElement<HTMLElement>('.basket__price', container);
        this.emptyMessageElement = ensureElement<HTMLElement>('.basket__empty-message', container);

        // if (actions?.onOrder) {
        //     this.submitButton.addEventListener('click', () => {
        //         actions.onOrder && actions.onOrder();
        //     });
        // }

        // //eventlistners
        this.submitButton.addEventListener('click', () => this.event.emit(State.BASKET_ADD_ORDERED));
    }

    //methods
    set basketList(items: HTMLElement[]) {
        this.basketListElement.innerHTML = '';
        this.basketListElement.append(...items);
    }

    set totalPrice(value: number) {
        this.totalPriceElement.textContent = `${value} синапсов`;
    }


    
    setButtonText(value: string): void {
        this.submitButton.textContent = value;
    }

    setEmptyMessage(isEmpty: boolean): void {
        this.emptyMessageElement.classList.toggle(
            'basket__empty-message_disabled', 
            !isEmpty);
        this.basketListElement.classList.toggle(
            'basket__list_disabled', 
            isEmpty);
    }

    setSubmitButtonState(isDisabled: boolean): void {
        this.submitButton.toggleAttribute('disabled', !isDisabled);
    }

}