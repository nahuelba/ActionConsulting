import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMailComponent } from './login-mail.component';

describe('LoginMailComponent', () => {
  let component: LoginMailComponent;
  let fixture: ComponentFixture<LoginMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
