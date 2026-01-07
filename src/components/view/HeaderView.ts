import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { State } from "../../utils/constants";

interface IHeader {
    counter: number;
}

export class HeaderView extends Component<IHeader> {
    protected counterElement: HTMLElement;
    protected basketButton: HTMLButtonElement;
   
    //все необходимые элементы должны быть найдены в конструкторе класса
    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter');
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket');

        //eventListner
        this.basketButton.addEventListener('click', () => this.events.emit(State.BASKET_OPEN));
    }

    //methods [setter]
    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
    
}   