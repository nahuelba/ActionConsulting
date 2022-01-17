import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidasteContraseniaComponent } from './olvidaste-contrasenia.component';

describe('OlvidasteContraseniaComponent', () => {
  let component: OlvidasteContraseniaComponent;
  let fixture: ComponentFixture<OlvidasteContraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlvidasteContraseniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidasteContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
