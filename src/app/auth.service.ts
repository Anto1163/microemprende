import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from './cliente';
import { InfoCliente } from './info-cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5000/microemprende/us-central1/api';
  //https://us-central1-microemprende.cloudfunctions.net/api
  private user: any;
  private prestamos: any;
  private clienteInfo: any;
  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  adminLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) { }

  isAdminLoggedIn(): Observable<boolean> {
    return this.adminLoggedIn$.asObservable();
  }

  setAdminLoggedIn(loggedIn: boolean) {
    this.adminLoggedIn$.next(loggedIn);
  }

  setPrestamos(prestamos: any) {
    this.prestamos = prestamos;
  }

  getPrestamos(){
    return this.prestamos;
  }

  setClienteInfo(clienteInfo: any) {
    this.clienteInfo = clienteInfo;
  }

  getClienteInfo(){
    return this.clienteInfo;
  }

  setUser(user: any) {
    this.user = user;
  }

  getUser(){
    return this.user;
  }
  
  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  
  public changeLoggedIn(estado:boolean){
    this.isLoggedInSubject.next(estado);
  }
  

  login(username: string, password: string) {
    const url = `${this.baseUrl}/login`;
    console.log(this.isLoggedIn());
    const body = { username, password };
    return this.http.post(url, body).toPromise().then(
      (response: any) => {
        return response;
      },
      (error: any) => {
        console.error('Error de inicio de sesión', error);
        return error;
      }
    );
  }

  registrar(cliente: Cliente){
    const url = `${this.baseUrl}/registrocliente`;
    return this.http.post(url, cliente).toPromise().then(
      (response: any) => {
        console.log(response);
        return response;
      },
      (error: any) => {
        console.error('Error de registro', error);
        return error;
      }
    )
  }

  verResumenPrestamos(username: string, password: string){
    const url = `${this.baseUrl}/verprestamo`;
    const body = { username, password };
    return this.http.post(url, body).toPromise().then(
      (response: any) => {
        this.prestamos=response;
        return response;
      },
      (error: any) => {
        console.error('Error de busqueda(Prestamos)', error);
        return error;
      }
    );
  }

  modificarCliente(cliente: Cliente){
    const url = `${this.baseUrl}/modificarcliente`;
    console.log(cliente);
    return this.http.post(url, cliente).toPromise().then(
      (response: any) => {
        console.log(response);
        return response;
      },
      (error: any) => {
        console.error('Error al modificar cliente', error);
        return error;
      }
    )
  }

  modificarInfoCliente(infocliente: InfoCliente){
    const url = `${this.baseUrl}/modificarinfocliente`;
    console.log(infocliente);
    return this.http.post(url, infocliente).toPromise().then(
      (response: any) => {
        console.log(response);
        return response;
      },
      (error: any) => {
        console.error('Error al modificar información del cliente', error);
        return error;
      }
    )
  }

  registrarValoracion(id_cliente:string, descripcion: string, fecha:string, valoracion:string){
    const url = `${this.baseUrl}/valorar`;
    const body = { id_cliente, descripcion, fecha, valoracion };
    return this.http.post(url, body).toPromise().then(
      (response: any) => {
        return response;
      },
      (error: any) => {
        console.error('Error al registrar valoración', error);
        return error;
      }
    );
  }

  verAtenciones() {
    const url = `${this.baseUrl}/veratenciones`;
    return this.http.get(url).toPromise().then(
      (response: any) => {
        return response.atenciones;
      },
      (error: any) => {
        console.error('Error al obtener las atenciones', error);
        return error;
      }
    );
  }

  verInfoCliente(id_cliente: number) {
    const url = `${this.baseUrl}/verinfocliente`;
    const body = { id_cliente };
    return this.http.post(url, body).toPromise().then(
      (response: any) => {
        this.clienteInfo = response;
        return response;
      },
      (error: any) => {
        console.error('Error buscar infoCliente', error);
        return error;
      }
    );
  }

  loginAdmin(username: string, password: string): boolean {
    // Aquí puedes realizar la lógica de autenticación para el administrador.
    // Por ejemplo, puedes verificar si el nombre de usuario y la contraseña son válidos.
    // Devuelve true si las credenciales son válidas, de lo contrario, devuelve false.

    // Ejemplo básico de verificación de credenciales
    if (username === 'admin' && password === 'password123') {
      return true;
    } else {
      return false;
    }
  }

  verTodosClientes() {
  const url = `${this.baseUrl}/vertodosclientes`;
  return this.http.get(url).toPromise().then(
    (response: any) => {
      // Verificar si la respuesta es un objeto en lugar de un arreglo
      if (typeof response === 'object' && !Array.isArray(response)) {
        // Convertir el objeto de clientes a un arreglo
        const clientesArray = Object.values(response);
        return clientesArray;
      } else {
        return response;
      }
    },
    (error: any) => {
      console.error('Error al obtener las atenciones', error);
      return error;
    }
  );
}

  verTodosInfoCliente() {
    const url = `${this.baseUrl}/vertodosinfocliente`;
    return this.http.get(url).toPromise().then(
      (response: any) => {
        return response;
      },
      (error: any) => {
        console.error('Error al obtener las atenciones', error);
        return error;
      }
    );
  }
  verTodosPrestamos() {
    const url = `${this.baseUrl}/vertodosprestamos`;
    return this.http.get(url).toPromise().then(
      (response: any) => {
        return response;
      },
      (error: any) => {
        console.error('Error al obtener las atenciones', error);
        return error;
      }
    );
  }

  editarCliente(cliente: any): Promise<any> {
    const url = `${this.baseUrl}/adminmodificarcliente`;
    return this.http.post(url, cliente).toPromise();
  }
  
  eliminarCliente(id_cliente: String): Promise<any> {
    const url = `${this.baseUrl}/admineliminarcliente`;
    const body = {id_cliente};
    return this.http.post(url, body).toPromise();
  }
  
  agregarCliente(cliente: any): Promise<any> {
    const url = `${this.baseUrl}/adminagregarcliente`;
    return this.http.post(url, cliente).toPromise();
  }

  adminAprobarEvaluacion(idInformacionCliente: string, mensaje: string): Promise<any> {
    const url = `${this.baseUrl}/admin-aprobar-evaluacion`;
    const body = { id_informacion_cliente: idInformacionCliente, mensaje: mensaje };
    return this.http.post(url, body).toPromise();
  }
  
  adminRechazarEvaluacion(idInformacionCliente: string, mensaje: string): Promise<any> {
    const url = `${this.baseUrl}/admin-rechazar-evaluacion`;
    const body = { id_informacion_cliente: idInformacionCliente, mensaje: mensaje };
    return this.http.post(url, body).toPromise();
  }
}

