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
      // Let the enter animation run to completion on its own timeline, then clean up
      // the class. Do NOT remove it early (e.g. via requestAnimationFrame) — that's the
      // pattern for triggering CSS *transitions*, not for letting a keyframe *animation*
      // finish. Removing it early cuts the animation off mid-flight and snaps the element
      // to its default state, which reads as a stutter/jump.
      window.addEventListener("pageshow", function () {
        var main = document.querySelector("main");
        var cleanup = function () { document.documentElement.classList.remove("page-enter"); };
        if (main) {
          main.addEventListener("animationend", cleanup, { once: true });
        } else {
          // Fallback if there's no <main> to listen on: match the CSS duration exactly.
          window.setTimeout(cleanup, 420);
        }
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
