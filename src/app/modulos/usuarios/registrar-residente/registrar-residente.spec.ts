import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarResidente } from './registrar-residente';

describe('RegistrarResidente', () => {
  let component: RegistrarResidente;
  let fixture: ComponentFixture<RegistrarResidente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarResidente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarResidente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
