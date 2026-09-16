import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from '../services/productoService';
import { Producto } from '../models/Producto';

@Component({
  selector: 'app-agregar-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-producto.html',
  styleUrl: './agregar-producto.css'
})
export class AgregarProducto {

  productoForm = new FormGroup({
    descripcion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    precio: new FormControl(0, [Validators.required, Validators.min(1)]),
    existencia: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) { }

  guardar(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const nuevoProducto = new Producto(
      0,
      this.productoForm.value.descripcion!,
      this.productoForm.value.precio!,
      this.productoForm.value.existencia!
    );

    this.productoService.crear(nuevoProducto).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
      }
    });
  }
}