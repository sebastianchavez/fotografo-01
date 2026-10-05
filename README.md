# Lumière · Fotógrafo Profesional

Sitio web estático para una empresa de fotografía (bodas, retratos, eventos, producto, familia, maternidad) que ofrece reservas online, galería, paquetes, clases y panel de cliente.

## Stack

- HTML5 + CSS3 + JavaScript vanilla (sin frameworks, sin build step)
- Persistencia en `localStorage` (usuarios, sesión, reservas, pagos)
- Imágenes servidas (todo el contenido está dentro de la carpeta del proyecto)

## Estructura

```
fotografo-01/
├── index.html              Landing con servicios destacados y galería preview
├── servicios.html          Catálogo completo de servicios
├── galeria.html            Galería con filtros por categoría
├── precios.html            Paquetes y FAQ
├── clases.html             Catálogo de clases + inscripción
├── reservar.html           Wizard de reserva (servicio → paquete → fecha/hora → lugar)
├── reserva-detalle.html    Detalle de una reserva (pagar / cancelar)
├── pago.html               Simulación de pago
├── pago-confirmacion.html  Confirmación de pago
├── confirmacion.html       Confirmación final de reserva
├── contacto.html           Layar de contacto
├── login.html / registro.html / recuperar.html   Autenticación
├── perfil.html             Panel del cliente (datos + reservas)
├── terminos.html / privacidad.html              Páginas legales
└── assets/
    ├── css/styles.css      Estilos globales y sistema de diseño
    ├── js/
    │   ├── data.js         Catálogo estático (window.PHOTO_DATA)
    │   ├── storage.js      Lógica de localStorage (window.PHOTO_STORE)
    │   ├── auth.js         Sesión y autenticación (window.PHOTO_AUTH)
    │   └── ui.js           Helpers UI: navbar, footer, reveal, toast, modal
    └── img/                Imágenes locales (servicios, galería, hero)
```

## Cómo abrir

Opción A — directo: doble clic en `index.html`. Funciona, salvo que algunos navegadores bloquean recursos cuando se abre por `file://`.

Opción B — servidor local (recomendado):

```bash
# Python 3
python -m http.server 8080

# Node (con npx)
npx serve .

# PHP
php -S localhost:8080
```

Luego abrir `http://localhost:8080`.

## Cómo personalizar

### Cambiar servicios, paquetes, galería, clases, testimonios

Editar `assets/js/data.js`. Estructura del objeto `window.PHOTO_DATA`:

```js
{
  servicios:       [{ id, nombre, descripcion, desde, img, destacado, incluye }],
  paquetes:        { <servicioId>: [{ nombre, precio, items, featured? }] },
  clases:          [{ id, nombre, dia, hora, duracion, precio, cupos, nivel }],
  galeria:         [{ id, cat, src }],
  horariosAtencion:[{ dia, horas }],
  testimonios:     [{ nombre, texto, rating }]
}
```

### Cambiar imágenes

Las imágenes viven en `assets/img/`. Reemplazar los archivos conservando los nombres:

- `service-<id>.jpg` — imágenes de tarjeta de servicio (id: bodas, retratos, eventos, producto, familia, maternidad)
- `gal-<n>-<cat>.jpg` — imágenes adicionales de la galería
- `hero.jpg` y `hero-bg.jpg` — portada del index

Conviene usar JPG optimizados (900–1200 px de ancho, q=80).

### Cambiar textos y secciones

Cada HTML es autocontenido (CSS en `assets/css/styles.css`, JS inline al final del body). Las variables de diseño están en `:root` dentro de `styles.css` (colores, tipografías, radios, espaciados).

### Cambiar branding / colores

En `assets/css/styles.css`, sección `:root`:

```css
:root {
  --base, --elev, --soft, --line, --mut, --hi, --gold, --danger
}
```

## Funcionalidades implementadas

- Catálogo de servicios con destacados y "Ver más"
- Galería con filtros por categoría (todas, bodas, retratos, eventos, producto, familia, maternidad)
- Wizard de reserva en 3 pasos (servicio + paquete + fecha/hora/lugar)
- Registro / login / recuperación de contraseña (mock, persiste en localStorage)
- Sesión persistente y navbar dinámica según auth
- Reserva, pago simulado, cancelación
- Panel de cliente con tabs (reservas / datos)
- Inscripción a clases
- Toasts y modales reutilizables (`window.PHOTO_UI.toast`, `window.PHOTO_UI.modal`)
- Reveal-on-scroll con `IntersectionObserver`
- Responsive (mobile-first)

## Notas técnicas

- Las contraseñas y datos de usuario son mocks en `localStorage`. No usar en producción tal cual: cualquier usuario con DevTools puede leer/escribir la store.
- El pago es simulado (no hay integración real con pasarela).
- La galería preview del index muestra las primeras 6 imágenes de `data.js` (`galeria.slice(0, 6)`).
- Las animaciones de aparición usan la clase `.reveal` (opacity 0 → 1 al entrar en viewport). El observer está en `ui.js → initReveal()`; si se inyecta contenido dinámico después del load, hay que llamar a `window.PHOTO_UI.initReveal()` para registrar los nuevos elementos.