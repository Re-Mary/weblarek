import { IProduct } from '../../types/index';
import { IEvents } from '../base/Events';
import { State } from '../../utils/constants';

export class Basket {
    //attributes
    private _items: IProduct[] = [];
    //constructor
    constructor(private events: IEvents) {
        this._items = [];
    }
    //methods
    getItems(): IProduct[] {
        return this._items;
    }
    getTotalPrice(): number {
        return this._items.reduce((total, item) => total + (item.price ?? 0), 0);
    }
    getCount(): number {
        return this._items.length;
    }
    addItem(item: IProduct): void {
        this._items.push(item);
        this.events.emit(State.BASKET_CHANGED, {
            items: this._items,
            totalPrice: this.getTotalPrice(),
            count: this.getCount(),
        })
    }
    //remove item by id
    removeItem(item: IProduct): void {
        this._items = this._items.filter( i => i.id !== item.id);
        this.events.emit(State.BASKET_CHANGED, {
            items: this._items,
            totalPrice: this.getTotalPrice(),
            count: this.getCount(),
        })
    }


    clear(): void {
        this._items = [];
        this.events.emit(State.BASKET_CHANGED, {
            items: this._items,
            totalPrice: this.getTotalPrice(),
            count: this.getCount(),
        });
    }
    
    hasItem(id: string): boolean {
        return this._items.some((item) => item.id === id);
    }

}