import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { iEvent } from "../interfaces/iEvent";
import { iEventDetail } from "../interfaces/iEventDetail";

@Injectable({
  providedIn: "root"
})
export class EventsService {

  constructor(private _http: HttpClient) { }

  public getEventsList(): Observable<iEvent[]> {
    return this._http.get<iEvent[]>('assets/data/events.json').pipe(
      catchError(error => {
        return throwError(() => new Error('No json file found.'));
      })
    );
  }

  public getEventsDetail(): Observable<iEventDetail> {
    return this._http.get<iEventDetail>('assets/data/event-info-184.json').pipe(
      catchError(error => {
        return throwError(() => new Error('No json file found.'));
      })
    );
  }
}