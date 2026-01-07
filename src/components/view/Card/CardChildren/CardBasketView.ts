import { CardParentView } from "../CardParentView";
import { IEvents } from "../../../base/Events";
import { ensureElement } from "../../../../utils/utils";
import { State } from "../../../../utils/constants";

/**
 * Класс CardBasketView
 * Описание:
 * Класс CardBasketView является дочерним классом от CardParentView.
 * Он представляет собой карточку товара в корзине.
 */

export class CardBasketView extends CardParentView {
    private _deleteButtonElement: HTMLButtonElement;
    private _indexElement: HTMLElement;

    constructor(events: IEvents, container: HTMLElement) {
        super(events, container);
        this._deleteButtonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', container);
        this._indexElement = ensureElement<HTMLElement>('.basket__item-index', container);

        //eventListner
        this._deleteButtonElement.addEventListener('click', () => events.emit(State.BASKET_REMOVE, { id: this.id }));
    }

    set index(value: number) {
        this._indexElement.textContent = value.toString();
    }
}



