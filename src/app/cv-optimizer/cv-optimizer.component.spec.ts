import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvOptimizerComponent } from './cv-optimizer.component';

describe('CvOptimizerComponent', () => {
  let component: CvOptimizerComponent;
  let fixture: ComponentFixture<CvOptimizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvOptimizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvOptimizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
