import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestroHogar } from './nuestro-hogar';

describe('NuestroHogar', () => {
  let component: NuestroHogar;
  let fixture: ComponentFixture<NuestroHogar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuestroHogar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuestroHogar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
