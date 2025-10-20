import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarApartamentos } from './listar-apartamentos';

describe('ListarApartamentos', () => {
  let component: ListarApartamentos;
  let fixture: ComponentFixture<ListarApartamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarApartamentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarApartamentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
