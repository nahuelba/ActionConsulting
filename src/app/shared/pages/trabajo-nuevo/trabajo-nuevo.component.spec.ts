import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoNuevoComponent } from './trabajo-nuevo.component';

describe('TrabajoNuevoComponent', () => {
  let component: TrabajoNuevoComponent;
  let fixture: ComponentFixture<TrabajoNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajoNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
