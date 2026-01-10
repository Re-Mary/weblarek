
import { ensureElement } from "../../../../utils/utils";
import { CardParentView } from "../CardParentView";
import { categoryMap } from "../../../../utils/constants";
import { CDN_URL } from "../../../../utils/constants";

/**
 * @description
 * Класс CardImageCategoryView
 * Описание:
 * Абстрактный класс карточек с изображением и категорией
 * Родитель для карточек каталога и предпросмотра.
 */


export abstract class CardImageCategoryView extends CardParentView {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(
    container: HTMLElement,
  ) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
  }

  set image(value: string) {
    const imagePath = CDN_URL + value.replace(/\.\w+$/, '.png');
    this.imageElement.src = imagePath;
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
        this.categoryElement.classList.toggle(categoryMap[key as keyof typeof categoryMap], key === value);
  }
}
}
