import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetFormPage } from './pet-form.page';

describe('PetFormPage', () => {
  let component: PetFormPage;
  let fixture: ComponentFixture<PetFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PetFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
