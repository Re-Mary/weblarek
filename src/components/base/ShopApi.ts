import { IApi, IOrder, IOrderResponse, IProduct } from "../../types";

export class ShopApi {
    constructor(private api: IApi) {
        this.api = api; 
    }

    async getProducts(): Promise<IProduct[]> {
        const response = await this.api.get<{ total: number; items: IProduct[] }>('/product/');
        return response.items; //save only items array, not as an object
    }
    async createOrder(order: IOrder): Promise<IOrderResponse> {
        return this.api.post('/order/', order);
    }
    }
