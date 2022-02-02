import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarFormacionComponent } from './modal-eliminar-formacion.component';

describe('ModalEliminarFormacionComponent', () => {
  let component: ModalEliminarFormacionComponent;
  let fixture: ComponentFixture<ModalEliminarFormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarFormacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
