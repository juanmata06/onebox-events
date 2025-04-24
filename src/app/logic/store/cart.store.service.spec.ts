import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import * as mocks from "../testing-mocks/events-mocks";
import { CartStoreService } from "./cart.store.service";

describe('CartStoreService', () => {
  let service: CartStoreService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CartStoreService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get item by id', () => {
    service.increaseDateQuantity(mocks.event, '1444255200000');
    
    const item = service.getItemByEventId(mocks.event.id);
    expect(item).toBeDefined();
    expect(item?.event.id).toBe(mocks.event.id);
  });

  it('should add a new event', () => {
    service.increaseDateQuantity(mocks.event, '1444255200000');

    const cart = service.cart();
    expect(cart.length).toBe(1);
    expect(cart[0].event.id).toBe(mocks.event.id);
    expect(cart[0].datesSelected[0].date).toBe('1444255200000');
    expect(cart[0].datesSelected[0].quantity).toBe(1);
  });

  it('should increase the date quantity', () => {
    service.increaseDateQuantity(mocks.event, '1444255200000');
    service.increaseDateQuantity(mocks.event, '1444255200000');

    const cart = service.cart();
    expect(cart[0].datesSelected[0].quantity).toBe(2);
  });

  it('should delete a event', () => {
    service.increaseDateQuantity(mocks.event, '1444255200000');
    service.decreaseDateQuantity(mocks.event.id, '1444255200000');

    const cart = service.cart();
    expect(cart.length).toBe(0);
  });

  it('should decrease the date quantity', () => {
    service.increaseDateQuantity(mocks.event, '1444255200000');
    service.increaseDateQuantity(mocks.event, '1444255200000');
    service.decreaseDateQuantity(mocks.event.id, '1444255200000');

    const cart = service.cart();
    expect(cart[0].datesSelected[0].quantity).toBe(1);
  });

  it('should delete all date quantity', () => {
    service.increaseDateQuantity(mocks.event, '1444255200000');
    service.increaseDateQuantity(mocks.event, '1444255200000');

    service.increaseDateQuantity(mocks.event, '1439416800000');
    service.increaseDateQuantity(mocks.event, '1439416800000');

    service.deleteDateQuantity(mocks.event.id, '1439416800000');

    const cart = service.cart();
    expect(cart[0].datesSelected.length).toBe(1);
  });

});