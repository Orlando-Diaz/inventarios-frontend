import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Producto } from '../models/Producto';
import { ProductoService } from '../services/productoService';

@Component({
  selector: 'app-producto-lista',
  imports: [CurrencyPipe],
  templateUrl: './producto-lista.html',
  styleUrl: './producto-lista.css'
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
}