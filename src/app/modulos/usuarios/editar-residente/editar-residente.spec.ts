import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarResidente } from './editar-residente';

describe('EditarResidente', () => {
  let component: EditarResidente;
  let fixture: ComponentFixture<EditarResidente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarResidente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarResidente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
