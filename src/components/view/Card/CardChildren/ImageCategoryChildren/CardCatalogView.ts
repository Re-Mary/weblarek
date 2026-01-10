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

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }
}
