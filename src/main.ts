import './scss/styles.scss';
import { Products } from './components/models/Products';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Api } from './components/base/Api';
import { ShopApi } from './components/base/ShopApi';
import { API_URL } from './utils/constants';
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
const teamplateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const teamplateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const teamplateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const templateBasket = ensureElement<HTMLTemplateElement>('#basket');
const teamplateOrderForm = ensureElement<HTMLTemplateElement>('#order');
const teamplateContactForm = ensureElement<HTMLTemplateElement>('#contacts');
const teamplateSuccess = ensureElement<HTMLTemplateElement>('#success');

//Elements
const modalContainer = ensureElement<HTMLElement>('.modal');
const galleryElement = ensureElement<HTMLElement>('.gallery');
const headerElement = ensureElement<HTMLElement>('.header');

//View initialisation
const headerView = new HeaderView(events, headerElement);
const modalView = new ModalView(events, modalContainer);
const galleryView = new GalleryView(galleryElement);
const success = new SuccessView(events, cloneTemplate(teamplateSuccess));
const basketView = new BasketView(events, cloneTemplate(templateBasket));
const cardPreview = new CardPreviewView(cloneTemplate(teamplateCardPreview), events);
const formOrderView = new FormOrderView(events, cloneTemplate(teamplateOrderForm));
const formContactView = new FormContactView(events, cloneTemplate(teamplateContactForm));


//get products from server and set them to productsModel
shopApi.getProducts()
    .then(data => { productsModel.setItems(data) })
    .catch((err) => console.log('Ошибка при получении данных с сервера: ', err));


//Build order data
function buildOrderData() {
    return {
        payment: buyerModel.getData().payment,
        address: buyerModel.getData().address,
        email: buyerModel.getData().email,
        phone: buyerModel.getData().phone,
        items: basketModel.getItems().map(item => item.id),
        total: basketModel.getTotalPrice(),
    };
}

//EVENTS --> PRESENTERS
//CATALOG EVENTS

//Load Catalog Cards and open Preview Card
events.on(State.CATALOG_UPDATE_SET_ITEMS, () => {
    const itemCards = productsModel.getItems().map(item => {
        const card = new CardCatalogView(cloneTemplate(teamplateCardCatalog), {
            onClick: () => events.emit(State.CATALOG_OPEN, {id: item.id}),
        });
        return card.render(item);
    });

    galleryView.render( { catalog: itemCards } );
});

events.on(State.CATALOG_UPDATE_SET_SELECTED_ITEM, () => {
    const product = productsModel.getSelectedItem();
    if (!product) return;
    const cardRender = cardPreview.render(product);

    if (product.price === null) {
        cardPreview.buttonActive = false;
        cardPreview.buttonText = 'Недоступно';
    } else if (basketModel.hasItem(product.id)) {
        cardPreview.buttonActive = true;
        cardPreview.buttonText = 'Удалить из корзины';
    } else {
        cardPreview.buttonActive = true;
        cardPreview.buttonText = 'Купить';
    }

    modalView.openModal(cardRender);
});

//Click on card in gallery
events.on(State.CATALOG_OPEN, (data: { id: string }) => {
    const product = productsModel.getItemById(data.id);
    if (!product) return;
    productsModel.setSelectedItem(product);
});

//Toggle Item into Basket
events.on(State.BASKET_TOGGLE_ITEM, () => {
    const item = productsModel.getSelectedItem();
    if (!item) return;

    if (basketModel.hasItem(item.id)) {
        basketModel.removeItem(item);
    } else {
        basketModel.addItem(item);
    }

    modalView.closeModal();
});

//Basket in header, open on click
events.on(State.BASKET_OPEN, () => {
    const basketProducts = basketModel.getCount() !== 0; 
    const basket = basketView.render();

    basketView.setSubmitButtonState(basketProducts);
    modalView.openModal(basket);
})

//Modal close
events.on(State.MODAL_CLOSE, () => {
    productsModel.resetSelectedItem();
    modalView.closeModal();
})

//Changes im Model Basket -> update BasketCard View and Header (items, totalPrice, counter)
events.on(State.BASKET_CHANGED, (data: { items: IProduct[], totalPrice: number, count: number }) => {
    const basketCatalog = data.items.map((item, index) => {
        const card = new CardBasketView(
            cloneTemplate(teamplateCardBasket),
            {
                onRemove: () => events.emit(State.BASKET_REMOVE, { id: item.id }),
            }
        );
        card.index = index + 1;
        return card.render(item);
    });

    headerView.counter = data.count;
    basketView.basketList = basketCatalog;
    basketView.totalPrice = data.totalPrice;
    basketView.setSubmitButtonState(data.count !== 0);
});

//Delete Items from Basket
events.on(State.BASKET_REMOVE, (product: { id: string }) => {
    basketModel.removeItem(productsModel.getItemById(product.id)!);    
});

//Order Button in BasketView
events.on(State.BASKET_ADD_ORDERED, () => {
    const form = formOrderView.render();
    modalView.openModal(form);
});


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
        formOrderView.togglePaymentStatus(choosenPayment);
    } else if (data.field === 'email' || data.field === 'phone') {
        formContactView.formValidation(errors);
        const isValid = !errors.email && !errors.phone;
        formContactView.setSubmitEnabled(isValid);
    }
});


events.on(State.FORM_CONTACTS_ADD, async () => {
    try {
        const order = buildOrderData();
        console.log('Sending order to server:', order);

        const result = await shopApi.createOrder(order);
        console.log('Order success:', result);

        success.totalPrice = order.total;

        basketModel.clear();
        buyerModel.clear();

        modalView.openModal(success.render());

    } catch (error) {
        console.error('Order failed:', error);
    }
});


events.on(State.CONFIRMATION_CLOSE, () => {
    modalView.closeModal();
    formContactView.clearPhoneEmailFields();
    formOrderView.clearAderessInput();
});

