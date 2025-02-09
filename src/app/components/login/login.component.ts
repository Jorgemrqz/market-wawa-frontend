import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';  // 🚀 Importamos Router
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  nombre_usuario: string = "";
  contrasenia: string = "";

  constructor(private auth: UserAuthService, private router: Router) { }  // 🚀 Agregamos Router en el constructor

  login() {
    if (!this.nombre_usuario || !this.contrasenia) {
      alert("Por favor, completa todos los campos");
      return;
    }

    this.auth.login(this.nombre_usuario, this.contrasenia)
      .subscribe({
        next: (response) => {
          console.log("Login exitoso:", response);

          // Verificamos que la respuesta tenga nombre_usuario antes de proceder
          if (response && response.nombre_usuario) {
            console.log("Usuario autenticado:", response.nombre_usuario);

            // Guardar los datos del usuario en localStorage
            localStorage.setItem('usuario', JSON.stringify(response));

            // Redirigir según el rol
            if (response.rol === "administrador") {
              this.router.navigate(['/proveedor']);
            } else if (response.rol === "cajero") {
              this.router.navigate(['/']);  // Ruta por defecto para cajero
            } else {
              console.log("Rol desconocido, manteniendo en la misma página.");
            }
          } else {
            console.error("Error: La respuesta no contiene el campo nombre_usuario");
          }
        },
        error: (error) => {
          console.error("Error de login:", error);
        },
      });
  }
}
