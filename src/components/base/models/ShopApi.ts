import { IApi, IOrder, IOrderResponse, IProduct } from "../../../types";

export class ShopApi {
    constructor(private api: IApi) {
        this.api = api; 
    }

    getProducts(): Promise<IProduct[]> {
        return this.api.get('/product/');
    }
    createOrder(order: IOrder): Promise<IOrderResponse> {
        return this.api.post('/order/', order);
    }
    }
