import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryUnitComponent } from './inventory-unit.component';

describe('InventoryUnitComponent', () => {
  let component: InventoryUnitComponent;
  let fixture: ComponentFixture<InventoryUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
