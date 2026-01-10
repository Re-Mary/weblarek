/*

#### Интерфейс компонента ModalView
Эта сущность создана для описания данных компонента `ModalView`.
```
interface IModal {
    content: HTMLElement;
}

#### Класс ModalView
Описание:
Класс ModalView отвечает за отображение и управление модальным окном.

Поля:

Методы:

*/

import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { State } from "../../utils/constants";

interface IModal {
    content: HTMLElement;

}

export class ModalView extends Component<IModal> {
    protected contentElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(protected event: IEvents, container: HTMLElement) {
        super(container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content');
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close');

        //eventlistners
        this.container.addEventListener('click', () => this.event.emit(State.MODAL_CLOSE)); //new
        this.closeButton.addEventListener('click', () => this.event.emit(State.MODAL_CLOSE));
        this.contentElement.addEventListener('click', (e: Event) => {
            if (e.target === this.contentElement) {
                e.stopPropagation(); //new
                this.event.emit(State.MODAL_CLOSE);
                
            }
        });

    }

    //methods
    set content(value: HTMLElement) {
        this.contentElement.replaceChildren(value);
    }

    openModal(value: HTMLElement): void {
        this.contentElement.replaceChildren(value);
        this.container.classList.add('modal_active');
    }

    closeModal(): void {
        this.container.classList.remove('modal_active');
    }


}