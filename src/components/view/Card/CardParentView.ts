import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

/**
 * @description
 * Класс CardParentView
 * Описание: 
 * Абстрактный класс карточек.
 * Родительский класс для карточек. Содержит общие методы и свойства для всех карточек.
 * Наследуется классами CardBasketView и CardImageCategoryView
 */

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

