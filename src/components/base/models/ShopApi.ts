import { ApiPostMethods, IApi, IOrder, IOrderResponse, IProduct } from "../../../types";

export class ShopApi implements IApi {
    private api: IApi;
    constructor(api: IApi) {
        this.api = api; // сохраняем ссылку на экземпляр API в приватное поле класса
    }
    get<T extends object>(uri: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T> {
        throw new Error("Method not implemented.");
    }
    getProducts(): Promise<IProduct[]> {
        return this.api.get('/product/');
    }
    createOrder(order: IOrder): Promise<IOrderResponse> {
        return this.api.post('/order/', order); // отправляем данные заказа на сервер
    }
    }
