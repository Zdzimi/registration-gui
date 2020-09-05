import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesPanelComponent } from './places-panel.component';

describe('PlacesPanelComponent', () => {
  let component: PlacesPanelComponent;
  let fixture: ComponentFixture<PlacesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
