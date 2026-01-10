import { CardImageCategoryView } from "../CardImageCategoryView";

/**
 * @description
 * Класс CardCatalogView
 * Описание:
 * Класс CardCatalogView является дочерним классом от CardImageCategoryView.
 * Он представляет собой карточку товара в каталоге с возможностью открытия подробной информации.
 */

interface ICardCatalogActions {
  onClick?: () => void;
}

export class CardCatalogView extends CardImageCategoryView {
  constructor(
    container: HTMLElement,
    actions?: ICardCatalogActions

  ) {
    super(container);
    console.log(actions);

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }
}


// export class CardCatalogView extends CardImageCategoryView {
//     protected
//     constructor(container: HTMLElement, events: IEvents, cdnUrl: string, categoryMapping: Record<string, string> = categoryMap) {
//         super(container, events, cdnUrl, categoryMapping);

//         //eventListner
//         this.container.addEventListener('click', () => this.events.emit(State.CATALOG_OPEN, { id: this.id }));
//     }
// }