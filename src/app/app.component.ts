import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraAdministradorComponent } from './components/barra-administrador/barra-administrador.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarraAdministradorComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'market-wawa-frontend';
  usuario: any = null;  // Asegúrate de que el objeto usuario esté bien inicializado.

  ngOnInit() {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      this.usuario = JSON.parse(userData);  // Parseamos los datos del usuario
    }
  }
}
