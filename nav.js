/* Shared nav behaviour: hamburger toggle for the mobile dropdown. Include on every page. */
(function () {
  document.querySelectorAll(".nav").forEach(function (nav) {
    var btn = nav.querySelector(".nav__toggle");
    var panel = nav.querySelector(".nav__links");
    if (!btn || !panel) return;
    function close() { panel.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }
    function open() { panel.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); }
    btn.addEventListener("click", function () { panel.classList.contains("is-open") ? close() : open(); });
    panel.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    document.addEventListener("click", function (e) { if (!nav.contains(e.target)) close(); });
  });
})();
