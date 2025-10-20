import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecesitasAyuda } from './necesitas-ayuda';

describe('NecesitasAyuda', () => {
  let component: NecesitasAyuda;
  let fixture: ComponentFixture<NecesitasAyuda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NecesitasAyuda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NecesitasAyuda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
