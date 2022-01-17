import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarCVComponent } from './cargar-cv.component';

describe('CargarCVComponent', () => {
  let component: CargarCVComponent;
  let fixture: ComponentFixture<CargarCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarCVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
