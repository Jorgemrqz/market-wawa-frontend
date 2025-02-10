import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { FacturaComponent } from './components/factura/factura.component';
import { ReportesComponent } from './components/reportes/reportes.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'producto', component: ProductoComponent },
    { path: 'proveedor', component: ProveedorComponent },
    { path: 'factura', component: FacturaComponent },
    { path: 'reporte', component: ReportesComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
