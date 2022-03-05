import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCurriculumComponent } from './video-curriculum.component';

describe('VideoCurriculumComponent', () => {
  let component: VideoCurriculumComponent;
  let fixture: ComponentFixture<VideoCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCurriculumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
