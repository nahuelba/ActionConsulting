import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSkeletonComponent } from './detalle-skeleton.component';

describe('DetalleSkeletonComponent', () => {
  let component: DetalleSkeletonComponent;
  let fixture: ComponentFixture<DetalleSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
