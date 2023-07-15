import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrestamosComponent } from './admin-prestamos.component';

describe('AdminPrestamosComponent', () => {
  let component: AdminPrestamosComponent;
  let fixture: ComponentFixture<AdminPrestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPrestamosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
