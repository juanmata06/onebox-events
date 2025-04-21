import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsBilboardViewComponent } from './events-bilboard-view.component';

describe('EventsBilboardViewComponent', () => {
  let component: EventsBilboardViewComponent;
  let fixture: ComponentFixture<EventsBilboardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsBilboardViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsBilboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
