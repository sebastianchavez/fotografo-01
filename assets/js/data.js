/* ============================================================
   Fotógrafo - Catálogo de datos estáticos
   Servicios, paquetes, clases, galería, horarios
   ============================================================ */

window.PHOTO_DATA = (function () {

  const servicios = [
    {
      id: 'bodas',
      nombre: 'Bodas',
      descripcion: 'Cobertura completa del día más importante. Estilo documental con dirección sutil.',
      desde: 1350000,
      img: 'assets/img/service-bodas.jpg',
      destacado: true,
      incluye: ['Ceremonia y recepción', 'Edición profesional', 'Galería privada']
    },
    {
      id: 'retratos',
      nombre: 'Retratos',
      descripcion: 'Sesiones en estudio o exteriores. Iluminación cinematográfica y dirección artística.',
      desde: 225000,
      img: 'assets/img/service-retratos.jpg',
      destacado: false,
      incluye: ['30-60 min de sesión', '10 fotos editadas', 'Resolución alta']
    },
    {
      id: 'eventos',
      nombre: 'Eventos',
      descripcion: 'Cobertura para eventos corporativos, lanzamientos, conferencias y fiestas privadas.',
      desde: 720000,
      img: 'assets/img/service-eventos.jpg',
      destacado: false,
      incluye: ['Cobertura por horas', 'Foto + video opcional', 'Entrega en 72h']
    },
    {
      id: 'producto',
      nombre: 'Producto',
      descripcion: 'Fotografía comercial para catálogos, e-commerce y redes sociales. Fondo blanco o lifestyle.',
      desde: 315000,
      img: 'assets/img/service-producto.jpg',
      destacado: false,
      incluye: ['Estudio con cyclorama', '5 productos incluidos', 'Archivos PSD opcionales']
    },
    {
      id: 'familia',
      nombre: 'Familia',
      descripcion: 'Sesiones naturales en exteriores o en tu hogar. Capturamos la esencia de tu familia.',
      desde: 162000,
      img: 'assets/img/service-familia.jpg',
      destacado: true,
      incluye: ['1h de sesión', '15 fotos editadas', 'Impresión 20x30']
    },
    {
      id: 'maternidad',
      nombre: 'Maternidad',
      descripcion: 'Sesiones íntimas que celebran la espera. Estudio preparado o en tu hogar.',
      desde: 252000,
      img: 'assets/img/service-maternidad.jpg',
      destacado: false,
      incluye: ['1.5h de sesión', 'Vestuario incluido', '12 fotos editadas']
    }
  ];

  const paquetes = {
    bodas: [
      {
        nombre: 'Silver',
        precio: 1350000,
        items: [
          '4 horas de cobertura',
          '200 fotos editadas',
          'Álbum digital privado',
          '1 fotógrafo',
          'Entrega en 2 semanas'
        ],
        cta: 'Reservar Silver'
      },
      {
        nombre: 'Gold',
        precio: 2520000,
        featured: true,
        items: [
          '6 horas de cobertura',
          '400 fotos editadas',
          'Álbum impreso 30x30',
          '2 fotógrafos',
          'Sesión pre-boda incluida',
          'Entrega en 10 días'
        ],
        cta: 'Reservar Gold'
      },
      {
        nombre: 'Platinum',
        precio: 4050000,
        items: [
          '8 horas de cobertura',
          '600 fotos editadas',
          'Álbum premium + video highlight',
          '2 fotógrafos + videograbador',
          'Sesión pre-boda + trash the dress',
          'Entrega express 5 días'
        ],
        cta: 'Reservar Platinum'
      }
    ],
    retratos: [
      { nombre: 'Sesión 30 min', precio: 225000, items: ['30 min de sesión', '10 fotos editadas', 'Galería digital'] },
      { nombre: 'Sesión 1h', precio: 342000, items: ['1h de sesión', '20 fotos editadas', 'Galería digital', 'Asesoría de styling'] },
      { nombre: 'Sesión 2h', precio: 522000, items: ['2h de sesión', '35 fotos editadas', 'Galería digital', 'Cambio de look'] }
    ],
    eventos: [
      { nombre: 'Medio día', precio: 720000, items: ['4 horas', '150 fotos', 'Entrega 72h'] },
      { nombre: 'Día completo', precio: 1260000, items: ['8 horas', '300 fotos', 'Entrega 72h', 'Asistente'] },
      { nombre: 'Corporativo Premium', precio: 1980000, items: ['Cobertura + video', 'Equipo de 2', 'Mismo día'] }
    ],
    producto: [
      { nombre: 'Pack 5', precio: 315000, items: ['5 productos', 'Fondo blanco', '24h entrega'] },
      { nombre: 'Pack 15', precio: 675000, items: ['15 productos', 'Fondo + lifestyle', '48h entrega'] },
      { nombre: 'Pack 30', precio: 1080000, items: ['30 productos', 'Estilo a medida', 'Archivos PSD'] }
    ],
    familia: [
      { nombre: 'Mini', precio: 162000, items: ['30 min', '10 fotos', 'Galería digital'] },
      { nombre: 'Clásica', precio: 288000, items: ['1h', '15 fotos', 'Impresión 20x30'] },
      { nombre: 'Extendida', precio: 432000, items: ['2h', '25 fotos', 'Álbum + impresión'] }
    ],
    maternidad: [
      { nombre: 'Esencial', precio: 252000, items: ['1h estudio', '12 fotos', 'Vestuario 2 cambios'] },
      { nombre: 'Premium', precio: 405000, items: ['1.5h estudio', '20 fotos', 'Vestuario 3 cambios', 'Pareja incluida'] },
      { nombre: 'Hogar', precio: 468000, items: ['2h en tu hogar', '25 fotos', 'Estilo lifestyle'] }
    ]
  };

  const clases = [
    { id: 'c1', nombre: 'Fotografía Básica', dia: 'Lunes',     hora: '18:00', duracion: '2h', precio: 72000,  cupos: 8,  nivel: 'Inicial' },
    { id: 'c2', nombre: 'Iluminación',       dia: 'Miércoles', hora: '19:00', duracion: '2h', precio: 85500,  cupos: 8,  nivel: 'Intermedio' },
    { id: 'c3', nombre: 'Photoshop',         dia: 'Viernes',   hora: '17:00', duracion: '2h', precio: 85500,  cupos: 6,  nivel: 'Intermedio' },
    { id: 'c4', nombre: 'Edición Lightroom', dia: 'Sábado',    hora: '10:00', duracion: '3h', precio: 108000, cupos: 6,  nivel: 'Inicial' },
    { id: 'c5', nombre: 'Retrato Artístico', dia: 'Sábado',    hora: '16:00', duracion: '3h', precio: 126000, cupos: 6,  nivel: 'Avanzado' },
    { id: 'c6', nombre: 'Fotografía Digital', dia: 'Domingo',  hora: '10:00', duracion: '2h', precio: 76500,  cupos: 8,  nivel: 'Inicial' }
  ];

  const galeria = [
    { id: 1,  cat: 'bodas',      src: 'assets/img/service-bodas.jpg' },
    { id: 2,  cat: 'bodas',      src: 'assets/img/gal-1-bodas.jpg' },
    { id: 3,  cat: 'bodas',      src: 'assets/img/gal-2-bodas.jpg' },
    { id: 4,  cat: 'bodas',      src: 'assets/img/gal-3-bodas.jpg' },
    { id: 5,  cat: 'retratos',   src: 'assets/img/service-retratos.jpg' },
    { id: 6,  cat: 'retratos',   src: 'assets/img/gal-5-retratos.jpg' },
    { id: 7,  cat: 'retratos',   src: 'assets/img/gal-6-retratos.jpg' },
    { id: 8,  cat: 'retratos',   src: 'assets/img/gal-7-retratos.jpg' },
    { id: 9,  cat: 'eventos',    src: 'assets/img/service-eventos.jpg' },
    { id: 10, cat: 'eventos',    src: 'assets/img/gal-9-eventos.jpg' },
    { id: 11, cat: 'eventos',    src: 'assets/img/gal-10-eventos.jpg' },
    { id: 12, cat: 'producto',   src: 'assets/img/service-producto.jpg' },
    { id: 13, cat: 'producto',   src: 'assets/img/gal-12-producto.jpg' },
    { id: 14, cat: 'producto',   src: 'assets/img/gal-13-producto.jpg' },
    { id: 15, cat: 'familia',    src: 'assets/img/service-familia.jpg' },
    { id: 16, cat: 'familia',    src: 'assets/img/gal-15-familia.jpg' },
    { id: 17, cat: 'maternidad', src: 'assets/img/service-maternidad.jpg' },
    { id: 18, cat: 'maternidad', src: 'assets/img/gal-17-maternidad.jpg' }
  ];

  const horariosAtencion = [
    { dia: 'Lunes a Viernes', horas: '09:00 - 19:00' },
    { dia: 'Sábado',          horas: '10:00 - 14:00' },
    { dia: 'Domingo',         horas: 'Cerrado' }
  ];

  const testimonios = [
    { nombre: 'María González',  texto: 'Las mejores fotos de boda que pudimos imaginar. Capturó cada emoción del día.', rating: 5 },
    { nombre: 'Carlos Pérez',    texto: 'Contraté el servicio corporativo y los resultados superaron por completo mis expectativas.', rating: 5 },
    { nombre: 'Lucía Hernández', texto: 'La sesión de maternidad fue mágica. Me sentí en confianza todo el tiempo.', rating: 5 },
    { nombre: 'Andrés Ruiz',    texto: 'Profesionalismo y calidez humana. Las fotos de producto elevaron mi marca.', rating: 5 }
  ];

  return { servicios, paquetes, clases, galeria, horariosAtencion, testimonios };
})();