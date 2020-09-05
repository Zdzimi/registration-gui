import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePanelComponent } from './place-panel.component';

describe('PlacePanelComponent', () => {
  let component: PlacePanelComponent;
  let fixture: ComponentFixture<PlacePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
