import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaInfoclienteComponent } from './ventana-infocliente.component';

describe('VentanaInfoclienteComponent', () => {
  let component: VentanaInfoclienteComponent;
  let fixture: ComponentFixture<VentanaInfoclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaInfoclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanaInfoclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
