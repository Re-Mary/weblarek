import { events } from "../../main";
import { IBuyer, TPayment } from "../../types";
import { IEvents } from "../base/Events";
import { State } from "../../utils/constants";

export class Buyer {
    //attributes
    private payment: TPayment | null;
    private email: string;
    private phone: string;
    private address: string;
    //constructor
    constructor(events: IEvents) {
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    //methods
    setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) {
            this.payment = data.payment;
           //events.emit(State.BUYER_CHANGED);
        }
        if (data.email !== undefined) {
            this.email = data.email;
            //events.emit(State.BUYER_CHANGED);
        }
        if (data.phone !== undefined) {
            this.phone = data.phone;
            //events.emit(State.BUYER_CHANGED);
        }
        if (data.address !== undefined) {
            this.address = data.address;
           // events.emit(State.BUYER_CHANGED);
        }
        events.emit(State.BUYER_CHANGED);
    }
    getData(): IBuyer {
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
        events.emit(State.BUYER_CHANGED);
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