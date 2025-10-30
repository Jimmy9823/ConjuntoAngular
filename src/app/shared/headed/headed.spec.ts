import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Headed } from './headed';

describe('Headed', () => {
  let component: Headed;
  let fixture: ComponentFixture<Headed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Headed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Headed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
