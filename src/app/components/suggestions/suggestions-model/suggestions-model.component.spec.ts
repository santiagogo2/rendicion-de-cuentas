import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsModelComponent } from './suggestions-model.component';

describe('SuggestionsModelComponent', () => {
  let component: SuggestionsModelComponent;
  let fixture: ComponentFixture<SuggestionsModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
