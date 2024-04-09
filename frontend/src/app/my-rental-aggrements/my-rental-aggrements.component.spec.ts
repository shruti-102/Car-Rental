import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRentalAggrementsComponent } from './my-rental-aggrements.component';

describe('MyRentalAggrementsComponent', () => {
  let component: MyRentalAggrementsComponent;
  let fixture: ComponentFixture<MyRentalAggrementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRentalAggrementsComponent]
    });
    fixture = TestBed.createComponent(MyRentalAggrementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
