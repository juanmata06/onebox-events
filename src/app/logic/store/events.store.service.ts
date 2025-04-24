import { computed, inject, Injectable, Signal, signal } from "@angular/core";
import { iEvent } from "../interfaces/iEvent";
import { iEventDetail } from "../interfaces/iEventDetail";
import { EventsService } from "../services/events.service";


@Injectable({
  providedIn: "root"
})
export class EventsStoreService {
  private eventsService = inject(EventsService);
  public eventsListSignal = signal<iEvent[] | null>(null);
  public eventsDetailsSignal = signal<iEventDetail[]>([]);
  readonly events = computed(() => this.eventsListSignal());
  readonly eventsDetails = computed(() => this.eventsDetailsSignal());

  constructor() { }

  public loadEventsList(): void {
    if (this.eventsListSignal()) return;

    this.eventsService.getEventsList().subscribe({
      next: (events: iEvent[]) => {
        events?.sort((a, b) => Number(a.endDate) - Number(b.endDate));
        this.eventsListSignal.set(events);
      },
      error: (err) => {
        throw new Error('Error loading events: ' + JSON.stringify(err));
      }
    });
  }

  public loadEventDetailsById(id: string): void {
    if (this.eventsDetailsSignal().some(e => e.event.id === id)) return;

    this.eventsService.getEventDetail(id).subscribe({
      next: (event: iEventDetail) => {
        event.sessions?.sort((a, b) => Number(a.date) - Number(b.date));

        const current = this.eventsDetailsSignal();
        this.eventsDetailsSignal.set([...current, event]);
      },
      error: (err) => {
        throw new Error('Error loading event detail: ' + JSON.stringify(err));
      }
    });
  }

  public getEventDetail = (id: string): Signal<iEventDetail | null> => computed(
    () => this.eventsDetailsSignal().find(e => e.event.id === id) ?? null
  );
}