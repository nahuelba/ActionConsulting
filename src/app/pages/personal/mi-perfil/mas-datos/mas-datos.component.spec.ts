import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasDatosComponent } from './mas-datos.component';

describe('MasDatosComponent', () => {
  let component: MasDatosComponent;
  let fixture: ComponentFixture<MasDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
