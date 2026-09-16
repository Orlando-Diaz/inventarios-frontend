# Inventarios (Frontend)

Interfaz web desarrollada en Angular para el sistema de control de inventario. Consume la API REST del [backend en Spring Boot](https://github.com/Orlando-Diaz/control-inventario).

## 📋 Descripción

Aplicación frontend que permite gestionar el inventario de productos: listar, buscar, crear, editar y eliminar, consumiendo los datos en tiempo real desde el backend.

## 🛠️ Stack tecnológico

- **Angular 22** (standalone components, Signals)
- **TypeScript**
- **Bootstrap 5.3.8** (vía CDN, con tema oscuro `data-bs-theme="dark"`)
- **RxJS** (manejo de peticiones HTTP asíncronas)
- **Reactive Forms** (formularios de crear/editar)
- **Angular Router** (navegación entre vistas)

## 📁 Estructura del proyecto

```
inventarios-frontend/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── Producto.ts                  # Modelo de datos
│   │   ├── services/
│   │   │   └── productoService.ts           # Servicio HTTP hacia el backend
│   │   ├── producto-lista/
│   │   │   ├── producto-lista.ts            # Listado, búsqueda y eliminación
│   │   │   ├── producto-lista.html
│   │   │   └── producto-lista.css
│   │   ├── agregar-producto/
│   │   │   ├── agregar-producto.ts          # Formulario de creación
│   │   │   ├── agregar-producto.html
│   │   │   └── agregar-producto.css
│   │   ├── editar-producto/
│   │   │   ├── editar-producto.ts           # Formulario de edición (pre-cargado)
│   │   │   ├── editar-producto.html
│   │   │   └── editar-producto.css
│   │   ├── app.ts                            # Componente raíz (navbar + router-outlet)
│   │   ├── app.html
│   │   ├── app.routes.ts                     # Definición de rutas
│   │   └── app.config.ts                     # Configuración global (HttpClient, Router)
│   ├── index.html                            # Incluye Bootstrap vía CDN
│   └── styles.css
├── angular.json
└── package.json
```

## 🗃️ Modelo de datos

### Producto (`models/Producto.ts`)

```typescript
export class Producto {
  idProducto: number;
  descripcion: string;
  precio: number;
  existencia: number;

  constructor(idProducto = 0, descripcion = '', precio = 0, existencia = 0) {
    this.idProducto = idProducto;
    this.descripcion = descripcion;
    this.precio = precio;
    this.existencia = existencia;
  }
}
```

Corresponde a la entidad `Producto` del backend.

## 🔌 Conexión con el backend

El `ProductoService` (`services/productoService.ts`) centraliza todas las peticiones HTTP hacia la API REST:

| Método del servicio          | Endpoint consumido                          | Usado en                        |
|-------------------------------|----------------------------------------------|----------------------------------|
| `obtenerTodos()`              | `GET /api/productos`                         | Listado inicial                  |
| `obtenerPorId(id)`            | `GET /api/productos/{id}`                    | Edición y búsqueda por id        |
| `crear(producto)`             | `POST /api/productos`                        | Formulario "Agregar producto"    |
| `actualizar(id, producto)`    | `PUT /api/productos/{id}`                    | Formulario "Editar producto"     |
| `eliminar(id)`                | `DELETE /api/productos/{id}`                 | Botón "Eliminar" en la tabla     |
| `buscarPorDescripcion(desc)`  | `GET /api/productos/buscar?descripcion=X`    | Búsqueda por texto               |

**URL base configurada:** `http://localhost:8080/api/productos`

> ⚠️ El backend debe tener CORS habilitado para `http://localhost:4200` (ya configurado en el proyecto backend).

## 🖥️ Componentes y rutas

| Ruta                        | Componente        | Descripción                                    |
|------------------------------|--------------------|-------------------------------------------------|
| `/`                          | `ProductoLista`    | Tabla de productos, búsqueda, editar y eliminar |
| `/agregar-producto`          | `AgregarProducto`  | Formulario para crear un producto nuevo         |
| `/editar-producto/:id`       | `EditarProducto`   | Formulario pre-cargado para editar un producto  |

### `ProductoLista`

Componente principal. Usa **Signals** para el estado reactivo de la lista:

```typescript
productos = signal<Producto[]>([]);
```

Funcionalidades:
- **Listado:** carga todos los productos al inicializar (`ngOnInit`)
- **Búsqueda:** input que detecta automáticamente si el término ingresado es numérico (busca por id) o texto (busca por descripción, sin distinguir mayúsculas/minúsculas)
- **Eliminar:** con confirmación (`confirm()`), actualiza el signal localmente tras eliminar (`productos.update(...)`), sin necesidad de recargar toda la lista desde el backend

### `AgregarProducto` y `EditarProducto`

Ambos usan **Reactive Forms** (`FormGroup` + `FormControl`) con validaciones:
- `descripcion`: requerida, mínimo 3 caracteres
- `precio`: requerido, mayor a 0
- `existencia`: requerida, no negativa

`EditarProducto` además obtiene el `id` desde la URL (`ActivatedRoute`) y precarga el formulario con `patchValue()` a partir de los datos actuales del producto.

## ⚙️ Configuración

### Requisitos previos

- Node.js (LTS recomendado)
- Angular CLI (`npm install -g @angular/cli`)
- Backend corriendo en `http://localhost:8080`

### `HttpClient` y `Router`

Registrados globalmente en `app.config.ts` mediante `provideHttpClient()` y `provideRouter(routes)`.

## 🚀 Cómo ejecutar el proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Orlando-Diaz/inventarios-frontend.git
   cd inventarios-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Asegúrate de que el backend esté corriendo en `http://localhost:8080`.

4. Levanta el servidor de desarrollo:
   ```bash
   ng serve -o
   ```

5. La aplicación se abrirá en `http://localhost:4200`.

## 🔗 Proyecto relacionado

- Backend (Spring Boot): [control-inventario](https://github.com/Orlando-Diaz/control-inventario)

## 🗺️ Roadmap

- [x] Proyecto inicial con Angular CLI
- [x] Integración de Bootstrap (tema oscuro)
- [x] Modelo `Producto`
- [x] `ProductoService` con métodos CRUD
- [x] Listado de productos consumiendo la API real (con Signals)
- [x] Navbar y configuración de rutas (Angular Router)
- [x] Formulario de creación de productos (Reactive Forms)
- [x] Formulario de edición de productos (pre-cargado)
- [x] Eliminación de productos desde la interfaz
- [x] Búsqueda de productos por id o descripción
- [ ] Refrescar la lista automáticamente al crear un producto (actualmente requiere recargar)
- [ ] Mensajes visuales de éxito/error (actualmente solo en consola)
- [ ] Loading spinners durante las peticiones

## 📝 Notas de desarrollo

Este proyecto se documenta progresivamente a medida que se agregan funcionalidades. Los commits siguen la convención [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nueva funcionalidad
- `fix:` corrección de errores
- `docs:` cambios en documentación
- `chore:` tareas de mantenimiento

## 👤 Autor

Orlando Díaz