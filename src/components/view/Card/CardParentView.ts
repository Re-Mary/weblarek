/*
Родительский класс для карточек. Содержит общие методы и свойства для всех карточек.
Наследуется классами CardBasketView и CardImageCategoryView
*/

import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";


export abstract class CardParentView extends Component<IProduct> {
  protected priceElement: HTMLElement;
  protected titleElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.priceElement = ensureElement<HTMLElement>('.card__price', container);
    this.titleElement = ensureElement<HTMLElement>('.card__title', container);
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set price(value: number | null) {
    this.priceElement.textContent =
      value !== null ? `${value} синапсов` : 'Бесценно';
  }
}





// export abstract class CardParentView extends Component<IProduct> {
//     protected idElement: string;
//     protected priceElement: HTMLElement;
//     protected titleElement: HTMLElement;
//     protected events: IEvents;

//     constructor(events: IEvents, container: HTMLElement) {
//         super(container);
//         this.idElement = '';
//         this.priceElement = ensureElement<HTMLElement>('.card__price', container);
//         this.titleElement = ensureElement<HTMLElement>('.card__title', container);
//         this.events = events;

//         //eventListner
//         this.container.addEventListener('click', () => this.events.emit(State.CARD_CATALOG_LOAD, { id: this.id }));
//     }

//     // --- ID ---
//     set id(value: string) {
//         this.idElement = value;
//     }

//     get id(): string {
//         return this.idElement;
//     }

//     // --- PRICE ---
//     set price(value: number) {
//         this.priceElement.textContent = value !== null ? `${value} синапсов` : 'Бесценно';
//     }

//     // --- TITLE ---
//     set title(value: string) {
//         this.titleElement.textContent = value;
//     }
// }
