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
        this.container.addEventListener('click', () => this.event.emit(State.MODAL_CLOSE));
        this.closeButton.addEventListener('click', () => this.event.emit(State.MODAL_CLOSE));
        this.contentElement.addEventListener('click', (e: Event) => {
                e.stopPropagation(); // Предотвращаем закрытие модального окна при клике внутри контента
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