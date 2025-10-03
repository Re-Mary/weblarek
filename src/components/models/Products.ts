import { IProduct } from '../../types/index';

export class Products {
    //attributes
    private items: IProduct[] = [];
    private selectedItem: IProduct | null = null;
    //constructor
    constructor() {
        this.items = [];
        this.selectedItem = null;
    }
    //methods
    setItems(items: IProduct[]): void {
        this.items = items;
    }
    getItems(): IProduct[] {
        return this.items;
    }
    getItemById(id: string): IProduct | undefined {
        return this.items.find((item) => item.id === id);
    }
    setSelectedItem(item: IProduct): void {
        this.selectedItem = item;
    }
    getSelectedItem(): IProduct | null {
        return this.selectedItem;
    }

}