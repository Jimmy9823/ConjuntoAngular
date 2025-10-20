import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarParqueaderos } from './listar-parqueaderos';

describe('ListarParqueaderos', () => {
  let component: ListarParqueaderos;
  let fixture: ComponentFixture<ListarParqueaderos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarParqueaderos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarParqueaderos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
