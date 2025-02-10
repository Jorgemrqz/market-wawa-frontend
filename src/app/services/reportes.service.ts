import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = 'http://localhost:3000/api/reportes';

  constructor(private http: HttpClient) {}

  obtenerVentasPorPeriodo(periodo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ventas-por-periodo/${periodo}`);
  }

  obtenerVentasPorCliente(idCliente: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ventas-por-cliente/${idCliente}`);
  }

  obtenerProductosMasVendidos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productos-mas-vendidos`);
  }

  obtenerIngresosPorPeriodo(periodo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ingresos-por-periodo/${periodo}`);
  }

  obtenerStockProductos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stock-productos`);
  }

  obtenerComprasAProveedores(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/compras-a-proveedores`);
  }
}
