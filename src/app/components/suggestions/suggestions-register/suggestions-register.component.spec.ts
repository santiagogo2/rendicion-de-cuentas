import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsRegisterComponent } from './suggestions-register.component';

describe('SuggestionsRegisterComponent', () => {
  let component: SuggestionsRegisterComponent;
  let fixture: ComponentFixture<SuggestionsRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
