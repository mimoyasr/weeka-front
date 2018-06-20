import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookerProfileComponent } from './cooker-profile.component';

describe('CookerProfileComponent', () => {
  let component: CookerProfileComponent;
  let fixture: ComponentFixture<CookerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
