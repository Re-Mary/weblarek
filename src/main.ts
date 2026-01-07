import './scss/styles.scss';
import { Products } from './components/models/Products';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Api } from './components/base/Api';
import { ShopApi } from './components/base/ShopApi';
import { API_URL, categoryMap, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import { State } from './utils/constants';
import { IProduct, TPayment } from './types/index';
import { cloneTemplate, ensureElement } from './utils/utils';
import { HeaderView } from './components/view/HeaderView';
import { CardCatalogView } from './components/view/Card/CardChildren/ImageCategoryChildren/CardCatalogView';
import { CardPreviewView } from './components/view/Card/CardChildren/ImageCategoryChildren/CardPreviewView';
import { GalleryView} from './components/view/GalleryView';
import { BasketView } from './components/view/BasketView';
import { CardBasketView } from './components/view/Card/CardChildren/CardBasketView';
import { ModalView } from './components/view/ModalView';
import { FormOrderView } from './components/view/Form/FormChilderen/FormOrderView';
import { FormContactView } from './components/view/Form/FormChilderen/FormContactsView';
import { SuccessView } from './components/view/SuccessesView';


//set Api instance
const apiInstance = new Api(API_URL);
const shopApi = new ShopApi(apiInstance);

//set Events instance (Broker)
export const events = new EventEmitter();

//create model instances
const productsModel = new Products(events);
const basketModel = new Basket(events);
const buyerModel = new Buyer(events);

//Teamplates
const TeamplateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const TeamplateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const TeamplateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const TemplateBasket = ensureElement<HTMLTemplateElement>('#basket');
const TeamplateOrderForm = ensureElement<HTMLTemplateElement>('#order');
const TeamplateContactForm = ensureElement<HTMLTemplateElement>('#contacts');
const TeamplateSuccess = ensureElement<HTMLTemplateElement>('#success');

//Elements
const modalContainer = ensureElement<HTMLElement>('.modal');
const galleryElement = ensureElement<HTMLElement>('.gallery');
const headerElement = ensureElement<HTMLElement>('.header');

//View initialisation
const headerView = new HeaderView(events, headerElement);
const modalView = new ModalView(events, modalContainer);
const galleryView = new GalleryView(galleryElement);
const success = new SuccessView(events, cloneTemplate(TeamplateSuccess));
const basketView = new BasketView(events, cloneTemplate(TemplateBasket));
const cardPreview = new CardPreviewView(cloneTemplate(TeamplateCardPreview), events, CDN_URL, categoryMap);
const formOrderView = new FormOrderView(events, cloneTemplate(TeamplateOrderForm));
const formContactView = new FormContactView(events, cloneTemplate(TeamplateContactForm));



//get products from server and set them to productsModel
shopApi.getProducts()
    .then(data => { productsModel.setItems(data) })
    .catch((err) => console.log('Ошибка при получении данных с сервера: ', err));


//EVENTS
//Update Gallery
//подписываемся на событие, которое вызывается при добавлении товаров с сервера в модель, чтобы отобразить карточки на странице в галерее
events.on(State.CATALOG_UPDATE_SET_ITEMS, (product: IProduct[]) => {
    const cards = product.map(product =>
        //возвращаем созданный экземпляр класса CardCatalogView
        new CardCatalogView(cloneTemplate(TeamplateCardCatalog), events, CDN_URL, categoryMap).render(product)
    )
    galleryView.catalog = cards;
    console.log(cards);
})

//Click on card in gallery
events.on(State.CATALOG_OPEN, (data: { id: string }) => {
    const product = productsModel.getItemById(data.id);
    if (!product) return;
    productsModel.setSelectedItem(product);
})

//Update Card and open preview card

/*
    показана детальная информация о товаре;
    присутствует кнопка «Купить», если товар не был выбран покупателем;
    при нажатии на кнопку «Купить» товар добавляется в корзину (если не был добавлен в корзину ранее);
    если товар находится в корзине, кнопка должна быть заменена на «Удалить из корзины»;
    при нажатии на кнопку «Удалить из корзины» товар удаляется из корзины;
    после нажатия кнопки модальное окно закрывается;
    если у товара нет цены, кнопка в карточке должна быть заблокирована и иметь название «Недоступно».
*/

events.on(State.CATALOG_UPDATE_SET_SELECTED_ITEM, (product: IProduct) => {
    const cardRender = cardPreview.render(product);

    if (product.price === null) {
        cardPreview.toggleState(false);
        cardPreview.buttonText = 'Недоступно';
    } else if (basketModel.hasItem(product.id)) {
        cardPreview.toggleState(true);
        cardPreview.buttonText = 'Удалить из корзины';
    } else {
        cardPreview.toggleState(true);
        cardPreview.buttonText = 'Купить';
    }

    modalView.openModal(cardRender);
});


//Toggle Item in Basket
events.on(State.BASKET_TOGGLE_ITEM, (product: { id: string }) => {
    const item = productsModel.getItemById(product.id);
    if (!item) return;

    if (basketModel.hasItem(product.id)) {
        basketModel.removeItem(item);
    } else {
        basketModel.addItem(item);
    }

    modalView.closeModal();
});

//Update Basket View on Basket Change
events.on(State.BASKET_CHANGED, (data: { items: IProduct[], totalPrice: number, count: number }) => {
    headerView.counter = data.count;
    basketView.totalPrice = data.totalPrice;
    basketView.basketList = data.items.map(item =>
        new CardBasketView(events, cloneTemplate(TeamplateCardBasket)).render(item)
    );
});



//Modal close
events.on(State.MODAL_CLOSE, () => {
    productsModel.resetSelectedItem();
    modalView.closeModal();
})

//Basket in header
events.on(State.BASKET_OPEN, () => {
    const basketProducts = basketModel.getCount() !== 0; 
    const basket = basketView.render();

    basketView.setSubmitButtonState(basketProducts);
    basketView.setEmptyMessage(!basketProducts);
    modalView.openModal(basket);
})

// events.on(State.CARD_CATALOG_LOAD, () => {
//     const itemCard = productsModel.getItems().map((item) => {
//         const cardData = new CardCatalogView(events, cloneTemplate(TCardCatalog), {
//             onClick: () => events.emit(State.PREVIEW_OPEN, item),
//         });
//         return cardData.render(item);
//     });

//     galleryView.render( {catalog: itemCard });
// });

/*Корзина:

    отображается список товаров, которые выбрал покупатель;
    для каждого товара указана цена и присутствует кнопка удаления. Если нажать на кнопку, товар удаляется из корзины;
    отображается общая стоимость товаров в корзине;
    присутствует кнопка оформления покупки;
    если в корзине нет товаров, кнопка оформления должна быть деактивирована;
    если товаров нет в корзине — вместо списка товаров выводится надпись «Корзина пуста»;
    при нажатии на кнопку «Оформить» открывается модальное окно с формой оформления товара.

*/

//Basket Update Items
events.on(State.BASKET_UPDATE, (data: { items: IProduct[], totalPrice: number, count: number }) => {
    const basketCatalog = data.items.map((item, index) => {
        const card = new CardBasketView(events, cloneTemplate(TeamplateCardBasket));
        card.index = index + 1;
        return card.render(item);
    });

    headerView.counter = data.count;
    basketView.basketList = basketCatalog;
    basketView.totalPrice = data.totalPrice;
    basketView.setSubmitButtonState(data.count !== 0);
})



//Delete Items from Basket
events.on(State.BASKET_REMOVE, (product: { id: string }) => {
    const item = productsModel.getItemById(product.id);
    if (item) {
        basketModel.removeItem(item);
    }

    if (basketModel.getCount() === 0) {
        basketView.setEmptyMessage(true);
        basketView.setSubmitButtonState(false);
    }
})

//Order Button in Basket
events.on(State.BASKET_ADD_ORDERED, () => {
    modalView.content = formOrderView.render();
})

//FORM EVENTS
//Order Form Submit
events.on(State.FORM_SUBMIT, () => {
    modalView.closeModal();
    basketModel.clear();
    modalView.openModal(success.render());
})

events.on(State.FORM_PAYMENT_CHANGED, (data: { payment: TPayment }) => {
    buyerModel.setData({ payment: data.payment });
    formOrderView.togglePaymentStatus(data.payment);

    const errors = buyerModel.validate();
    const isValid = formOrderView.formValidation(errors);
    formOrderView.setSubmitEnabled(isValid);
});

events.on(State.FORM_ADDRESS_CHANGED, (data: { address: string }) => {
    buyerModel.setData({ address: data.address });

    const errors = buyerModel.validate();
    const isValid = formOrderView.formValidation(errors);
    formOrderView.setSubmitEnabled(isValid);
})

events.on(State.FORM_SUBMIT_ORDER, () => {
    modalView.content = formContactView.render();
});


events.on(State.FORM_INPUT_FOCUS, () => {
    formOrderView.clearErrorMessages();
    formOrderView.toggleErrorClass(false);
});

//Contact Form Submit

events.on(State.FORM_EMAIL_CHANGED, (data: { email: string }) => {
    buyerModel.setData({ email: data.email });

    const errors = buyerModel.validate();
    const isValid = formContactView.formValidation(errors);
    formContactView.setSubmitEnabled(isValid);
});

events.on(State.FORM_PHONE_CHANGED, (data: { phone: string }) => {
    buyerModel.setData({ phone: data.phone });
    const errors = buyerModel.validate();
    const isValid = formContactView.formValidation(errors);
    formContactView.setSubmitEnabled(isValid);
});    


//Changed data in Buyer Model - validate form
events.on(State.BUYER_CHANGED, (data: { field: string}) => {
    const errors = buyerModel.validate();
    const choosenPayment = buyerModel.getData().payment;

    if (data.field === 'payment' || data.field === 'address') {
        const isValid = formOrderView.formValidation(errors);
        formOrderView.setSubmitEnabled(isValid);
        // formOrderView.setSubmitDisabled(!isValid);
        formOrderView.togglePaymentStatus(choosenPayment);
    } else if (data.field === 'email' || data.field === 'phone') {
        formContactView.formValidation(errors);
        const isValid = !errors.email && !errors.phone;
        formContactView.setSubmitEnabled(isValid);
        // formContactView.setSubmitDisabled(!errors.email && !errors.phone);
    }
});

events.on(State.FORM_CONTACTS_ADD, () => {
    success.totalPrice = basketModel.getTotalPrice();
    basketModel.clear();
    buyerModel.clear();
    modalView.content = success.render();

});

events.on(State.CONFIRMATION_CLOSE, () => {
    modalView.closeModal();
    formContactView.clearPhoneEmailFields();
    formOrderView.clearAderessInput();
});

