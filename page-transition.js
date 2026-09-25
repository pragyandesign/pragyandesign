/* Reliable same-site page transition. Navigation remains a normal URL change,
   so direct links, refresh, browser history, and no-JS access still work. */
(function () {
  "use strict";
  var KEY = "pragyan-page-transition";
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var destination = sessionStorage.getItem(KEY);
  if (destination) {
    sessionStorage.removeItem(KEY);
    if (!reduced) {
      document.documentElement.classList.add("page-enter");
      window.addEventListener("pageshow", function () {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            document.documentElement.classList.remove("page-enter");
          });
        });
      }, { once: true });
    }
  }

  document.addEventListener("click", function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey) return;
    var link = event.target.closest("a[href]");
    if (!link || link.target || link.hasAttribute("download")) return;
    var url;
    try { url = new URL(link.href, location.href); } catch (_) { return; }
    if (url.origin !== location.origin || url.pathname === location.pathname ||
        url.pathname === location.pathname + "/" ||
        url.hash && url.pathname === location.pathname) return;
    if (reduced) return;
    event.preventDefault();
    sessionStorage.setItem(KEY, "1");
    document.documentElement.classList.add("page-exit");
    window.setTimeout(function () { location.href = url.href; }, 160);
  });
})();