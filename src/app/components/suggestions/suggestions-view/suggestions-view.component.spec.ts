import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsViewComponent } from './suggestions-view.component';

describe('SuggestionsViewComponent', () => {
  let component: SuggestionsViewComponent;
  let fixture: ComponentFixture<SuggestionsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
