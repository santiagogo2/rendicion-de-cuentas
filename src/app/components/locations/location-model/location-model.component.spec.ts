import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationModelComponent } from './location-model.component';

describe('LocationModelComponent', () => {
  let component: LocationModelComponent;
  let fixture: ComponentFixture<LocationModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
