import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalValuesComponent } from './total-values.component';

describe('TotalValuesComponent', () => {
  let component: TotalValuesComponent;
  let fixture: ComponentFixture<TotalValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalValuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
