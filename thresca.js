(function () {
  var doc = document.documentElement;
  doc.classList.remove("no-js"); doc.classList.add("js");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- hero: split the title into per-word, per-character spans, then reveal ----------
  // Grouped by word (see sarthi.js for why this matters): letters within a word are glued
  // together via .word { white-space: nowrap } in CSS, so the browser can only break the
  // line between words, never mid-word.
  document.querySelectorAll(".th-title[data-split]").forEach(function (el) {
    var text = el.textContent;
    el.textContent = "";
    var i = 0;
    var words = text.split(" ");
    words.forEach(function (word, wi) {
      var wordWrap = document.createElement("span");
      wordWrap.className = "word";
      word.split("").forEach(function (ch) {
        var wrap = document.createElement("span"); wrap.className = "ch"; wrap.style.setProperty("--i", i++);
        var inner = document.createElement("i"); inner.textContent = ch;
        wrap.appendChild(inner); wordWrap.appendChild(wrap);
      });
      el.appendChild(wordWrap);
      if (wi < words.length - 1) { i++; el.appendChild(document.createTextNode(" ")); }
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

  // ---------- process cards: sticky-stack as the next one arrives ----------
  var cards = document.querySelectorAll(".th-pcard");
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
})();
