import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  productos: any[] = [];
  producto = {
    nombre: '',
    descripcion: '',
    precio_compra: 0,
    precio_venta: 0,
    stock: 0,
    id_proveedor: 0
  };
  isEditing = false;  // Agregar esta propiedad para saber si estamos editando

  constructor(private productoService: ProductoService) {
    console.log('ProductoComponent constructor ejecutado');
  }

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.getProductos();
  }

  // Método para obtener todos los productos
  getProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (productos: any[]) => {
        this.productos = productos;
        console.log('Productos en Angular:', this.productos);
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  // Método para agregar o editar un producto
  onSubmit(): void {
    console.log('Enviando producto:', this.producto);

    if (this.isEditing) {
      // Si estamos editando un producto, hacer una solicitud de actualización
      this.productoService.updateProducto(this.producto).subscribe({
        next: (updatedProducto: any) => {
          console.log('Producto actualizado:', updatedProducto);
          this.getProductos();  // Recargar la lista de productos
          this.resetForm();      // Resetear el formulario
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);
        }
      });
    } else {
      // Si no estamos editando, crear un nuevo producto
      this.productoService.createProducto(this.producto).subscribe({
        next: (newProducto: any) => {
          console.log('Producto agregado:', newProducto);
          this.getProductos();  // Recargar la lista de productos
          this.resetForm();      // Resetear el formulario
        },
        error: (err) => {
          console.error('Error al agregar producto:', err);
        }
      });
    }
  }

  // Método para editar un producto (llenar el formulario con los datos del producto seleccionado)
  editProducto(producto: any): void {
    this.producto = { ...producto };  // Copiar los datos del producto a editar
    this.isEditing = true;            // Establecer el flag de edición
  }

  // Método para eliminar un producto
  deleteProducto(id: number): void {
    this.productoService.deleteProducto(id).subscribe({
      next: () => {
        this.getProductos(); // Recargar la lista después de eliminar un producto
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
      }
    });
  }

  // Método para resetear el formulario
  resetForm(): void {
    this.producto = {
      nombre: '',
      descripcion: '',
      precio_compra: 0,
      precio_venta: 0,
      stock: 0,
      id_proveedor: 0
    };
    this.isEditing = false;  // Restablecer el flag de edición
  }
}
