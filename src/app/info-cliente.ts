export class InfoCliente {
  id_cliente: string;
  sector_trabajo: string;
  monto_prestamo: string;
  tipo_periodo: string;
  pago_disponible: string;
  ingresos: string;

  constructor(
    id_cliente: string,
    sector_trabajo: string,
    monto_prestamo: string,
    tipo_periodo: string,
    pago_disponible: string,
    ingresos: string
  ) {
    this.id_cliente = id_cliente;
    this.sector_trabajo = sector_trabajo;
    this.monto_prestamo = monto_prestamo;
    this.tipo_periodo = tipo_periodo;
    this.pago_disponible = pago_disponible;
    this.ingresos = ingresos;
  }
}
