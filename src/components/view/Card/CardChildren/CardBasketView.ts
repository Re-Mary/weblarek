import { CardParentView } from "../CardParentView";
import { IEvents } from "../../../base/Events";
import { ensureElement } from "../../../../utils/utils";
import { State } from "../../../../utils/constants";
import { events } from "../../../../main";

/**
 * Класс CardBasketView
 * Описание:
 * Класс CardBasketView является дочерним классом от CardParentView.
 * Он представляет собой карточку товара в корзине.
 */

type onRemove = {
    onRemove?: () => void;
};

export class CardBasketView extends CardParentView {
    private _deleteButtonElement: HTMLButtonElement;
    private _indexElement: HTMLElement;


    constructor(container: HTMLElement, actions?: onRemove) {
        super(container);
        this._deleteButtonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', container);
        this._indexElement = ensureElement<HTMLElement>('.basket__item-index', container);

        if (actions?.onRemove) {
            this._deleteButtonElement.addEventListener('click', (e) => {    
                e.preventDefault();
                e.stopPropagation();
                actions.onRemove && actions.onRemove();
            });
        }
    }

    set index(value: number) {
        this._indexElement.textContent = value.toString();
    }
    
}



