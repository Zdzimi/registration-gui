import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsPageComponent } from './institutions-page.component';

describe('InstitutionsPageComponent', () => {
  let component: InstitutionsPageComponent;
  let fixture: ComponentFixture<InstitutionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
