import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/api/clientes';

  constructor(private http: HttpClient) {}

  buscarPorCedula(cedula: string): Observable<any> {
    // En lugar de "/cedula/:cedula", ahora enviamos la cédula como parámetro de consulta
    return this.http.get(`${this.apiUrl}?cedula=${cedula}`);
  }

  crearCliente(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }
}
  