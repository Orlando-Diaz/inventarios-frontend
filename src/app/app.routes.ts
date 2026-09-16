import { Routes } from '@angular/router';
import { ProductoLista } from './producto-lista/producto-lista';
import { AgregarProducto } from './agregar-producto/agregar-producto';

export const routes: Routes = [
  { path: '', component: ProductoLista },
  { path: 'agregar-producto', component: AgregarProducto }
];