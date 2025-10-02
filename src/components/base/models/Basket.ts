import { IProduct } from '../../../types/index';

export class Basket {
    //attributes
    private items: IProduct[] = [];
    //constructor
    constructor() {
        this.items = [];
    }
    //methods
    getItems(): IProduct[] {
        return this.items;
    }
    addItem(item: IProduct): void {
        this.items.push(item);
    }
    //remove item by id
    removeItem(item: IProduct): void {
        this.items = this.items.filter((i) => i.id !== item.id);
    }

    clear(): void {
        this.items = [];
    }
    getTotalPrice(): number {
        return this.items.reduce((total, item) => total + (item.price ?? 0), 0);
    }
    getCount(): number {
        return this.items.length;
    }
    hasItem(id: string): boolean {
        return this.items.some((item) => item.id === id);
    }

}