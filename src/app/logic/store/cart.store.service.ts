import { Injectable, Signal, signal } from "@angular/core";
import { iEvent } from "../interfaces/iEvent";
import { iCartItem } from "../interfaces/iCartItem";

@Injectable({
  providedIn: "root"
})
export class CartStoreService {
  private _cart = signal<iCartItem[]>([]);
  readonly cart: Signal<iCartItem[]> = this._cart.asReadonly();

  constructor() { }

  public getItemByEventId(eventId: string): iCartItem | undefined {
    return this._cart().find((item: iCartItem) => item.event.id === eventId);
  }

  public increaseDateQuantity(event: iEvent, date: string): void {
    this._cart.update((items: iCartItem[]) => {
      const itemIndex = items.findIndex((item: iCartItem) => item.event.id === event.id);
      if (itemIndex === -1) {
        return [...items, {
          event,
          datesSelected: [{ date, quantity: 1 }]
        }];
      }

      const updatedItem: iCartItem = { ...items[itemIndex] };
      const dateIndex = updatedItem.datesSelected.findIndex(selected => selected.date === date);

      if (dateIndex === -1) {
        updatedItem.datesSelected.push({ date, quantity: 1 });
      } else {
        updatedItem.datesSelected[dateIndex].quantity++;
      }

      const updatedItems: iCartItem[] = [...items];
      updatedItems[itemIndex] = updatedItem;
      return updatedItems;
    });
  }

  public decreaseDateQuantity(eventId: string, date: string): void {
    this._cart.update((items: iCartItem[]) => {
      const itemIndex = items.findIndex((item: iCartItem) => item.event.id === eventId);
      if (itemIndex === -1) { return items; }

      const updatedItem: iCartItem = { ...items[itemIndex] };
      const dateIndex = updatedItem.datesSelected.findIndex(selected => selected.date === date);

      if (dateIndex === -1) { return items; }

      updatedItem.datesSelected[dateIndex].quantity--;

      if (updatedItem.datesSelected[dateIndex].quantity <= 0) {
        updatedItem.datesSelected.splice(dateIndex, 1);
      }

      if (updatedItem.datesSelected.length === 0) {
        const updatedItems: iCartItem[] = [...items];
        updatedItems.splice(itemIndex, 1);
        return updatedItems;
      }

      const updatedItems: iCartItem[] = [...items];
      updatedItems[itemIndex] = updatedItem;
      return updatedItems;
    });
  }
}
