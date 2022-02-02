import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarExperienciaComponent } from './modal-eliminar-experiencia.component';

describe('ModalEliminarExperienciaComponent', () => {
  let component: ModalEliminarExperienciaComponent;
  let fixture: ComponentFixture<ModalEliminarExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarExperienciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
