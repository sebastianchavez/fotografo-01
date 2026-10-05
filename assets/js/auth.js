/* ============================================================
   Fotógrafo - Auth helpers
   Login, registro, logout, sesión, guards
   ============================================================ */

window.PHOTO_AUTH = (function () {

  function session() { return window.PHOTO_STORE.Session.get(); }
  function isLogged() { return !!session(); }

  function login({ email, password, remember = false }) {
    const u = window.PHOTO_STORE.Users.verify(email, password);
    window.PHOTO_STORE.Session.set(u);
    return u;
  }

  function register({ nombre, email, telefono, aceptaTerminos }) {
    const password = arguments[0].password;
    const u = window.PHOTO_STORE.Users.create({
      nombre, email, password, telefono, aceptaTerminos
    });
    window.PHOTO_STORE.Session.set(u);
    return u;
  }

  function logout() {
    window.PHOTO_STORE.Session.clear();
  }

  function requireAuth(redirectTo) {
    if (!isLogged()) {
      const next = redirectTo || location.pathname.split('/').pop() + location.search;
      location.href = 'login.html?next=' + encodeURIComponent(next);
      return false;
    }
    return true;
  }

  function getNextParam() {
    return new URLSearchParams(location.search).get('next');
  }

  return {
    session, login, register, logout, isLogged,
    requireAuth, getNextParam
  };
})();