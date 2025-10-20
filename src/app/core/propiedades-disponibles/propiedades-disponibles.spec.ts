import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesDisponibles } from './propiedades-disponibles';

describe('PropiedadesDisponibles', () => {
  let component: PropiedadesDisponibles;
  let fixture: ComponentFixture<PropiedadesDisponibles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadesDisponibles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropiedadesDisponibles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
