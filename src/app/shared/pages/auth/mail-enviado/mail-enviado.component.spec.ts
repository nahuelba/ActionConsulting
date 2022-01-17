import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailEnviadoComponent } from './mail-enviado.component';

describe('MailEnviadoComponent', () => {
  let component: MailEnviadoComponent;
  let fixture: ComponentFixture<MailEnviadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailEnviadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailEnviadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
