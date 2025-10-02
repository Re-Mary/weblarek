import { IBuyer, TPayment } from "../../../types";

export class Buyer {
    //attributes
    private payment: TPayment | null;
    private email: string;
    private phone: string;
    private address: string;
    //constructor
    constructor() {
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';
    }
    //methods
    setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) {
            this.payment = data.payment;
        }
        if (data.email !== undefined) {
            this.email = data.email;
        }
        if (data.phone !== undefined) {
            this.phone = data.phone;
        }
        if (data.address !== undefined) {
            this.address = data.address;
        }
    }
    getData(): IBuyer {
        if (this.payment === null) {
            throw new Error("Что-то пошло не так: способ оплаты не выбран");
        }
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }
    clear(): void {
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';
    }
    validate(): Record<string, string> {
        const errors: Record<string, string> = {};
        if (!this.payment) {
            errors.payment = 'Не выбран спасоб оплаты';
        }
        if (!this.email) {
            errors.email = 'Укажите email';
        }
        if (!this.phone) {
            errors.phone = 'Укажите телефон';
        }
        if (!this.address) {
            errors.address = 'Укажите адрес';
        }
        return errors;
    }

}