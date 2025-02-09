import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private URL = 'http://localhost:3000/api/usuarios/login';

  constructor(private http: HttpClient) { }

  public login(nombre_usuario:string, contraseña:string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = Object.assign({ nombre_usuario, contraseña });  
    console.log(body)
    return this.http.post<any>(this.URL, body, { headers });
  }
}
