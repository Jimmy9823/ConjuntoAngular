import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parqueaderos } from './parqueaderos';

describe('Parqueaderos', () => {
  let component: Parqueaderos;
  let fixture: ComponentFixture<Parqueaderos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Parqueaderos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Parqueaderos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
