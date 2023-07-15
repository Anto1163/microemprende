import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBIComponent } from './admin-bi.component';

describe('AdminBIComponent', () => {
  let component: AdminBIComponent;
  let fixture: ComponentFixture<AdminBIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
