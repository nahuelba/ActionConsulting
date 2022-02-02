import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormacionComponent } from './modal-formacion.component';

describe('ModalFormacionComponent', () => {
  let component: ModalFormacionComponent;
  let fixture: ComponentFixture<ModalFormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
