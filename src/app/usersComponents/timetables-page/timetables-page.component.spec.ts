import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetablesPageComponent } from './timetables-page.component';

describe('TimetablesPageComponent', () => {
  let component: TimetablesPageComponent;
  let fixture: ComponentFixture<TimetablesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetablesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetablesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
