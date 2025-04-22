import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { iEventDetail } from '../../logic/interfaces/iEventDetail';
import { EventsStoreService } from '../../logic/store/events.store.service';
import { CartStoreService } from '../../logic/store/cart.store.service';
import { iSession } from '../../logic/interfaces/iSession';
import { ShoppingCartComponent } from '../../shared/shopping-cart/shopping-cart.component';
import { iCartItem } from '../../logic/interfaces/iCartItem';
import { iDateSelected } from '../../logic/interfaces/iDateSelected';

@Component({
  selector: 'app-event-detail-view',
  standalone: true,
  imports: [CommonModule, RouterModule, ShoppingCartComponent],
  templateUrl: './event-detail-view.component.html',
  styleUrl: './event-detail-view.component.scss'
})
export class EventDetailViewComponent implements OnInit {
  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * General vars
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  private _activatedRoute = inject(ActivatedRoute);
  private _eventsStore = inject(EventsStoreService);
  id = this._activatedRoute.snapshot.params['id'];
  eventDetail: Signal<iEventDetail | null> = this._eventsStore.getEventDetail(this.id);
  private _cartStore = inject(CartStoreService);
  cart: Signal<iCartItem[]> = this._cartStore.cart;
  loading: boolean = true;

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  constructor() { }

  ngOnInit(): void {
    this._eventsStore.loadEventDetailsById(this.id);
  }

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * PRIVATE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * PRIVATE VALIDATION AND INTERNAL PROCESS METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * PUBLIC METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  public increase(session: iSession): void {
    if (parseInt(session.availability) <= this.getQuantity(session.date)) {
      alert("No hay más entradas disponibles para comprar.");
      return;
    }
    this._cartStore.increaseDateQuantity(this.eventDetail()!.event, session.date);
  }

  public decrease(session: iSession): void {
    this._cartStore.decreaseDateQuantity(this.eventDetail()!.event.id, session.date);
  }

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  public getQuantity(date: string): number {
    const item = this._cartStore.getItemByEventId(this.eventDetail()!.event.id);
    return item?.datesSelected.find(d => d.date === date)?.quantity || 0;
  }
}

