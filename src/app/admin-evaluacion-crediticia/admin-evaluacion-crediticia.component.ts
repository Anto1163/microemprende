import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

class EvaluacionCrediticia {
  id_informacion_cliente: string;
  id_cliente: string;
  sector_trabajo: string;
  monto_prestamo: string;
  tipo_periodo: string;
  pago_disponible: string;
  ingresos: string;
  estado: string;
  mensaje: string;

  constructor(
    id_informacion_cliente: string,
    id_cliente: string,
    sector_trabajo: string,
    monto_prestamo: string,
    tipo_periodo: string,
    pago_disponible: string,
    ingresos: string,
    estado: string,
    mensaje: string
  ) {
    this.id_informacion_cliente = id_informacion_cliente;
    this.id_cliente = id_cliente;
    this.sector_trabajo = sector_trabajo;
    this.monto_prestamo = monto_prestamo;
    this.tipo_periodo = tipo_periodo;
    this.pago_disponible = pago_disponible;
    this.ingresos = ingresos;
    this.estado = estado;
    this.mensaje = mensaje;
  }
}

@Component({
  selector: 'app-admin-evaluacion-crediticia',
  templateUrl: './admin-evaluacion-crediticia.component.html',
  styleUrls: ['./admin-evaluacion-crediticia.component.scss'],
})
export class AdminEvaluacionCrediticiaComponent implements OnInit {
  evaluaciones: EvaluacionCrediticia[] = [];
  filteredEvaluaciones: EvaluacionCrediticia[] = [];
  searchQuery: string = '';
  selectedStatus: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchEvaluaciones();
  }

  fetchEvaluaciones(): void {
    this.authService
      .verTodosInfoCliente()
      .then((response: any) => {
        console.log(response);
        // Verificar si la respuesta es un arreglo que contiene evaluaciones crediticias
        if (Array.isArray(response) && response.length > 0) {
          this.evaluaciones = response;
          this.applyFilters();
        } else {
          this.evaluaciones = []; // Si la respuesta no es un arreglo válido, asignar un arreglo vacío
        }
      })
      .catch((error: any) => {
        console.error('Error al obtener las evaluaciones crediticias:', error);
      });
  }

  applyFilters(): void {
    this.filteredEvaluaciones = this.evaluaciones.filter(
      (evaluacion: EvaluacionCrediticia) => {
        const queryMatch = evaluacion.id_cliente
          .toString()
          .includes(this.searchQuery);
        const statusMatch = this.selectedStatus
          ? evaluacion.estado.toLowerCase() ===
            this.selectedStatus.toLowerCase()
          : true;
        return queryMatch && statusMatch;
      }
    );
  }

  aprobarEvaluacion(evaluacion: EvaluacionCrediticia): void {
    const mensaje = prompt('Ingrese el mensaje para aprobar la evaluación:');
    if (mensaje) {
      evaluacion.mensaje = mensaje;
      evaluacion.estado = 'Evaluando';
      this.authService
        .modificarInfoCliente(evaluacion)
        .then((response: any) => {
          console.log(response);
          this.fetchEvaluaciones();
        })
        .catch((error: any) => {
          console.error('Error al aprobar la evaluación crediticia:', error);
        });
    }
  }

  rechazarEvaluacion(evaluacion: EvaluacionCrediticia): void {
    const mensaje = prompt('Ingrese el mensaje para rechazar la evaluación:');
    if (mensaje) {
      evaluacion.mensaje = mensaje;
      evaluacion.estado = 'Desaprobado';
      this.authService
        .modificarInfoCliente(evaluacion)
        .then((response: any) => {
          console.log(response);
          this.fetchEvaluaciones();
        })
        .catch((error: any) => {
          console.error('Error al rechazar la evaluación crediticia:', error);
        });
    }
  }
}
