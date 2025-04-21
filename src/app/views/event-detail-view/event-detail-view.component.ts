import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { iEventDetail } from '../../logic/interfaces/iEventDetail';
import { EventsService } from '../../logic/services/events.service';

@Component({
  selector: 'app-event-detail-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-detail-view.component.html',
  styleUrl: './event-detail-view.component.scss'
})
export class EventDetailViewComponent implements OnInit {
  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * General vars
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  private calculatorService = inject(EventsService);
  loading: boolean = true;
  eventDetail: iEventDetail;

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  constructor() { }

  ngOnInit(): void {
    this.getEventsDetail();
  }

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * PRIVATE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  public getEventsDetail(): void {
    this.loading = true;
    this.calculatorService.getEventsDetail().subscribe({
      next: (response: iEventDetail) => {
        this.eventDetail = response;
        console.log(this.eventDetail);
        
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

