import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { EventsStoreService } from "./events.store.service";
import * as mocks from "../testing-mocks/events-mocks";

describe('EventsStoreService', () => {
  let service: EventsStoreService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(EventsStoreService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load events list', () => {
    service.loadEventsList();

    const req = http.expectOne('assets/data/events.json');
    req.flush(mocks.eventsList);

    const result = service.events();
    expect(result).toBeDefined();
    if (result) {
      expect(Array.isArray(result)).toBeTrue();
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it('should not load events list if already exists', () => {
    service.eventsListSignal.set(mocks.eventsList);
    service.loadEventsList();
    http.expectNone('assets/data/events.json');
  });

  it('should load events details by id', () => {
    service.loadEventDetailsById('68');

    const req = http.expectOne('assets/data/event-info-68.json');
    req.flush(mocks.eventDetail);

    const result = service.getEventDetail('68')();
    expect(result).toBeDefined();
    if (result) {
      expect(result.event.id).toBe('68');
    }
  });

  it('should not load events details by id if already exists', () => {
    service.eventsDetailsSignal.set([mocks.eventDetail]);
    service.loadEventDetailsById('68');
    http.expectNone('assets/data/event-info-68.json');
  });

});