import './scss/styles.scss';
import { Products } from './components/base/models/Products';
import { Basket } from './components/base/models/Basket';
import { TPayment } from './types';
import { Buyer } from './components/base/models/Buyer';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';
import { ShopApi } from './components/base/models/ShopApi';

//create models/instances
const productsModel = new Products();
productsModel.setItems(apiProducts.items);
const basketModel = new Basket();
const buyerModel = new Buyer();
const api = new Api('src/utils/data.ts');
const shopApi = new ShopApi(api);

//_________TESTING_________
//mock Data
const mockBuyerData = {
    payment: 'card' as TPayment,
    email: 'myFirstBuyer@yandex.ru',
    phone: '+71234567890',
    address: 'Spb, Sredniy Prospekt V.o., 97',
};

//test buyer
buyerModel.setData(mockBuyerData);
console.log('Данные покупателя: ', buyerModel.getData());
console.log('Ошибки валидации данных покупателя: ', buyerModel.validate());
buyerModel.clear();
console.log('Данные покупателя после очистки: ', buyerModel.getData());
console.log('Ошибки валидации данных покупателя после очистки: ', buyerModel.validate());
buyerModel.setData({
    payment: 'cash' as TPayment,
    email: 'newBuyer@yandex.ru',
    phone: '+71234567890',
});
console.log('Данные покупателя после установки части данных: ', buyerModel.getData());
console.log('Ошибки валидации данных покупателя после установки части данных: ', buyerModel.validate());

//test products
console.log('Массив товаров из каталога: ', productsModel.getItems());

//test basket
basketModel.addItem(productsModel.getItems()[0]);
basketModel.addItem(productsModel.getItems()[1]);
basketModel.addItem(productsModel.getItems()[2]);
console.log('Корзина после добавления 3-х товаров: ', basketModel.getItems());
console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());
console.log('Количество товаров в корзине: ', basketModel.getCount());
console.log('Проверка наличия товара в корзине: ', basketModel.hasItem(productsModel.getItems()[1].id));
console.log('Проверка наличия товара в корзине: ', basketModel.hasItem('someFakeId'));
basketModel.removeItem(productsModel.getItems()[1]);
console.log('Корзина после удаления 1-го товара: ', basketModel.getItems());
console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());
console.log('Количество товаров в корзине: ', basketModel.getCount());
basketModel.clear();
console.log('Корзина после очистки: ', basketModel.getItems());
console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());
console.log('Количество товаров в корзине: ', basketModel.getCount());
