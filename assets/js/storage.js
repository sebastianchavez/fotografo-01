/* ============================================================
   Fotógrafo - Storage helpers (LocalStorage)
   CRUD de usuarios y reservas (estado: asistencia)
   ============================================================ */

window.PHOTO_STORE = (function () {

  const KEYS = {
    USERS:   'photoStudio_users',
    SESSION: 'photoStudio_currentUser',
    RESERVAS:'photoStudio_reservas'
  };

  // --------- Utilidades internas ---------
  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); }
    catch (e) { return null; }
  }
  function write(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  function uid(prefix = 'id') {
    return prefix + '_' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
  }
  function nextReservaId(reservas) {
    const ids = Object.keys(reservas || {});
    let max = 0;
    ids.forEach(k => {
      const n = parseInt(String(k).replace(/\D/g, ''), 10);
      if (!isNaN(n) && n > max) max = n;
    });
    return 'RES-' + String(max + 1).padStart(6, '0');
  }

  // --------- Usuarios ---------
  const Users = {
    all() { return read(KEYS.USERS) || {}; },
    findByEmail(email) {
      const all = Users.all();
      const e = String(email || '').trim().toLowerCase();
      return Object.values(all).find(u => u.email === e) || null;
    },
    create({ nombre, email, password, telefono, aceptaTerminos }) {
      const e = String(email || '').trim().toLowerCase();
      if (!nombre || !e || !password) throw new Error('Faltan datos obligatorios');
      if (Users.findByEmail(e)) throw new Error('Ya existe una cuenta con ese email');
      if (String(password).length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres');
      const all = Users.all();
      const id = uid('usr');
      const user = {
        id, nombre: nombre.trim(), email: e,
        password: String(password),
        telefono: telefono || '',
        aceptaTerminos: !!aceptaTerminos,
        creado: new Date().toISOString()
      };
      all[id] = user;
      write(KEYS.USERS, all);
      return user;
    },
    verify(email, password) {
      const u = Users.findByEmail(email);
      if (!u) throw new Error('No existe una cuenta con ese email');
      if (u.password !== String(password)) throw new Error('Contraseña incorrecta');
      return u;
    },
    update(id, patch) {
      const all = Users.all();
      if (!all[id]) throw new Error('Usuario no encontrado');
      all[id] = { ...all[id], ...patch, actualizado: new Date().toISOString() };
      write(KEYS.USERS, all);
      // Reflejar en sesión si coincide
      const s = Session.get();
      if (s && s.id === id) Session.set({ id, nombre: all[id].nombre, email: all[id].email });
      return all[id];
    }
  };

  // --------- Sesión ---------
  const Session = {
    get() { return read(KEYS.SESSION); },
    set(user) {
      write(KEYS.SESSION, { id: user.id, nombre: user.nombre, email: user.email });
    },
    clear() { localStorage.removeItem(KEYS.SESSION); },
    isLogged() { return !!Session.get(); }
  };

  // --------- Reservas ---------
  const Reservas = {
    all() { return read(KEYS.RESERVAS) || {}; },
    list() {
      const all = Reservas.all();
      return Object.values(all).sort((a, b) => (b.creado || '').localeCompare(a.creado || ''));
    },
    byUser(userId) {
      return Reservas.list().filter(r => r.userId === userId);
    },
    byId(id) {
      const all = Reservas.all();
      return all[id] || null;
    },
    create(data) {
      const all = Reservas.all();
      const id = nextReservaId(all);
      const reserva = {
        id,
        userId: data.userId,
        servicioId: data.servicioId,
        servicio: data.servicio,
        paquete: data.paquete,
        fecha: data.fecha,
        hora: data.hora,
        duracion: data.duracion || '',
        lugar: data.lugar,
        direccion: data.direccion || '',
        precio: Number(data.precio) || 0,
        notas: data.notas || '',
        contacto: data.contacto || {},
        pago: null,
        estado: 'pendiente',
        creado: new Date().toISOString(),
        actualizado: new Date().toISOString()
      };
      all[id] = reserva;
      write(KEYS.RESERVAS, all);
      return reserva;
    },
    update(id, patch) {
      const all = Reservas.all();
      if (!all[id]) throw new Error('Reserva no encontrada');
      all[id] = { ...all[id], ...patch, actualizado: new Date().toISOString() };
      write(KEYS.RESERVAS, all);
      return all[id];
    },
    remove(id) {
      const all = Reservas.all();
      delete all[id];
      write(KEYS.RESERVAS, all);
    },
    setPago(id, pago) {
      const r = Reservas.byId(id);
      if (!r) throw new Error('Reserva no encontrada');
      return Reservas.update(id, { pago, estado: 'confirmada' });
    },
    cancelar(id, motivo = '') {
      return Reservas.update(id, { estado: 'cancelada', canceladaEn: new Date().toISOString(), motivoCancelacion: motivo });
    }
  };

  return { Users, Session, Reservas };
})();