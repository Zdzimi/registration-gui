import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativesPageComponent } from './representatives-page.component';

describe('RepresentativesPageComponent', () => {
  let component: RepresentativesPageComponent;
  let fixture: ComponentFixture<RepresentativesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentativesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
