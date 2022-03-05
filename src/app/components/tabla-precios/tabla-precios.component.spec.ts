import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPreciosComponent } from './tabla-precios.component';

describe('TablaPreciosComponent', () => {
  let component: TablaPreciosComponent;
  let fixture: ComponentFixture<TablaPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPreciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
