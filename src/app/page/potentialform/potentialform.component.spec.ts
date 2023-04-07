import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialformComponent } from './potentialform.component';

describe('PotentialformComponent', () => {
  let component: PotentialformComponent;
  let fixture: ComponentFixture<PotentialformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
