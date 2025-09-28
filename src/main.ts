import './scss/styles.scss';
import { Products } from './components/base/models/Products';
import { Basket } from './components/base/models/Basket';
import { TPayment } from './types';
import { Buyer } from './components/base/models/Buyer';
import { apiProducts } from './utils/data';


//TESTING
//create api products
console.log('Данные о товарах, полученные с сервера: ', apiProducts);
//fetch products from server, Test version
fetch('src/utils/data.ts')
    .then((res) => res.json())
    .then((json) => console.log('Данные о товарах, полученные с сервера через fetch: ', json))
    .catch((err) => console.error('Ошибка при получении данных с сервера: ', err));


//create products
const productsModel = new Products();
productsModel.setItems(apiProducts.items);
//create basket
const basketModel = new Basket();
//create buyer
const buyerModel = new Buyer();
//create order

//test products
console.log('Массив товаров из каталога: ', productsModel.getItems());
//test basket
basketModel.addItem(productsModel.getItems()[0]);
basketModel.addItem(productsModel.getItems()[1]);
basketModel.addItem(productsModel.getItems()[2]);
console.log('Корзина после добавления 3-х товаров: ', basketModel.getItems());
console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());
console.log('Количество товаров в корзине: ', basketModel.getCount());
basketModel.removeItem(productsModel.getItems()[1]);
console.log('Корзина после удаления 1-го товара: ', basketModel.getItems());
console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());
console.log('Количество товаров в корзине: ', basketModel.getCount());
basketModel.clear();
console.log('Корзина после очистки: ', basketModel.getItems());
console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());
console.log('Количество товаров в корзине: ', basketModel.getCount());
//test buyer
buyerModel.setPayment('card' as TPayment);
buyerModel.setEmail('some@body.com');
buyerModel.setPhone('+79876543210');
buyerModel.setAddress('Spb, Sredniy Prospekt V.o., 97');
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
buyerModel.setAddress('Moscow, Myasnitskaya, 15');
console.log('Данные покупателя после установки всех данных: ', buyerModel.getData());
console.log('Ошибки валидации данных покупателя после установки всех данных: ', buyerModel.validate());

