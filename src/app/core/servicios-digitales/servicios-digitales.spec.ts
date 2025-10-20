import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosDigitales } from './servicios-digitales';

describe('ServiciosDigitales', () => {
  let component: ServiciosDigitales;
  let fixture: ComponentFixture<ServiciosDigitales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosDigitales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosDigitales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
