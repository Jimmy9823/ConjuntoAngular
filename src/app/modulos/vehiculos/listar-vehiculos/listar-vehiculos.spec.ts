import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVehiculos } from './listar-vehiculos';

describe('ListarVehiculos', () => {
  let component: ListarVehiculos;
  let fixture: ComponentFixture<ListarVehiculos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarVehiculos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarVehiculos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
