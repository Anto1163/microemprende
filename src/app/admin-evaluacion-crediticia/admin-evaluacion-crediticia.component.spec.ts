import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEvaluacionCrediticiaComponent } from './admin-evaluacion-crediticia.component';

describe('AdminEvaluacionCrediticiaComponent', () => {
  let component: AdminEvaluacionCrediticiaComponent;
  let fixture: ComponentFixture<AdminEvaluacionCrediticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEvaluacionCrediticiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEvaluacionCrediticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
