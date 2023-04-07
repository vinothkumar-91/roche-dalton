import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialdetailComponent } from './potentialdetail.component';

describe('PotentialdetailComponent', () => {
  let component: PotentialdetailComponent;
  let fixture: ComponentFixture<PotentialdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
