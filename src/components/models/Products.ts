import { IProduct } from '../../types/index';
import { IEvents } from '../base/Events';
import { State } from '../../utils/constants';

export class Products {
    //attributes
    private _items: IProduct[] = [];
    private _selectedItem: IProduct | null = null;
    private _events: IEvents;

    //constructor
    constructor(events: IEvents) {
        this._items = [];
        this._selectedItem = null;
        this._events = events;
    }

    //methods
    setItems(items: IProduct[]): void {
        this._items = items;
        this._events.emit(State.CATALOG_UPDATE_SET_ITEMS, items);
    }
    
    getItems(): IProduct[] {
        return this._items;
    }
    
    getItemById(id: string): IProduct | undefined {
        const item = this._items.find(item => item.id === id);
        return item === undefined ? undefined : item;
    }
    
    setSelectedItem(item: IProduct): void {
        this._selectedItem = item;
        this._events.emit(State.CATALOG_UPDATE_SET_SELECTED_ITEM, item);
    }
    
    getSelectedItem(): IProduct | null {
        if (this._selectedItem === null) {
            console.log('Продукт не выбран');
            return null;
        }
        try {
            return this._selectedItem;
        } catch (error) {
            console.error('Error getting selected item:', error);
            return null;
        }
    }


    resetSelectedItem(): void {
        this._selectedItem = null;
    }

    clear(): void {
        this._items = [];
        this._selectedItem = null;
    }

}