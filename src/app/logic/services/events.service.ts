import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { iEvent } from "../interfaces/iEvent";
import { iEventDetail } from "../interfaces/iEventDetail";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  private _http: HttpClient = inject(HttpClient);
  
  constructor() { }

  public getEventsList(): Observable<iEvent[]> {
    return this._http.get<iEvent[]>('assets/data/events.json').pipe(
      catchError(error => {
        return throwError(() => new Error('No json file found.'));
      })
    );
  }

  public getEventDetail(id: string): Observable<iEventDetail> {
    return this._http.get<iEventDetail>(`assets/data/event-info-${id}.json`).pipe(
      catchError(error => {
        return throwError(() => new Error('No json file found.'));
      })
    );
  }
}