import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {
  proveedores: any[] = [];
  proveedor = {
    id_proveedor: null,  // `id_proveedor` se puede asignar como `null` inicialmente
    nombre: '',
    direccion: '',
    telefono: '',
    email: ''
  };

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.getProveedores();
  }

  // Método para obtener todos los proveedores
  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe({
      next: (proveedores: any[]) => {
        this.proveedores = proveedores;
      },
      error: (err) => {
        console.error('Error al obtener proveedores:', err);
      }
    });
  }

  // Método para agregar un nuevo proveedor
  onSubmit(): void {
    if (this.proveedor.id_proveedor) {
      // Si el id_proveedor existe, es una actualización
      this.proveedorService.updateProveedor(this.proveedor.id_proveedor, this.proveedor).subscribe({
        next: (updatedProveedor) => {
          this.getProveedores();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al actualizar proveedor:', err);
        }
      });
    } else {
      // Si no existe el id_proveedor, es un nuevo proveedor
      this.proveedorService.createProveedor(this.proveedor).subscribe({
        next: (newProveedor) => {
          this.getProveedores();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al agregar proveedor:', err);
        }
      });
    }
  }

  // Método para editar un proveedor
  editProveedor(proveedor: any): void {
    this.proveedor = { ...proveedor };
  }

  // Método para eliminar un proveedor
  deleteProveedor(id: number): void {
    this.proveedorService.deleteProveedor(id).subscribe({
      next: () => {
        this.getProveedores();
      },
      error: (err) => {
        console.error('Error al eliminar proveedor:', err);
      }
    });
  }

  // Método para resetear el formulario
  resetForm(): void {
    this.proveedor = {
      id_proveedor: null,  // Reseteamos también a null
      nombre: '',
      direccion: '',
      telefono: '',
      email: ''
    };
  }
}

