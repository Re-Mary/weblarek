/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`;

/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export const settings = {

};

//Events
export enum State {
  //Basket
  BASKET_OPEN = 'basket:open', //вызывается при открытии корзины
  BASKET_CLOSE = 'basket:close', //вызывается при закрытии корзины
  BASKET_ADD_ORDERED = 'basket:ordered', //вызывается при добавлении товара в заказ
  BASKET_UPDATE = 'basket:update', //вызывается при обновлении корзины
  BASKET_CHANGED = 'basket:changed', //вызывается при изменении корзины
  BASKET_TOGGLE_ITEM = 'basket:toggle', //вызывается при добавлении/удалении товара из корзины
  BASKET_REMOVE = 'basket:remove',

  //Success
  CONFIRMATION_CLOSE = 'button:close',

  //Modal
  MODAL_OPEN = 'modal:open',
  MODAL_CLOSE = 'modal:close',

  //Card Catalog
  CATALOG_OPEN = 'catalog:open',
  CARD_CATALOG_LOAD = 'catalog:load',


  //Card Preview
  PREVIEW_OPEN = 'preview:open',

  //Form
  FORM_SUBMIT = 'form:submit',
  FORM_EMAIL_CHANGED = 'email:changed',
  FORM_PHONE_CHANGED = 'phone:changed',
  CONTACTS_SUBMIT = 'contacts:submit',

  //Order events
  FORM_PAYMENT_CHANGED = 'payment:changed',
  FORM_ADDRESS_CHANGED = 'address:changed',
  FORM_SUBMIT_BUTTON = 'oder:submit',
  FORM_INPUT_FOCUS = 'form:input:focus',
  ORDER_SUBMIT = 'order:submit',

  //Buyer
  BUYER_CHANGED = 'buyer:change',

  //Items events
  CATALOG_UPDATE_SET_ITEMS = 'catalog:update:items',
  CATALOG_UPDATE_SET_SELECTED_ITEM = 'catalog:update:selectedItem',
  CATALOG_CHANGED = 'catalog:changed',


}

