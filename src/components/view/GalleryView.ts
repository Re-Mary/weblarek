import { Component } from "../base/Component";


export interface IGallery {
    catalog: HTMLElement[];
}

export class GalleryView extends Component<IGallery>{

    //все необходимые элементы должны быть найдены в конструкторе класса
    constructor(container: HTMLElement) {
        super(container);
    }
    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }

}