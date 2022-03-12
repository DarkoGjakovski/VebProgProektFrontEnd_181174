import { ComponentFixture, TestBed } from '@angular/core/testing';
import { productCardComponent } from './product.card.component';


describe('ClientsComponent', () => {
  let component: productCardComponent;
  let fixture: ComponentFixture<productCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ productCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(productCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
