import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUsuarios } from './auth-usuarios';

describe('AuthUsuarios', () => {
  let component: AuthUsuarios;
  let fixture: ComponentFixture<AuthUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthUsuarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthUsuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
