import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonthCellTemplateComponent } from './month-cell-template.component';

describe('MonthCellTemplateComponent', () => {
  let component: MonthCellTemplateComponent;
  let fixture: ComponentFixture<MonthCellTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MonthCellTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthCellTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
