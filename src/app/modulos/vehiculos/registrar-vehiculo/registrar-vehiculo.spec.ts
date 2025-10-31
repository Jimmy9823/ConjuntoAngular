import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVehiculo } from './registrar-vehiculo';

describe('RegistrarVehiculo', () => {
  let component: RegistrarVehiculo;
  let fixture: ComponentFixture<RegistrarVehiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarVehiculo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarVehiculo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
