export class Prestamo {
  id_prestamo: string;
  monto_prestamo: string;
  tasa_interes: string;
  fecha_prestamo: string;
  fecha_vencimiento: string;
  tipo_pago: string;
  cuotas_pagadas: string;
  cuotas_pendientes: string;

  constructor(
    id_prestamo: string,
    monto_prestamo: string,
    tasa_interes: string,
    fecha_prestamo: string,
    fecha_vencimiento: string,
    tipo_pago: string,
    cuotas_pagadas: string,
    cuotas_pendientes: string
  ) {
    this.id_prestamo = id_prestamo;
    this.monto_prestamo = monto_prestamo;
    this.tasa_interes = tasa_interes;
    this.fecha_prestamo = fecha_prestamo;
    this.fecha_vencimiento = fecha_vencimiento;
    this.tipo_pago = tipo_pago;
    this.cuotas_pagadas = cuotas_pagadas;
    this.cuotas_pendientes = cuotas_pendientes;
  }
}
