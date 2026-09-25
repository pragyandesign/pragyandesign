(function () {
  var doc = document.documentElement;
  doc.classList.remove("no-js"); doc.classList.add("js");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- hero: split the title into per-character spans, then reveal ----------
  document.querySelectorAll(".sa-title[data-split]").forEach(function (el) {
    var text = el.textContent;
    el.textContent = "";
    text.split("").forEach(function (ch, i) {
      var wrap = document.createElement("span"); wrap.className = "ch"; wrap.style.setProperty("--i", i);
      var inner = document.createElement("i"); inner.textContent = ch === " " ? "\u00A0" : ch;
      wrap.appendChild(inner); el.appendChild(wrap);
    });
  });
  requestAnimationFrame(function () { requestAnimationFrame(function () { doc.classList.add("is-loaded"); }); });

  // ---------- reveal on scroll ----------
  var targets = document.querySelectorAll("[data-sr]");
  if ("IntersectionObserver" in window && targets.length && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  }

  // ---------- process cards: sticky-stack as the next one arrives, same effect as the branding template ----------
  var cards = document.querySelectorAll(".sa-pcard");
  if (cards.length && !reduced) {
    function updateStack() {
      var vh = window.innerHeight;
      cards.forEach(function (card, i) {
        var next = cards[i + 1];
        if (!next) return;
        var nextTop = next.getBoundingClientRect().top;
        var start = vh, end = 84 + i * 18;
        var t = 1 - Math.max(0, Math.min(1, (nextTop - end) / (start - end)));
        card.style.setProperty("--dim", t.toFixed(3));
        card.style.transform = "scale(" + (1 - t * 0.05).toFixed(3) + ")";
      });
    }
    document.addEventListener("scroll", updateStack, { passive: true });
    window.addEventListener("resize", updateStack);
    updateStack();
  }

  // ---------- palette swatches: expand on click, copy hex from the code chip ----------
  var swatches = document.querySelectorAll(".sa-sw");
  swatches.forEach(function (sw) {
    sw.addEventListener("click", function () {
      swatches.forEach(function (o) { o.setAttribute("aria-expanded", String(o === sw)); });
      var hex = sw.dataset.hex, toast = sw.querySelector(".sa-sw__toast");
      if (navigator.clipboard) navigator.clipboard.writeText(hex).catch(function () {});
      if (toast) { toast.textContent = "Copied " + hex; toast.classList.add("on"); setTimeout(function () { toast.classList.remove("on"); }, 1200); }
    });
  });

  // ---------- visual identity: autoplaying loop, no clicking required ----------
  var stage = document.querySelector(".sa-stage");
  if (stage) {
    var frames = stage.querySelectorAll(".sa-frame");
    var dots = document.querySelectorAll(".sa-dots i");
    var i = 0;
    function show(n) {
      frames.forEach(function (f, k) { f.classList.toggle("is-active", k === n); });
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === n); });
    }
    show(0);
    if (!reduced) {
      setInterval(function () { i = (i + 1) % frames.length; show(i); }, 2200);
    }
  }
})();
