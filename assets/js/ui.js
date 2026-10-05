/* ============================================================
   Fotógrafo - UI helpers
   Navbar, footer, toast, modal, helpers varios
   ============================================================ */

window.PHOTO_UI = (function () {

  /* ============================================================
     UTILIDADES
     ============================================================ */

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function escapeHTML(str) {
    return String(str ?? '').replace(/[&<>"']/g, s => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[s]));
  }

  function formatMoney(n) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
      .format(Number(n) || 0);
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('es-CL', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  }

  function formatShortDate(iso) {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function todayISO() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }

  function nextDays(n) {
    const arr = [];
    const d = new Date();
    d.setHours(0,0,0,0);
    for (let i = 0; i < n; i++) {
      const x = new Date(d);
      x.setDate(d.getDate() + i);
      arr.push(x.toISOString().slice(0,10));
    }
    return arr;
  }

  function param(name) {
    return new URLSearchParams(location.search).get(name);
  }

  let _revealIO = null;
  function initReveal() {
    if (!_revealIO) {
      _revealIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            _revealIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
    }
    $$('.reveal:not(.is-visible)').forEach(el => _revealIO.observe(el));
  }

  /* ============================================================
     TOAST
     ============================================================ */

  function ensureToastContainer() {
    let c = $('.toast-container');
    if (!c) {
      c = document.createElement('div');
      c.className = 'toast-container';
      document.body.appendChild(c);
    }
    return c;
  }

  function toast(msg, type = 'info', duration = 3500) {
    const c = ensureToastContainer();
    const el = document.createElement('div');
    el.className = 'toast toast-' + type;
    const icons = {
      success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
      error:   '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c0392b" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>',
      info:    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a574" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>'
    };
    el.innerHTML = '<div style="display:flex;align-items:flex-start;gap:0.6rem;">' +
      '<div style="flex-shrink:0;margin-top:2px;">' + (icons[type] || icons.info) + '</div>' +
      '<div style="font-size:0.9rem;line-height:1.4;">' + escapeHTML(msg) + '</div>' +
      '</div>';
    c.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity .3s, transform .3s';
      el.style.opacity = '0';
      el.style.transform = 'translateX(20px)';
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  /* ============================================================
     MODAL
     ============================================================ */

  function modal({ title = '', body = '', footer = '', onConfirm = null, confirmText = 'Confirmar', cancelText = 'Cancelar' }) {
    closeModal();
    const wrap = document.createElement('div');
    wrap.className = 'modal-backdrop';
    wrap.innerHTML =
        '<div class="modal-content" role="dialog" aria-modal="true">' +
        '  <div style="padding:1.5rem 1.5rem 0.5rem;display:flex;justify-content:space-between;align-items:center;">' +
        '    <h3 style="font-family:\'Playfair Display\',serif;font-size:1.35rem;color:var(--hi);">' + escapeHTML(title) + '</h3>' +
        '    <button class="modal-close" aria-label="Cerrar" style="background:none;border:none;color:var(--mut);cursor:pointer;font-size:1.4rem;">×</button>' +
        '  </div>' +
        '  <div style="padding:0.5rem 1.5rem 1.5rem;color:var(--mut);font-size:0.95rem;line-height:1.5;">' + body + '</div>' +
        (footer ? '<div style="padding:1rem 1.5rem;border-top:1px solid var(--line);display:flex;gap:0.75rem;justify-content:flex-end;">' + footer + '</div>' : '') +
        '</div>';
    document.body.appendChild(wrap);

    function close() { closeModal(); }
    wrap.querySelector('.modal-close').addEventListener('click', close);
    wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });

    if (onConfirm) {
      const btns = wrap.querySelectorAll('[data-modal-confirm]');
      btns.forEach(b => b.addEventListener('click', () => {
        Promise.resolve(onConfirm()).catch(err => {
          toast(err.message || 'Error', 'error');
        });
      }));
    }
    document.addEventListener('keydown', escClose);
    function escClose(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escClose); } }

    return { close, el: wrap };
  }

  function confirm({ title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', danger = false }) {
    return new Promise((resolve) => {
      const m = modal({
        title,
        body: '<p>' + escapeHTML(message) + '</p>',
        footer:
          '<button class="btn-ghost" data-modal-cancel>' + escapeHTML(cancelText) + '</button>' +
          '<button class="' + (danger ? 'btn-primary' : 'btn-primary') + '" ' +
          'style="' + (danger ? 'background:#c0392b;color:#fff;' : '') + '" data-modal-confirm>' +
          escapeHTML(confirmText) + '</button>',
        onConfirm: () => { m.close(); }
      });
      m.el.querySelector('[data-modal-cancel]').addEventListener('click', () => { m.close(); resolve(false); });
      m.el.querySelector('[data-modal-confirm]').addEventListener('click', () => { resolve(true); });
    });
  }

  function closeModal() {
    $$('.modal-backdrop').forEach(b => b.remove());
  }

  /* ============================================================
     NAVBAR
     ============================================================ */

  function getCurrentPage() {
    const p = location.pathname.split('/').pop() || 'index.html';
    return p.replace('.html', '');
  }

  function renderNavbar() {
    const slot = $('#navbar-slot');
    if (!slot) return;
    const session = window.PHOTO_AUTH ? window.PHOTO_AUTH.session() : null;
    const cp = getCurrentPage();
    const isAuthPage = ['login', 'registro', 'recuperar'].includes(cp);

    const publicLinks = [
      { href: 'index.html',    label: 'Inicio',    key: 'index' },
      { href: 'servicios.html',label: 'Servicios', key: 'servicios' },
      { href: 'galeria.html',  label: 'Galería',   key: 'galeria' },
      { href: 'precios.html',  label: 'Precios',   key: 'precios' },
      { href: 'clases.html',   label: 'Clases',    key: 'clases' },
      { href: 'contacto.html', label: 'Contacto',  key: 'contacto' }
    ];

    const authLinks = [
      { href: 'index.html',     label: 'Inicio',    key: 'index' },
      { href: 'servicios.html', label: 'Servicios', key: 'servicios' },
      { href: 'galeria.html',   label: 'Galería',   key: 'galeria' },
      { href: 'reservar.html',  label: 'Reservar',  key: 'reservar' },
      { href: 'perfil.html',    label: 'Mi perfil', key: 'perfil' }
    ];

    const links = session ? authLinks : publicLinks;

    let right = '';
    if (session) {
      const ini = (session.nombre || 'U').trim().slice(0, 1).toUpperCase();
      right =
        '<div style="position:relative;">' +
        '  <button id="userMenuBtn" style="display:flex;align-items:center;gap:0.6rem;background:none;border:none;cursor:pointer;color:var(--hi);padding:0.4rem 0.6rem;border-radius:9999px;transition:background 0.2s;" onmouseover="this.style.background=\'var(--soft)\'" onmouseout="this.style.background=\'none\'">' +
        '    <span class="avatar">' + escapeHTML(ini) + '</span>' +
        '    <span style="font-size:0.9rem;" class="hidden sm:inline">' + escapeHTML(session.nombre.split(' ')[0]) + '</span>' +
        '    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>' +
        '  </button>' +
        '  <div id="userMenu" style="display:none;position:absolute;right:0;top:calc(100% + 8px);background:var(--elev);border:1px solid var(--line);border-radius:0.6rem;min-width:200px;padding:0.4rem;box-shadow:0 20px 40px -10px rgba(0,0,0,0.5);z-index:50;">' +
        '    <a href="perfil.html" style="display:block;padding:0.6rem 0.8rem;color:var(--hi);font-size:0.9rem;border-radius:0.4rem;" onmouseover="this.style.background=\'var(--soft)\'" onmouseout="this.style.background=\'none\'">Mi perfil</a>' +
        '    <a href="perfil.html#reservas" style="display:block;padding:0.6rem 0.8rem;color:var(--hi);font-size:0.9rem;border-radius:0.4rem;" onmouseover="this.style.background=\'var(--soft)\'" onmouseout="this.style.background=\'none\'">Mis reservas</a>' +
        '    <div style="height:1px;background:var(--line);margin:0.4rem 0;"></div>' +
        '    <button id="logoutBtn" style="display:block;width:100%;text-align:left;padding:0.6rem 0.8rem;color:#e57268;font-size:0.9rem;background:none;border:none;cursor:pointer;border-radius:0.4rem;" onmouseover="this.style.background=\'var(--soft)\'" onmouseout="this.style.background=\'none\'">Cerrar sesión</button>' +
        '  </div>' +
        '</div>';
    } else if (!isAuthPage) {
      right =
        '<a href="login.html" class="btn-ghost hidden sm:inline-flex">Ingresar</a>' +
        '<a href="registro.html" class="btn-primary" style="padding:0.55rem 1.25rem;font-size:0.9rem;">Registrarse</a>';
    } else {
      right = '<a href="index.html" class="btn-ghost">← Inicio</a>';
    }

    slot.innerHTML =
      '<header style="position:sticky;top:0;z-index:60;background:rgba(11,11,12,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(42,42,50,0.6);">' +
      '  <div class="container-narrow" style="display:flex;align-items:center;justify-content:space-between;height:4rem;">' +
      '    <a href="index.html" class="logo-mark">' +
      '      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--gold)">' +
      '        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 12h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>' +
      '        <circle cx="12" cy="13" r="4"/>' +
      '      </svg>' +
      '      <span>Lumière<span style="color:var(--gold)">.</span></span>' +
      '    </a>' +
      '    <nav class="hidden md:flex" style="gap:2rem;">' +
      links.map(l => '<a href="' + l.href + '" class="nav-link ' + (cp === l.key ? 'active' : '') + '">' + l.label + '</a>').join('') +
      '    </nav>' +
      '    <div style="display:flex;align-items:center;gap:0.5rem;">' +
      '      <button id="mobileBtn" class="md:hidden" style="background:none;border:none;color:var(--hi);cursor:pointer;padding:0.5rem;" aria-label="Menú">' +
      '        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
      '      </button>' +
      right +
      '    </div>' +
      '  </div>' +
      '</header>' +
      '<div id="mobileMenu" class="mobile-menu" style="display:none;">' +
      '  <button id="mobileClose" style="position:absolute;top:1.2rem;right:1.5rem;background:none;border:none;color:var(--hi);font-size:1.5rem;cursor:pointer;">×</button>' +
      links.map(l => '<a href="' + l.href + '" onclick="document.getElementById(\'mobileMenu\').style.display=\'none\'">' + l.label + '</a>').join('') +
      (session
        ? '<button id="mobileLogout" style="margin-top:1rem;padding:0.9rem 0;border:none;background:none;color:#e57268;font-size:1.1rem;text-align:left;cursor:pointer;border-bottom:1px solid var(--line);">Cerrar sesión</button>'
        : '<a href="login.html" onclick="document.getElementById(\'mobileMenu\').style.display=\'none\'">Ingresar</a>' +
          '<a href="registro.html" onclick="document.getElementById(\'mobileMenu\').style.display=\'none\'" style="color:var(--gold);">Crear cuenta</a>') +
      '</div>';

    const mbtn = $('#mobileBtn');
    const mmenu = $('#mobileMenu');
    const mclose = $('#mobileClose');
    if (mbtn) mbtn.addEventListener('click', () => { mmenu.style.display = 'flex'; });
    if (mclose) mclose.addEventListener('click', () => { mmenu.style.display = 'none'; });

    const logoutBtns = [$('#logoutBtn'), $('#mobileLogout')].filter(Boolean);
    logoutBtns.forEach(b => b.addEventListener('click', () => {
      window.PHOTO_AUTH.logout();
      toast('Sesión cerrada', 'info');
      setTimeout(() => location.href = 'index.html', 600);
    }));

    const userBtn = $('#userMenuBtn');
    const userMenu = $('#userMenu');
    if (userBtn && userMenu) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
      });
      document.addEventListener('click', () => { userMenu.style.display = 'none'; });
      userMenu.addEventListener('click', e => e.stopPropagation());
    }
  }

  /* ============================================================
     FOOTER
     ============================================================ */

  function renderFooter() {
    const slot = $('#footer-slot');
    if (!slot) return;
    slot.innerHTML =
      '<footer style="background:#07070a;border-top:1px solid var(--line);padding:4rem 0 2rem;">' +
      '  <div class="container-narrow">' +
      '    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:3rem 2rem;">' +
      '      <div>' +
      '        <a href="index.html" class="logo-mark" style="font-size:1.3rem;">' +
      '          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--gold)">' +
      '            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 12h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>' +
      '            <circle cx="12" cy="13" r="4"/>' +
      '          </svg>' +
      '          <span>Lumière<span style="color:var(--gold)">.</span></span>' +
      '        </a>' +
      '        <p style="color:var(--mut);font-size:0.9rem;line-height:1.6;margin-top:1rem;max-width:280px;">Estudio de fotografía especializado en bodas, retratos y contenido comercial.</p>' +
      '      </div>' +
      '      <div>' +
      '        <h4 style="color:var(--hi);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:1rem;">Navegación</h4>' +
      '        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.6rem;">' +
      '          <li><a href="servicios.html" style="color:var(--mut);font-size:0.9rem;">Servicios</a></li>' +
      '          <li><a href="galeria.html" style="color:var(--mut);font-size:0.9rem;">Galería</a></li>' +
      '          <li><a href="precios.html" style="color:var(--mut);font-size:0.9rem;">Precios</a></li>' +
      '          <li><a href="clases.html" style="color:var(--mut);font-size:0.9rem;">Clases</a></li>' +
      '          <li><a href="contacto.html" style="color:var(--mut);font-size:0.9rem;">Contacto</a></li>' +
      '        </ul>' +
      '      </div>' +
      '      <div>' +
      '        <h4 style="color:var(--hi);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:1rem;">Contacto</h4>' +
      '        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.6rem;color:var(--mut);font-size:0.9rem;">' +
      '          <li>Av. Apoquindo 4501, Las Condes</li>' +
      '          <li>+56 2 2345 6789</li>' +
      '          <li>hola@lumiere.cl</li>' +
      '        </ul>' +
      '      </div>' +
      '      <div>' +
      '        <h4 style="color:var(--hi);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:1rem;">Síguenos</h4>' +
      '        <div style="display:flex;gap:0.6rem;">' +
      '          <a href="#" aria-label="Instagram" style="width:38px;height:38px;background:var(--soft);border:1px solid var(--line);border-radius:0.5rem;display:inline-flex;align-items:center;justify-content:center;color:var(--hi);transition:all 0.2s;" onmouseover="this.style.borderColor=\'var(--gold)\';this.style.color=\'var(--gold)\'" onmouseout="this.style.borderColor=\'var(--line)\';this.style.color=\'var(--hi)\'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></svg></a>' +
      '          <a href="#" aria-label="Facebook" style="width:38px;height:38px;background:var(--soft);border:1px solid var(--line);border-radius:0.5rem;display:inline-flex;align-items:center;justify-content:center;color:var(--hi);transition:all 0.2s;" onmouseover="this.style.borderColor=\'var(--gold)\';this.style.color=\'var(--gold)\'" onmouseout="this.style.borderColor=\'var(--line)\';this.style.color=\'var(--hi)\'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>' +
      '          <a href="#" aria-label="Pinterest" style="width:38px;height:38px;background:var(--soft);border:1px solid var(--line);border-radius:0.5rem;display:inline-flex;align-items:center;justify-content:center;color:var(--hi);transition:all 0.2s;" onmouseover="this.style.borderColor=\'var(--gold)\';this.style.color=\'var(--gold)\'" onmouseout="this.style.borderColor=\'var(--line)\';this.style.color=\'var(--hi)\'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12s1.5 4 4 4 4-4 4-4-1.5-4-4-4-4 4-4 4zM12 8v8"/></svg></a>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '    <div style="border-top:1px solid var(--line);margin-top:3rem;padding-top:1.5rem;display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem;color:var(--mut);font-size:0.85rem;">' +
      '      <div>© ' + new Date().getFullYear() + ' Lumière Studio. Todos los derechos reservados.</div>' +
      '      <div style="display:flex;gap:1.5rem;flex-wrap:wrap;">' +
      '        <a href="terminos.html" style="color:var(--mut);">Términos</a>' +
      '        <a href="privacidad.html" style="color:var(--mut);">Privacidad</a>' +
      '        <a href="contacto.html" style="color:var(--mut);">Contacto</a>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</footer>';
  }

  /* ============================================================
     INIT
     ============================================================ */

  function init() {
    renderNavbar();
    renderFooter();
    initReveal();
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    $, $$, escapeHTML, formatMoney, formatShortDate, formatDate,
    todayISO, nextDays, param,
    toast, modal, confirm, closeModal,
    renderNavbar, renderFooter, init, initReveal
  };
})();