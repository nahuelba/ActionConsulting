import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDetalleAdminComponent } from './usuario-detalle-admin.component';

describe('UsuarioDetalleAdminComponent', () => {
  let component: UsuarioDetalleAdminComponent;
  let fixture: ComponentFixture<UsuarioDetalleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioDetalleAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioDetalleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
