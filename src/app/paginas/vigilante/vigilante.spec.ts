import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vigilante } from './vigilante';

describe('Vigilante', () => {
  let component: Vigilante;
  let fixture: ComponentFixture<Vigilante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vigilante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vigilante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
