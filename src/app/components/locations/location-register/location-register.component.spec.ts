import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationRegisterComponent } from './location-register.component';

describe('LocationRegisterComponent', () => {
  let component: LocationRegisterComponent;
  let fixture: ComponentFixture<LocationRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
