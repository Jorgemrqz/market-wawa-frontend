import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraAdministradorComponent } from './barra-administrador.component';

describe('BarraAdministradorComponent', () => {
  let component: BarraAdministradorComponent;
  let fixture: ComponentFixture<BarraAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
