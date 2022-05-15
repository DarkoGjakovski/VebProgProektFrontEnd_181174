import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductFormCardComponent } from './new-product-form-card.component';

describe('NewProductFormCardComponent', () => {
  let component: NewProductFormCardComponent;
  let fixture: ComponentFixture<NewProductFormCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProductFormCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
