import { Component } from '@angular/core';

@Component({
  selector: 'app-ventana-infocliente',
  templateUrl: './ventana-infocliente.component.html',
  styleUrls: ['./ventana-infocliente.component.scss'],
})
export class VentanaInfoclienteComponent {
  clienteInfo: any;
  mostrarVentana: boolean = false;
  estadoCliente: string = '';
  mensaje: string = '';

  cerrarVentana() {
    this.mostrarVentana = false;
  }

  llenarVentana() {
    this.obtenerValorProgreso();
  }

  obtenerValorProgreso(): number {
    if (this.clienteInfo.estado === 'Enviado') {
      this.mensaje = 'Su solicitud ha sido enviada';
      return 1;
    } else if (this.clienteInfo.estado === 'Evaluando') {
      this.mensaje = 'Su solicitud está siendo evaluada';
      return 2;
    } else if (
      this.clienteInfo.estado === 'Aprobado' ||
      this.clienteInfo.estado === 'Desaprobado'
    ) {
      this.mensaje = this.clienteInfo.mensaje;
    } else if (this.clienteInfo.estado === 'Cerrado') {
      return 4;
    }
    return 0;
  }
}
