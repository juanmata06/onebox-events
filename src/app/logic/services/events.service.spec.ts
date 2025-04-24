import { TestBed } from "@angular/core/testing";
import { EventsService } from "./events.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { catchError } from "rxjs";

const mockEventsList = [
  {
    "id": "184",
    "title": "PABLO ALBORÁN",
  }
];

const mockEventDetail = {
  "event": {
    "id": "68",
    "title": "JOAN MANUEL SERRAT",
  },
  "sessions": [
    {
      "date": "1444255200000",
      "availability": "2"
    },
    {
      "date": "1443650400000",
      "availability": "4"
    },
  ]
};

describe('EventsService', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get events list', () => {
    service.getEventsList().subscribe(events => {
      expect(events).toEqual(mockEventsList);
    });

    const req = httpMock.expectOne('assets/data/events.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockEventsList);
  });

  it('should handle error in get events list', () => {
    service.getEventsList().subscribe({
      next: () => fail('Error'),
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('No json file found.');
      }
    });

    const req = httpMock.expectOne('assets/data/events.json');
    expect(req.request.method).toBe('GET');

    req.flush('Error', {
      status: 404,
      statusText: 'Not Found'
    });
  });

  it('should get event detail', () => {
    service.getEventDetail('68').subscribe((data) => {
      expect(data).toEqual(mockEventDetail);
    });

    const req = httpMock.expectOne(`assets/data/event-info-68.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEventDetail);
  });

  it('should handle error in get event detail', () => {
    service.getEventDetail('null')
      .pipe(
        catchError(err => {
          expect(err.message).toContain('No json file found.');
          return [];
        })
      ).subscribe();

    const req = httpMock.expectOne('assets/data/event-info-null.json');
    expect(req.request.method).toBe('GET');

    req.flush('Error', {
      status: 404,
      statusText: 'Not Found'
    });
  });

});