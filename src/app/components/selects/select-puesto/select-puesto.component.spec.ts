import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPuestoComponent } from './select-puesto.component';

describe('SelectPuestoComponent', () => {
  let component: SelectPuestoComponent;
  let fixture: ComponentFixture<SelectPuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
