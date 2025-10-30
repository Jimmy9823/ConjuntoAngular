import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMetricasMain } from './card-metricas-main';

describe('CardMetricasMain', () => {
  let component: CardMetricasMain;
  let fixture: ComponentFixture<CardMetricasMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMetricasMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMetricasMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
