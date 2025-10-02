import './scss/styles.scss';
import { Products } from './components/base/models/Products';
import { Basket } from './components/base/models/Basket';
import { TPayment, IProduct } from './types';
import { Buyer } from './components/base/models/Buyer';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';
import { ShopApi } from './components/base/models/ShopApi';
import { API_URL } from './utils/constants';

//set Api instance
const apiInstance = new Api(API_URL);
const shopApi = new ShopApi(apiInstance);

//create models/instances
const productsModel = new Products();
// productsModel.setItems(apiProducts.items);
const basketModel = new Basket();
const buyerModel = new Buyer();


//_________TESTING_________

//***manual TESTING of models and api***
// //mock Data
// const mockBuyerData = {
//     payment: 'card' as TPayment,
//     email: 'myFirstBuyer@yandex.ru',
//     phone: '+71234567890',
//     address: 'Spb, Sredniy Prospekt V.o., 97',
// };

// // //test buyer
// // buyerModel.setData(mockBuyerData);
// // console.log('Данные покупателя: ', buyerModel.getData());
// // console.log('Ошибки валидации данных покупателя: ', buyerModel.validate());
// // buyerModel.clear();
// // console.log('Данные покупателя после очистки: ', buyerModel.getData());
// // console.log('Ошибки валидации данных покупателя после очистки: ', buyerModel.validate());
// // buyerModel.setData({
// //     payment: 'cash' as TPayment,
// //     email: 'newBuyer@yandex.ru',
// //     phone: '+71234567890',
// // });
// // console.log('Данные покупателя после установки части данных: ', buyerModel.getData());
// // console.log('Ошибки валидации данных покупателя: ', buyerModel.validate());

// // //test products
// // console.log('Массив товаров из каталога: ', productsModel.getItems());

// // //test basket
// // basketModel.addItem(productsModel.getItems()[0]);
// // basketModel.addItem(productsModel.getItems()[1]);
// // basketModel.addItem(productsModel.getItems()[2]);
// // console.log('Корзина после добавления 3-х товаров: ', basketModel.getItems());
// // console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());
// // console.log('Количество товаров в корзине: ', basketModel.getCount());
// // console.log('Проверка наличия товара в корзине: ', basketModel.hasItem(productsModel.getItems()[1].id));
// // console.log('Проверка наличия товара в корзине: ', basketModel.hasItem('someFakeId'));
// // basketModel.removeItem(productsModel.getItems()[1]);
// // console.log('Корзина после удаления 1-го товара: ', basketModel.getItems());
// // console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());
// // console.log('Количество товаров в корзине: ', basketModel.getCount());
// // basketModel.clear();
// // console.log('Корзина после очистки: ', basketModel.getItems());
// // console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());
// // console.log('Количество товаров в корзине: ', basketModel.getCount());

//***TESTING through api***
//test shopApi, testet all methods with products
shopApi.getProducts()
    .then(data => {
        //get data from server and save it into Products
        console.log('Данные товаров, полученные с сервера: ', data);
        productsModel.setItems((data as any).items);
        console.log('Товары в модели Products после получения с сервера: ', productsModel.getItems());
        //choose one mocked product and set it as selected
        let testFirstProduct = productsModel.getItemById('90973ae5-285c-4b6f-a6d0-65d1d760b102');
        let testSecondProduct = productsModel.getItemById('54df7dcb-1213-4b3c-ab61-92ed5f845535');
        console.log('Нашелся ли? Товар, выбранный по id: ', testFirstProduct, testSecondProduct);
        if (testFirstProduct) {
            productsModel.setSelectedItem(testFirstProduct);
        }
        console.log('Выбранный товар: ', productsModel.getSelectedItem());
        //test adding first product to basket
        if (testFirstProduct) {
            basketModel.addItem(testFirstProduct);
        }
        console.log('Корзина после добавления товара: ', basketModel.getItems());
        //count items in basket
        console.log('Количество товаров в корзине: ', basketModel.getCount());
        //total price of items in basket
        console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());

        //test adding second product to basket
        if (testSecondProduct) {
            basketModel.addItem(testSecondProduct);
        }
        console.log('Корзина после добавления товара: ', basketModel.getItems());
        //count items in basket
        console.log('Количество товаров в корзине: ', basketModel.getCount());
        //total price of items in basket
        console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());
        //all products in basket
        console.log('Все товары в корзине: ', basketModel.getItems());
        //delete first product from basket
        if (testFirstProduct) {
            basketModel.removeItem(testFirstProduct);
        }
        console.log('Корзина после удаления товара: ', basketModel.getItems());
        //count items in basket
        console.log('Количество товаров в корзине: ', basketModel.getCount());
        //total price of items in basket
        console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());
        //clear basket
        basketModel.clear();
        console.log('Корзина после очистки: ', basketModel.getItems());
        //count items in basket
        console.log('Количество товаров в корзине: ', basketModel.getCount());
        //total price of items in basket
        console.log('Общая стоимость товаров в корзине: ', basketModel.getTotalPrice());

    })
    .catch((err) => console.log('Ошибка при получении данных с сервера: ', err));