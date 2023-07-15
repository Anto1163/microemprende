import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { ChartData, ChartType } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { VentanaInfoclienteComponent } from '../ventana-infocliente/ventana-infocliente.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(VentanaInfoclienteComponent)
  ventanaEmergente!: VentanaInfoclienteComponent;

  user: any = this.authService.getUser();
  prestamos: any;
  error: boolean = false;
  errorMessage: string = '';
  hayPrestamos = false;
  prestamoMayor: any;

  public doughnutChartLabels: string[] = ['Cuotas Pendientes', 'Cuotaspagadas'];
  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.ventanaEmergente = new VentanaInfoclienteComponent();
    this.authService
      .verResumenPrestamos(
        this.user.cliente.username,
        this.user.cliente.password
      )
      .then(
        (response: any) => {
          if (response.prestamos) {
            console.log('Se encontró prestamos');
            this.hayPrestamos = true;
            this.prestamos = response;

            this.prestamoMayor = this.prestamos.prestamos.reduce(
              (max: any, obj: any) => {
                return obj.monto_prestamo > max.monto_prestamo ? obj : max;
              },
              this.prestamos.prestamos[0]
            );

            this.doughnutChartData = {
              labels: this.doughnutChartLabels,
              datasets: [
                {
                  data: [
                    this.prestamoMayor.cuotas_pendientes,
                    this.prestamoMayor.cuotas_pagadas,
                  ],
                },
              ],
            };
          } else {
            console.log('No se encontró registros');
            this.hayPrestamos = false;
          }
        },
        (error: any) => {
          console.error('Error de Prestamos', error);
          console.log(error);
          if (error.status === 404) {
            this.translate
              .get('error_inicio1')
              .subscribe((translation: string) => {
                this.errorMessage = translation;
              });
          } else {
            this.translate
              .get('error_inicio2')
              .subscribe((translation: string) => {
                this.errorMessage = translation;
              });
          }
          this.error = true;
        }
      );
  }

  handleButtonClick() {
    // Llamar a la función del servicio para verificar la información del cliente
    this.authService.verInfoCliente(this.user.cliente.id_cliente).then(
      (infoCliente) => {
        // Verificar el estado de la información del cliente
        if (infoCliente.estado === 'cerrado' || infoCliente.ingresos === 0) {
          // Redirigir a /evaluacion-crediticia
          // Reemplaza 'ruta-destino' con la ruta a la página de evaluación crediticia
          this.router.navigate(['/evaluacion-crediticia']);
        } else {
          console.log(infoCliente);
          this.ventanaEmergente.clienteInfo = infoCliente;
          this.ventanaEmergente.mostrarVentana = true;
          this.ventanaEmergente.llenarVentana();
        }
      },
      (error) => {
        console.error('Error al obtener información del cliente', error);
      }
    );
  }
}
