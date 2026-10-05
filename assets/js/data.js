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
      desde: 1500,
      img: 'assets/img/service-bodas.jpg',
      destacado: true,
      incluye: ['Ceremonia y recepción', 'Edición profesional', 'Galería privada']
    },
    {
      id: 'retratos',
      nombre: 'Retratos',
      descripcion: 'Sesiones en estudio o exteriores. Iluminación cinematográfica y dirección artística.',
      desde: 250,
      img: 'assets/img/service-retratos.jpg',
      destacado: false,
      incluye: ['30-60 min de sesión', '10 fotos editadas', 'Resolución alta']
    },
    {
      id: 'eventos',
      nombre: 'Eventos',
      descripcion: 'Cobertura para eventos corporativos, lanzamientos, conferencias y fiestas privadas.',
      desde: 800,
      img: 'assets/img/service-eventos.jpg',
      destacado: false,
      incluye: ['Cobertura por horas', 'Foto + video opcional', 'Entrega en 72h']
    },
    {
      id: 'producto',
      nombre: 'Producto',
      descripcion: 'Fotografía comercial para catálogos, e-commerce y redes sociales. Fondo blanco o lifestyle.',
      desde: 350,
      img: 'assets/img/service-producto.jpg',
      destacado: false,
      incluye: ['Estudio con cyclorama', '5 productos incluidos', 'Archivos PSD opcionales']
    },
    {
      id: 'familia',
      nombre: 'Familia',
      descripcion: 'Sesiones naturales en exteriores o en tu hogar. Capturamos la esencia de tu familia.',
      desde: 180,
      img: 'assets/img/service-familia.jpg',
      destacado: true,
      incluye: ['1h de sesión', '15 fotos editadas', 'Impresión 20x30']
    },
    {
      id: 'maternidad',
      nombre: 'Maternidad',
      descripcion: 'Sesiones íntimas que celebran la espera. Estudio preparado o en tu hogar.',
      desde: 280,
      img: 'assets/img/service-maternidad.jpg',
      destacado: false,
      incluye: ['1.5h de sesión', 'Vestuario incluido', '12 fotos editadas']
    }
  ];

  const paquetes = {
    bodas: [
      {
        nombre: 'Silver',
        precio: 1500,
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
        precio: 2800,
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
        precio: 4500,
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
      { nombre: 'Sesión 30 min', precio: 250, items: ['30 min de sesión', '10 fotos editadas', 'Galería digital'] },
      { nombre: 'Sesión 1h', precio: 380, items: ['1h de sesión', '20 fotos editadas', 'Galería digital', 'Asesoría de styling'] },
      { nombre: 'Sesión 2h', precio: 580, items: ['2h de sesión', '35 fotos editadas', 'Galería digital', 'Cambio de look'] }
    ],
    eventos: [
      { nombre: 'Medio día', precio: 800, items: ['4 horas', '150 fotos', 'Entrega 72h'] },
      { nombre: 'Día completo', precio: 1400, items: ['8 horas', '300 fotos', 'Entrega 72h', 'Asistente'] },
      { nombre: 'Corporativo Premium', precio: 2200, items: ['Cobertura + video', 'Equipo de 2', 'Mismo día'] }
    ],
    producto: [
      { nombre: 'Pack 5', precio: 350, items: ['5 productos', 'Fondo blanco', '24h entrega'] },
      { nombre: 'Pack 15', precio: 750, items: ['15 productos', 'Fondo + lifestyle', '48h entrega'] },
      { nombre: 'Pack 30', precio: 1200, items: ['30 productos', 'Estilo a medida', 'Archivos PSD'] }
    ],
    familia: [
      { nombre: 'Mini', precio: 180, items: ['30 min', '10 fotos', 'Galería digital'] },
      { nombre: 'Clásica', precio: 320, items: ['1h', '15 fotos', 'Impresión 20x30'] },
      { nombre: 'Extendida', precio: 480, items: ['2h', '25 fotos', 'Álbum + impresión'] }
    ],
    maternidad: [
      { nombre: 'Esencial', precio: 280, items: ['1h estudio', '12 fotos', 'Vestuario 2 cambios'] },
      { nombre: 'Premium', precio: 450, items: ['1.5h estudio', '20 fotos', 'Vestuario 3 cambios', 'Pareja incluida'] },
      { nombre: 'Hogar', precio: 520, items: ['2h en tu hogar', '25 fotos', 'Estilo lifestyle'] }
    ]
  };

  const clases = [
    { id: 'c1', nombre: 'Fotografía Básica', dia: 'Lunes',     hora: '18:00', duracion: '2h', precio: 80,  cupos: 8,  nivel: 'Inicial' },
    { id: 'c2', nombre: 'Iluminación',       dia: 'Miércoles', hora: '19:00', duracion: '2h', precio: 95,  cupos: 8,  nivel: 'Intermedio' },
    { id: 'c3', nombre: 'Photoshop',         dia: 'Viernes',   hora: '17:00', duracion: '2h', precio: 95,  cupos: 6,  nivel: 'Intermedio' },
    { id: 'c4', nombre: 'Edición Lightroom', dia: 'Sábado',    hora: '10:00', duracion: '3h', precio: 120, cupos: 6,  nivel: 'Inicial' },
    { id: 'c5', nombre: 'Retrato Artístico', dia: 'Sábado',    hora: '16:00', duracion: '3h', precio: 140, cupos: 6,  nivel: 'Avanzado' },
    { id: 'c6', nombre: 'Fotografía Digital', dia: 'Domingo',  hora: '10:00', duracion: '2h', precio: 85,  cupos: 8,  nivel: 'Inicial' }
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