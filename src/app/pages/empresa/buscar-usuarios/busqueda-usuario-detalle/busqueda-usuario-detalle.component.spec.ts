import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaUsuarioDetalleComponent } from './busqueda-usuario-detalle.component';

describe('BusquedaUsuarioDetalleComponent', () => {
  let component: BusquedaUsuarioDetalleComponent;
  let fixture: ComponentFixture<BusquedaUsuarioDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaUsuarioDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaUsuarioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
