import { Component, inject, OnInit } from '@angular/core';
import { EventsService } from '../../logic/services/events.service';
import { iEvent } from '../../logic/interfaces/iEvent';
import { EventCardComponent } from '../../shared/event-card/event-card.component';

@Component({
  selector: 'app-events-bilboard-view',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './events-bilboard-view.component.html',
  styleUrl: './events-bilboard-view.component.scss'
})
export class EventsBilboardViewComponent implements OnInit {
  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * General vars
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  private calculatorService = inject(EventsService);
  loading: boolean = true;
  events: iEvent[] = [];

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  constructor() { }

  ngOnInit(): void {
    this.getEventsList();
  }

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * PRIVATE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  public getEventsList(): void {
    this.loading = true;
    this.calculatorService.getEventsList().subscribe({
      next: (response: iEvent[]) => {
        this.events = response.sort((a: iEvent, b: iEvent) => {
          return Number(a.endDate) - Number(b.endDate);
        });
      }
    });
  }

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

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
}
