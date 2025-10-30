import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Torres } from './torres';

describe('Torres', () => {
  let component: Torres;
  let fixture: ComponentFixture<Torres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Torres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Torres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
