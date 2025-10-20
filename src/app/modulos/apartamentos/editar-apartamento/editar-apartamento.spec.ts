import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarApartamento } from './editar-apartamento';

describe('EditarApartamento', () => {
  let component: EditarApartamento;
  let fixture: ComponentFixture<EditarApartamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarApartamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarApartamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
