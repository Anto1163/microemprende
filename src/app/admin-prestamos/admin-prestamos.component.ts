import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

class Prestamo {
  id: number;
  id_cliente: string;
  monto_prestamo: number;
  interes: number;
  fecha_prestamo: Date;
  fecha_vencimiento: Date;
  tipo_pago: string;
  cuotas_pagadas: number;
  cuotas_pendientes: number;
  cuotas: {
    fecha: Date;
    estado: string;
    numero: number;
  }[];

  constructor(
    id: number,
    id_cliente: string,
    monto_prestamo: number,
    interes: number,
    fecha_prestamo: Date,
    fecha_vencimiento: Date,
    tipo_pago: string,
    cuotas_pagadas: number,
    cuotas_pendientes: number,
    cuotas: {
      fecha: Date;
      estado: string;
      numero: number;
    }[]
  ) {
    this.id = id;
    this.id_cliente = id_cliente;
    this.monto_prestamo = monto_prestamo;
    this.interes = interes;
    this.fecha_prestamo = fecha_prestamo;
    this.fecha_vencimiento = fecha_vencimiento;
    this.tipo_pago = tipo_pago;
    this.cuotas_pagadas = cuotas_pagadas;
    this.cuotas_pendientes = cuotas_pendientes;
    this.cuotas = cuotas;
  }
}

@Component({
  selector: 'app-admin-prestamos',
  templateUrl: './admin-prestamos.component.html',
  styleUrls: ['./admin-prestamos.component.scss'],
})
export class AdminPrestamosComponent implements OnInit {
  prestamos: Prestamo[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchPrestamos();
  }

  fetchPrestamos(): void {
    this.authService
      .verTodosPrestamos()
      .then((response: any) => {
        console.log(response);
        // Verificar si la respuesta es un objeto que contiene la propiedad "prestamos"
        if (
          response &&
          Array.isArray(response.prestamos) &&
          response.prestamos.length > 0
        ) {
          this.prestamos = response.prestamos;
        } else {
          this.prestamos = []; // Si la respuesta no es válida, asignar un arreglo vacío
        }
      })
      .catch((error: any) => {
        console.error('Error al obtener los préstamos:', error);
      });
  }

  editarPrestamo(prestamo: Prestamo): void {
    // Lógica para editar el préstamo
  }

  eliminarPrestamo(prestamo: Prestamo): void {
    // Lógica para eliminar el préstamo
  }

  agregarPrestamo(): void {
    // Lógica para agregar un nuevo préstamo
  }
}
