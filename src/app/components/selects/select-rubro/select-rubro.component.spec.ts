import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRubroComponent } from './select-rubro.component';

describe('SelectRubroComponent', () => {
  let component: SelectRubroComponent;
  let fixture: ComponentFixture<SelectRubroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRubroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
