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
`protected contentElement: HTMLElement` - элемент, содержащий контент модального окна
`protected closeButton: HTMLButtonElement` - кнопка закрытия модального окна

//все слушатели событий устанавливаются один раз в конструкторе класса;
//о действиях пользователя класс представления уведомляет с помощью брокера событий или вызывает обработчик, полученный в конструкторе. В случае, если в класс представления передается обработчик, то этот обработчик должен содержать генерацию события с помощью брокера событий;
Конструктор:
`constructor(protected event: IEvents, container: HTMLElement) {}` - Принимает объект событий и контейнер для рендеринга.

Методы:
`set content(value: HTMLElement)` - Устанавливает контент модального окна.

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
        this.closeButton.addEventListener('click', () => this.event.emit(State.MODAL_CLOSE));
        this.contentElement.addEventListener('click', (e: Event) => {
            if (e.target === this.contentElement) this.event.emit(State.MODAL_CLOSE);
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