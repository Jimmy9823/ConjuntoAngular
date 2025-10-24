import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMetricas } from './card-metricas';

describe('CardMetricas', () => {
  let component: CardMetricas;
  let fixture: ComponentFixture<CardMetricas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMetricas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMetricas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
