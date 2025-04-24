import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { catchError } from "rxjs";
import { EventsService } from "./events.service";
import * as mocks from "../testing-mocks/events-mocks";

describe('EventsService', () => {
  let service: EventsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(EventsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get events list', () => {
    service.getEventsList().subscribe(events => {
      expect(events).toEqual(mocks.eventsList);
    });

    const req = http.expectOne('assets/data/events.json');
    expect(req.request.method).toBe('GET');
    req.flush(mocks.eventsList);
  });

  it('should handle error in get events list', () => {
    service.getEventsList().subscribe({
      next: () => fail('Error'),
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('No json file found.');
      }
    });

    const req = http.expectOne('assets/data/events.json');
    expect(req.request.method).toBe('GET');

    req.flush('Error', {
      status: 404,
      statusText: 'Not Found'
    });
  });

  it('should get event detail', () => {
    service.getEventDetail('68').subscribe((data) => {
      expect(data).toEqual(mocks.eventDetail);
    });

    const req = http.expectOne(`assets/data/event-info-68.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mocks.eventDetail);
  });

  it('should handle error in get event detail', () => {
    service.getEventDetail('null')
      .pipe(
        catchError(err => {
          expect(err.message).toContain('No json file found.');
          return [];
        })
      ).subscribe();

    const req = http.expectOne('assets/data/event-info-null.json');
    expect(req.request.method).toBe('GET');

    req.flush('Error', {
      status: 404,
      statusText: 'Not Found'
    });
  });

});