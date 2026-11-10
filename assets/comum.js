/* Ferramentas: tema claro/escuro compartilhado.
   Carregue no <head>, sem defer, para o tema salvo ser aplicado antes da página aparecer. */
(function () {
  var KEY = 'tema', root = document.documentElement;

  function lerSalvo() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function gravar(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var salvo = lerSalvo();
  if (salvo === 'light' || salvo === 'dark') root.setAttribute('data-theme', salvo);

  function efetivo() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function rotular(btn) {
    var escuro = efetivo() === 'dark';
    btn.textContent = escuro ? '☀ Tema claro' : '☾ Tema escuro';
    btn.setAttribute('aria-label', escuro ? 'Mudar para o tema claro' : 'Mudar para o tema escuro');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('themeBtn');
    if (!btn) return;
    rotular(btn);
    btn.addEventListener('click', function () {
      var prox = efetivo() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', prox);
      gravar(prox);
      rotular(btn);
    });
  });
})();
