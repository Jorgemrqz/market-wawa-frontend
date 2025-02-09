import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = 'http://localhost:3000/api/proveedores';

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createProveedor(proveedor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, proveedor);
  }

  updateProveedor(id: number, proveedor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, proveedor);
  }

  deleteProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
