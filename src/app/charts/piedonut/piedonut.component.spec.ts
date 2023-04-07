import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiedonutComponent } from './piedonut.component';

describe('PiedonutComponent', () => {
  let component: PiedonutComponent;
  let fixture: ComponentFixture<PiedonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiedonutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiedonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
