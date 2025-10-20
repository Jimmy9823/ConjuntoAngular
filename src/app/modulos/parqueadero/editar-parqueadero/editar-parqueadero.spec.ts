import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarParqueadero } from './editar-parqueadero';

describe('EditarParqueadero', () => {
  let component: EditarParqueadero;
  let fixture: ComponentFixture<EditarParqueadero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarParqueadero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarParqueadero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
