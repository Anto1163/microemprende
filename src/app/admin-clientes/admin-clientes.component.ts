import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

class Cliente {
  id_cliente: string;
  nombre_cliente: string;
  apellido_cliente: string;
  dni_cliente: string;
  direccion_cliente: string;
  telefono_cliente: string;
  email_cliente: string;
  historial_crediticio: string;

  constructor(
    id_cliente: string,
    nombre_cliente: string,
    apellido_cliente: string,
    dni_cliente: string,
    direccion_cliente: string,
    telefono_cliente: string,
    email_cliente: string,
    historial_crediticio: string
  ) {
    this.id_cliente = id_cliente;
    this.nombre_cliente = nombre_cliente;
    this.apellido_cliente = apellido_cliente;
    this.dni_cliente = dni_cliente;
    this.direccion_cliente = direccion_cliente;
    this.telefono_cliente = telefono_cliente;
    this.email_cliente = email_cliente;
    this.historial_crediticio = historial_crediticio;
  }
}

@Component({
  selector: 'app-admin-clientes',
  templateUrl: './admin-clientes.component.html',
  styleUrls: ['./admin-clientes.component.scss'],
})
export class AdminClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  modoEdicion: boolean = false;
  clienteEditar: Cliente | null = null;
  formularioCliente!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.fetchClientes();

    this.formularioCliente = this.formBuilder.group({
      id_cliente: ['', Validators.required],
      nombre_cliente: ['', Validators.required],
      apellido_cliente: ['', Validators.required],
      dni_cliente: ['', Validators.required],
      direccion_cliente: ['', Validators.required],
      telefono_cliente: ['', Validators.required],
      email_cliente: ['', Validators.required],
      historial_crediticio: ['', Validators.required],
    });
  }

  fetchClientes(): void {
    this.authService
      .verTodosClientes()
      .then((response: any) => {
        console.log(response);
        if (Array.isArray(response) && response.length > 0) {
          this.clientes = response[0];
          console.log(this.clientes); // Verificar que los datos se asignen correctamente
        } else {
          this.clientes = [];
        }
      })
      .catch((error: any) => {
        console.error('Error al obtener los clientes:', error);
      });
  }

  editarCliente(cliente: Cliente): void {
    this.modoEdicion = true;
    this.clienteEditar = cliente;

    this.formularioCliente.patchValue({
      id_cliente: cliente.id_cliente,
      nombre_cliente: cliente.nombre_cliente,
      apellido_cliente: cliente.apellido_cliente,
      dni_cliente: cliente.dni_cliente,
      direccion_cliente: cliente.direccion_cliente,
      telefono_cliente: cliente.telefono_cliente,
      email_cliente: cliente.email_cliente,
      historial_crediticio: cliente.historial_crediticio,
    });
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.clienteEditar = null;
    this.formularioCliente.reset();
  }

  guardarCliente(): void {
    const cliente: Cliente = this.formularioCliente.value;

    if (this.modoEdicion) {
      this.authService
        .editarCliente(cliente)
        .then((response: any) => {
          console.log(response);
          this.fetchClientes();
          this.cancelarEdicion();
        })
        .catch((error: any) => {
          console.error('Error al editar el cliente:', error);
        });
    } else {
      this.authService
        .agregarCliente(cliente)
        .then((response: any) => {
          console.log(response);
          this.fetchClientes();
          this.cancelarEdicion();
        })
        .catch((error: any) => {
          console.error('Error al agregar el cliente:', error);
        });
    }
  }

  eliminarCliente(cliente: Cliente): void {
    console.log(cliente);
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar al cliente?');

    if (confirmacion) {
      this.authService
        .eliminarCliente(cliente.id_cliente)
        .then((response: any) => {
          console.log(response);
          this.fetchClientes();
        })
        .catch((error: any) => {
          console.error('Error al eliminar el cliente:', error);
        });
    }
  }

  agregarCliente(): void {
    const nuevoCliente = new Cliente('', '', '', '', '', '', '', '');

    this.modoEdicion = true;
    this.clienteEditar = nuevoCliente;
  }
}
