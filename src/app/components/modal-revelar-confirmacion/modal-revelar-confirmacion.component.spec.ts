import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRevelarConfirmacionComponent } from './modal-revelar-confirmacion.component';

describe('ModalRevelarConfirmacionComponent', () => {
  let component: ModalRevelarConfirmacionComponent;
  let fixture: ComponentFixture<ModalRevelarConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRevelarConfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRevelarConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
