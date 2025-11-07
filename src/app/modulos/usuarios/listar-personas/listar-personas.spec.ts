import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPersonas } from './listar-personas';

describe('ListarPersonas', () => {
  let component: ListarPersonas;
  let fixture: ComponentFixture<ListarPersonas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPersonas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPersonas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
