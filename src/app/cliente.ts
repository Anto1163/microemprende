export class Cliente {
  nombre_cliente: string;
  apellido_cliente: string;
  dni_cliente: string;
  direccion_cliente: string;
  telefono_cliente: string;
  email_cliente: string;
  username: string;
  password: string;
  historial_crediticio: string;

  constructor(
    nombre_cliente: string,
    apellido_cliente: string,
    dni_cliente: string,
    direccion_cliente: string,
    telefono_cliente: string,
    email_cliente: string,
    username: string,
    password: string,
    historial_crediticio : string
  ) {
    this.nombre_cliente = nombre_cliente;
    this.apellido_cliente = apellido_cliente;
    this.dni_cliente = dni_cliente;
    this.direccion_cliente = direccion_cliente;
    this.telefono_cliente = telefono_cliente;
    this.email_cliente = email_cliente;
    this.username = username;
    this.password = password;
    this.historial_crediticio = historial_crediticio;
  }
}
