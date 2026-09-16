import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Producto } from '../models/Producto';
import { ProductoService } from '../services/productoService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './producto-lista.html',
  styleUrl: './producto-lista.css',
})
export class ProductoLista implements OnInit {

  productos = signal<Producto[]>([]);

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerTodos().subscribe({
      next: (data) => {
        this.productos.set(data);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  eliminar(id: number): void {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmar) return;

    this.productoService.eliminar(id).subscribe({
      next: () => {
        // Actualiza el signal quitando el producto eliminado, sin recargar toda la tabla
        this.productos.update(lista => lista.filter(p => p.idProducto !== id));
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
      }
    });
  }
}