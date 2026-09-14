# Inventarios (Frontend)

Interfaz web desarrollada en Angular para el sistema de control de inventario. Consume la API REST del [backend en Spring Boot](https://github.com/Orlando-Diaz/control-inventario).

## 📋 Descripción

Aplicación frontend que permite visualizar el inventario de productos registrados, consumiendo los datos en tiempo real desde el backend.

## 🛠️ Stack tecnológico

- **Angular 22** (standalone components, Signals)
- **TypeScript**
- **Bootstrap 5.3.8** (vía CDN, con tema oscuro `data-bs-theme="dark"`)
- **RxJS** (manejo de peticiones HTTP asíncronas)

## 📁 Estructura del proyecto

```
inventarios-frontend/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── Producto.ts              # Modelo de datos
│   │   ├── services/
│   │   │   └── productoService.ts       # Servicio HTTP hacia el backend
│   │   ├── producto-lista/
│   │   │   ├── producto-lista.ts        # Lógica del componente
│   │   │   ├── producto-lista.html      # Tabla de productos
│   │   │   └── producto-lista.css
│   │   ├── app.ts                        # Componente raíz
│   │   ├── app.html
│   │   └── app.config.ts                 # Configuración global (HttpClient, etc.)
│   ├── index.html                        # Incluye Bootstrap vía CDN
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
}
```

Corresponde a la entidad `Producto` del backend.

## 🔌 Conexión con el backend

El `ProductoService` (`services/productoService.ts`) centraliza todas las peticiones HTTP hacia la API REST:

| Método del servicio          | Endpoint consumido                          | Descripción                     |
|-------------------------------|----------------------------------------------|----------------------------------|
| `obtenerTodos()`              | `GET /api/productos`                         | Lista todos los productos        |
| `obtenerPorId(id)`            | `GET /api/productos/{id}`                    | Obtiene un producto por id       |
| `crear(producto)`             | `POST /api/productos`                        | Crea un nuevo producto           |
| `actualizar(id, producto)`    | `PUT /api/productos/{id}`                    | Actualiza un producto existente  |
| `eliminar(id)`                | `DELETE /api/productos/{id}`                 | Elimina un producto              |
| `buscarPorDescripcion(desc)`  | `GET /api/productos/buscar?descripcion=X`    | Busca productos por descripción  |

**URL base configurada:** `http://localhost:8080/api/productos`

> ⚠️ El backend debe tener CORS habilitado para `http://localhost:4200` (ya configurado en el proyecto backend).

## 🖥️ Componentes

### `ProductoLista`

Componente principal que muestra el listado de productos en una tabla con estilos de Bootstrap. Usa **Signals** de Angular para manejar el estado reactivo de la lista:

```typescript
productos = signal<Producto[]>([]);
```

Los datos se cargan al inicializar el componente (`ngOnInit`) y se renderizan con la sintaxis moderna de control de flujo `@for` / `@empty`.

## ⚙️ Configuración

### Requisitos previos

- Node.js (LTS recomendado)
- Angular CLI (`npm install -g @angular/cli`)
- Backend corriendo en `http://localhost:8080`

### `HttpClient`

Registrado globalmente en `app.config.ts` mediante `provideHttpClient()`.

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
- [ ] Formulario de creación de productos
- [ ] Formulario de edición de productos
- [ ] Eliminación de productos desde la interfaz
- [ ] Validaciones de formulario
- [ ] Manejo visual de errores (mensajes al usuario)

## 📝 Notas de desarrollo

Este proyecto se documenta progresivamente a medida que se agregan funcionalidades. Los commits siguen la convención [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nueva funcionalidad
- `fix:` corrección de errores
- `docs:` cambios en documentación
- `chore:` tareas de mantenimiento

## 👤 Autor

Orlando Díaz