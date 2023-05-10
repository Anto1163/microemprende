import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://i1resjshu3.execute-api.sa-east-1.amazonaws.com/Prueba';
  private user: any;
  private prestamos: any;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  setPrestamos(prestamos: any) {
    this.prestamos = prestamos;
  }

  getPrestamos(){
    return this.prestamos;
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
    const url = `${this.baseUrl}/logincliente`;
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
    const url = `${this.baseUrl}/RegistrarCliente`;
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
    
  }
}
