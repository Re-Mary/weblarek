
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






// export abstract class CardImageCategoryView extends CardParentView {
//     // Элементы DOM
//     protected _imageElement: HTMLImageElement;
//     protected _categoryElement: HTMLElement;

//     // Конфигурация
//     protected _cdnUrl: string;
//     protected _categoryMap: Record<string, string>;

//     constructor(
//         container: HTMLElement,
//         events: IEvents,
//         cdnUrl: string,
//         categoryMapping: Record<string, string> = categoryMap
//     ) {
//         super(events, container);

//         // Сохраняем ссылки на элементы
//         this._imageElement = ensureElement<HTMLImageElement>('.card__image', container);
//         this._categoryElement = ensureElement<HTMLElement>('.card__category', container);

//         // Настройки
//         this._cdnUrl = cdnUrl;
//         this._categoryMap = categoryMapping;
//         this.events = events;
//     }

//     /**
//      * Устанавливает изображение карточки
//      */
//     /* Константа для формирования полного пути к изображениям карточек. 
// Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
// которое хранится в объекте товара.
// export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`; */

//      protected setImage(imageElement: HTMLImageElement, imagePath: string, title: string) {
//          imageElement.src = imagePath;
//          imageElement.alt = title;
//      }

//      set image(value: string) {
//         const imagePath = this._cdnUrl + value.replace(/\.\w+$/, '.png');
//          this.setImage(this._imageElement, imagePath, this.titleElement?.textContent ?? '');
//      }

//     /**
//      * Устанавливает категорию карточки
//      */
//     set category(value: string) {
//         this._categoryElement.textContent = value;
//         this.updateCategoryClass(value);
//     }
    
//     /**
//      * Обновляет CSS-класс категории на основе карты соответствий
//      */
//     protected updateCategoryClass(categoryName: string): void {
//         Object.entries(this._categoryMap).forEach(([key, className]) => {
//             this._categoryElement.classList.toggle(className, key === categoryName);
//         });
//     }
// }
