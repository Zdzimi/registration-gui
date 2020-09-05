import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTimetablePageComponent } from './day-timetable-page.component';

describe('DayTimetablePageComponent', () => {
  let component: DayTimetablePageComponent;
  let fixture: ComponentFixture<DayTimetablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayTimetablePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTimetablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
