import { CardImageCategoryView } from "../CardImageCategoryView";
import { IEvents } from "../../../../base/Events";
import { ensureElement } from "../../../../../utils/utils";
import { State } from "../../../../../utils/constants";


/**
 * @description
 * Класс CardPreviewView
 * Описание:
 * Класс CardPreviewView является дочерним классом от CardImageCategoryView.
 * Он представляет собой карточку товара в каталоге с возможностью предпросмотра и добавления в корзину.
 */


/**
#### Класс CardPreviewView
Описание класса:
`CardPreviewView` расширяет `CardImageCategoryView` и предназначен для отображения превью карточки товара. 
При клике на кнопку генерируется событие обновления корзины с идентификатором товара.
 */





export class CardPreviewView extends CardImageCategoryView {
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

    constructor(    
        container: HTMLElement,
        protected events: IEvents
    ) {
        super(container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', container);
        this.buttonElement.addEventListener('click', () =>
            events.emit(State.BASKET_TOGGLE_ITEM));
    }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.buttonElement.textContent = value;
  }

  set buttonActive(isActive: boolean) {
    this.buttonElement.classList.toggle('card__button_disabled', !isActive);
  }
}


// export class CardPreviewView extends CardImageCategoryView{
//     protected descriptionElement: HTMLElement;
//     protected buttonElement: HTMLElement;
//     protected events!: IEvents;

//     constructor(container: HTMLElement, events: IEvents, cdnUrl: string, categoryMapping: Record<string, string> = categoryMap) {
//         super(container, events, cdnUrl, categoryMapping);
//         this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
//         this.buttonElement = ensureElement<HTMLElement>('.card__button', container);

//         //eventListner
//         this.buttonElement.addEventListener('click', () => 
//             this.events.emit(State.BASKET_TOGGLE_ITEM, { id: this.id }));
//     }

//     //methods
//     set description(value: string) {
//         this.descriptionElement.textContent = value;
//     }

//     set buttonText(value: string) {
//         this.buttonElement.textContent = value;
//     }

//     //toggle state to enable/disable button
//     toggleState(isActive: boolean): void {
//         this.buttonElement.classList.toggle('card__button_disabled', !isActive);
//     }
// }