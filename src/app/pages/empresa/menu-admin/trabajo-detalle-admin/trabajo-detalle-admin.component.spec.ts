import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoDetalleAdminComponent } from './trabajo-detalle-admin.component';

describe('TrabajoDetalleAdminComponent', () => {
  let component: TrabajoDetalleAdminComponent;
  let fixture: ComponentFixture<TrabajoDetalleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajoDetalleAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajoDetalleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
