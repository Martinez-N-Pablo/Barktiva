import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToxicPage } from './toxics.page';

describe('ToxicPage', () => {
  let component: ToxicPage;
  let fixture: ComponentFixture<ToxicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
