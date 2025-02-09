import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'producto', component: ProductoComponent },
    { path: 'proveedor', component: ProveedorComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
