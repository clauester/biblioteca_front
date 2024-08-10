import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarPrestamoComponent } from './agregar-editar-prestamo.component';

describe('AgregarEditarPrestamoComponent', () => {
  let component: AgregarEditarPrestamoComponent;
  let fixture: ComponentFixture<AgregarEditarPrestamoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEditarPrestamoComponent]
    });
    fixture = TestBed.createComponent(AgregarEditarPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
