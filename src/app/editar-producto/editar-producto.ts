import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from '../services/productoService';
import { Producto } from '../models/Producto';

@Component({
  selector: 'app-editar-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css'
})
export class EditarProducto implements OnInit {

  idProducto!: number;

  productoForm = new FormGroup({
    descripcion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    precio: new FormControl(0, [Validators.required, Validators.min(1)]),
    existencia: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idProducto = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarProducto();
  }

  cargarProducto(): void {
    this.productoService.obtenerPorId(this.idProducto).subscribe({
      next: (producto) => {
        this.productoForm.patchValue({
          descripcion: producto.descripcion,
          precio: producto.precio,
          existencia: producto.existencia,
        });
      },
      error: (err) => {
        console.error('Error al cargar producto:', err);
      }
    });
  }

  guardar(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const productoActualizado = new Producto(
      this.idProducto,
      this.productoForm.value.descripcion!,
      this.productoForm.value.precio!,
      this.productoForm.value.existencia!
    );

    this.productoService.actualizar(this.idProducto, productoActualizado).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al actualizar producto:', err);
      }
    });
  }
}