/*
#### Интерфейс компонента SuccessView
Эта сущность создана для описания данных компонента `SuccessView`.
```
interface ISuccsess {
    totalPrice: number;
}
```

#### Класс компонента SuccessView
Класс отвечает за отображение успешного оформления заказа.

Поля:
`protected totalPriceElement: HTMLElement` - элемент, отображающий общую стоимость оплаченной покупки
`protected succeedOrderCloseButton: HTMLButtonElement` - кнопка закрытия окна успешного оформления заказа

//все слушатели событий устанавливаются один раз в конструкторе класса;
Конструктор:
`constructor(protected event: IEvents, container: HTMLElement) {}` - Принимает объект событий и контейнер для рендеринга.

Методы:
`set totalPrice(value: number)` - Устанавливает общую стоимость оплаченной покупки.

*/

import { State } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccsess {
    totalPrice: number;
}

export class SuccessView extends Component<ISuccsess> {
    protected totalPriceElement: HTMLElement;
    protected confirmationButton: HTMLButtonElement;

    constructor(protected event: IEvents, container: HTMLElement) {
        super(container);
        this.totalPriceElement = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.confirmationButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        //eventlistner
        this.confirmationButton.addEventListener('click', () => this.event.emit(State.CONFIRMATION_CLOSE));

    }

    set totalPrice(value: number) {
        this.totalPriceElement.textContent = `Списано ${value} синапсов`;
    }
}