import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavBarComponent } from './header-nav-bar.component';

describe('HeaderNavBarComponent', () => {
  let component: HeaderNavBarComponent;
  let fixture: ComponentFixture<HeaderNavBarComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderNavBarComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render HEADER title', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('HEADER');
  });
});
