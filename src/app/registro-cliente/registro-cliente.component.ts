import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.scss'],
})
export class RegistroClienteComponent implements OnInit {
  registroCliente!: FormGroup;

  cliente: Cliente = {
    nombre_cliente: '',
    apellido_cliente: '',
    dni_cliente: '',
    direccion_cliente: '',
    telefono_cliente: '',
    email_cliente: '',
    username: '',
    password: '',
    historial_crediticio: 'No lleno',
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registroCliente = this.formBuilder.group({
      nombre_cliente: ['', Validators.required],
      apellido_cliente: ['', Validators.required],
      dni_cliente: ['', Validators.required],
      direccion_cliente: ['', Validators.required],
      telefono_cliente: ['', Validators.required],
      email_cliente: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  public get formularioValido(): boolean {
    return this.registroCliente.valid;
  }
  onSubmit(): void {
    this.authService.registrar(this.cliente).then(
      (response: any) => {
        if (response) {
          console.log('registro exitoso');
        } else {
          console.log('Inicio de sesión fallido');
        }
      },
      (error: any) => {
        console.error('Error de inicio de sesión', error);
        console.log(error);
        if (error.status === 404) {
        } else {
        }
      }
    );
  }
}
