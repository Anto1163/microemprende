import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-bi',
  templateUrl: './admin-bi.component.html',
  styleUrls: ['./admin-bi.component.scss'],
})
export class AdminBIComponent {
  lineChart: any;
  promedioSatisfaccionPorDia: { [fecha: string]: { promedio: number } } = {};
  nivelEficaciaPorDia: { [fecha: string]: { eficacia: number } } = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
    Chart.register(...registerables);
    this.obtenerDatosAtenciones();
  }

  obtenerDatosAtenciones() {
    this.authService.verAtenciones().then((atenciones: any) => {
      // Calcular promedio de satisfacción por día
      atenciones.forEach((atencion: any) => {
        const fecha = atencion.fecha;

        if (!this.promedioSatisfaccionPorDia[fecha]) {
          this.promedioSatisfaccionPorDia[fecha] = {
            promedio: 0,
          };
        }

        this.promedioSatisfaccionPorDia[fecha].promedio += atencion.valoracion;
      });

      for (const fecha in this.promedioSatisfaccionPorDia) {
        if (this.promedioSatisfaccionPorDia.hasOwnProperty(fecha)) {
          let totalValoraciones = 0; // Mover la declaración del totalValoraciones aquí

          atenciones.forEach((atencion: any) => {
            if (atencion.fecha === fecha) {
              totalValoraciones++;
            }
          });

          const valoracionesPorDia = Object.values(
            this.promedioSatisfaccionPorDia[fecha]
          );
          const sumaValoraciones = valoracionesPorDia.reduce(
            (a, b) => a + Number(b),
            0
          );
          const promedio = sumaValoraciones / totalValoraciones;

          this.promedioSatisfaccionPorDia[fecha].promedio = Number(
            promedio.toFixed(2)
          );
        }
      }

      // Calcular nivel de eficacia por día
      atenciones.forEach((atencion: any) => {
        const fecha = atencion.fecha;

        if (!this.nivelEficaciaPorDia[fecha]) {
          this.nivelEficaciaPorDia[fecha] = {
            eficacia: 0,
          };
        }

        this.nivelEficaciaPorDia[fecha].eficacia++;
      });

      for (const fecha in this.nivelEficaciaPorDia) {
        if (this.nivelEficaciaPorDia.hasOwnProperty(fecha)) {
          this.nivelEficaciaPorDia[fecha].eficacia =
            (this.nivelEficaciaPorDia[fecha].eficacia / 4) * 100;
        }
      }

      // Llamar a las funciones de generación de gráficos
      this.generarGraficoSatisfaccion();
      this.generarGraficoEficacia();
    });
  }

  generarGraficoSatisfaccion() {
    const labels = Object.keys(this.promedioSatisfaccionPorDia);
    const data = labels.map(
      (fecha) => this.promedioSatisfaccionPorDia[fecha].promedio
    );

    this.lineChart = new Chart('satisfaccionChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Promedio de Satisfacción',
            data: data,
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            min: 3,
            max: 6,
          },
        },
      },
    });
  }

  generarGraficoEficacia() {
    const labels = Object.keys(this.nivelEficaciaPorDia);
    const data = labels.map(
      (fecha) => this.nivelEficaciaPorDia[fecha].eficacia
    );

    this.lineChart = new Chart('eficaciaChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Nivel de Eficacia',
            data: data,
            fill: false,
            borderColor: 'green',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 200,
          },
        },
      },
    });
  }
}
