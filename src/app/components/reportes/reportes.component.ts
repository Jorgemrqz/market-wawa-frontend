import { Component } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
  reportesVentas: any[] = [];
  reportesIngresos: any[] = [];
  productosMasVendidos: any[] = [];
  stockProductos: any[] = [];
  comprasProveedores: any[] = [];
  periodos = ['diario', 'semanal', 'mensual', 'anual'];
  periodoSeleccionado = 'mensual';  // Valor inicial, puede ser cambiado por el usuario
  cargando = false;

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.obtenerReportes();  // Obtener los reportes con el valor inicial
  }

  obtenerReportes(): void {
    this.cargando = true;

    this.reportesService.obtenerVentasPorPeriodo(this.periodoSeleccionado).subscribe(
      data => {
        this.reportesVentas = data.map((item:any) => ({
          periodo: new Date(item.periodo).toLocaleDateString(),
          total_ventas: parseFloat(item.total_ventas).toFixed(2)
        }));
        this.cargando = false;
      },
      error => {
        console.error('Error al obtener ventas:', error);
        this.cargando = false;
      }
    );
    

      this.reportesService.obtenerIngresosPorPeriodo(this.periodoSeleccionado).subscribe(
        data => { this.reportesIngresos = data; },
        error => { console.error('Error al obtener ingresos:', error); }
      );

    this.reportesService.obtenerProductosMasVendidos().subscribe(
      data => { this.productosMasVendidos = data; },
      error => { console.error('Error al obtener productos más vendidos:', error); }
    );

    this.reportesService.obtenerStockProductos().subscribe(
      data => { this.stockProductos = data; },
      error => { console.error('Error al obtener stock:', error); }
    );

    this.reportesService.obtenerComprasAProveedores().subscribe(
      data => { this.comprasProveedores = data; },
      error => { console.error('Error al obtener compras a proveedores:', error); }
    );
  }
}