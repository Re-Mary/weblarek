import { CardImageCategoryView } from "../CardImageCategoryView";
import { IEvents } from "../../../../base/Events";
import { categoryMap } from "../../../../../utils/constants";
import { State } from "../../../../../utils/constants";


export class CardCatalogView extends CardImageCategoryView {
    constructor(container: HTMLElement, events: IEvents, cdnUrl: string, categoryMapping: Record<string, string> = categoryMap) {
        super(container, events, cdnUrl, categoryMapping);

        //eventListner
        this.container.addEventListener('click', () => this.events.emit(State.CATALOG_OPEN, { id: this.id }));
    }
}