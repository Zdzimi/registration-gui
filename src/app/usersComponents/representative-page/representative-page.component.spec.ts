import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativePageComponent } from './representative-page.component';

describe('RepresentativePageComponent', () => {
  let component: RepresentativePageComponent;
  let fixture: ComponentFixture<RepresentativePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentativePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
