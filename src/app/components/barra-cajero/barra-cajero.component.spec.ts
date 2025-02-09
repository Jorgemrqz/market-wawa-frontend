import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraCajeroComponent } from './barra-cajero.component';

describe('BarraCajeroComponent', () => {
  let component: BarraCajeroComponent;
  let fixture: ComponentFixture<BarraCajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraCajeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraCajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
