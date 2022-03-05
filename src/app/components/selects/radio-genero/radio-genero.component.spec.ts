import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGeneroComponent } from './radio-genero.component';

describe('RadioGeneroComponent', () => {
  let component: RadioGeneroComponent;
  let fixture: ComponentFixture<RadioGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioGeneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
