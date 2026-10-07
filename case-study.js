/* ==========================================================
   Generic case study template (v2): behaviour
   Every effect here degrades to a static, fully readable page with
   JS off or prefers-reduced-motion on. Nothing here is required to
   read the content — it only sets the pace for skimming it.
   ========================================================== */
(function () {
  var doc = document.documentElement;
  doc.classList.remove("no-js"); doc.classList.add("js");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- scroll progress bar ----------
  var bar = document.querySelector(".ds-progress");
  function setProgress() {
    var h = doc.scrollHeight - window.innerHeight;
    if (bar) bar.style.setProperty("--p", h > 0 ? Math.min(1, window.scrollY / h) : 0);
  }
  document.addEventListener("scroll", setProgress, { passive: true });
  window.addEventListener("resize", setProgress);
  setProgress();

  // ---------- jump nav: highlight active section by scroll position ----------
  var jumpLinks = document.querySelectorAll(".ds-jump a");
  var jumpTrack = document.querySelector(".ds-jump__in");
  var sections = Array.prototype.map.call(jumpLinks, function (a) { return document.querySelector(a.getAttribute("href")); });
  function setActiveJump() {
    var y = window.scrollY + 140, active = null;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) active = i; });
    jumpLinks.forEach(function (a, i) { a.classList.toggle("is-active", i === active); });
    if (active != null && jumpTrack) {
      var link = jumpLinks[active];
      var target = link.offsetLeft - (jumpTrack.clientWidth - link.offsetWidth) / 2;
      jumpTrack.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    }
  }
  document.addEventListener("scroll", setActiveJump, { passive: true });
  setActiveJump();

  // ---------- hero title: split into words, then per-character spans ----------
  // Word wrapper keeps letters of one word together across a line break;
  // the literal space between word spans is where the browser is allowed to wrap.
  document.querySelectorAll(".ds-title[data-split]").forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    words.forEach(function (word, wi) {
      var wordEl = document.createElement("span");
      wordEl.className = "word";
      var gi = 0;
      word.split("").forEach(function (ch) {
        var wrap = document.createElement("span"); wrap.className = "ch"; wrap.style.setProperty("--i", gi++);
        var inner = document.createElement("i"); inner.textContent = ch;
        wrap.appendChild(inner); wordEl.appendChild(wrap);
      });
      el.appendChild(wordEl);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  });
  requestAnimationFrame(function () { requestAnimationFrame(function () { doc.classList.add("is-loaded"); }); });

  // ---------- reveal on scroll ----------
  var revealTargets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealTargets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealTargets.forEach(function (el) {
      var group = el.closest("[data-reveal-group]");
      var within = group ? Array.prototype.indexOf.call(group.querySelectorAll("[data-reveal]"), el) : 0;
      el.style.setProperty("--d", (within * 80) + "ms");
      io.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-in"); });
  }

  // ---------- cover: pointer-tilt on the hero shot, scroll-tied only as a fallback ----------
  var shot = document.querySelector("[data-tilt]");
  if (shot && window.matchMedia("(pointer: fine)").matches && !reduced) {
    var cover = shot.closest(".ds-cover");
    cover.addEventListener("pointermove", function (e) {
      var r = cover.getBoundingClientRect();
      var rx = ((e.clientY - r.top) / r.height - 0.5) * -4;
      var ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
      shot.style.transform = "perspective(1200px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
    });
    cover.addEventListener("pointerleave", function () { shot.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)"; });
  }

  // ---------- key moments: sticky stack dimming, same mechanism as the branding template ----------
  var mcards = document.querySelectorAll(".ds-mcard");
  if (mcards.length && !reduced) {
    function updateStack() {
      mcards.forEach(function (card, i) {
        var next = mcards[i + 1];
        if (!next) { card.style.setProperty("--dim", 0); return; }
        var nextTop = next.getBoundingClientRect().top;
        var start = window.innerHeight, end = 90 + i * 20;
        var t = 1 - Math.max(0, Math.min(1, (nextTop - end) / (start - end)));
        card.style.setProperty("--dim", t.toFixed(3));
      });
    }
    document.addEventListener("scroll", updateStack, { passive: true });
    window.addEventListener("resize", updateStack);
    updateStack();
  }

  // ---------- final artifacts: fully automatic frame loop, dots are passive + clickable ----------
  var stage = document.querySelector(".ds-stage");
  if (stage) {
    var frames = stage.querySelectorAll(".ds-stage__frame");
    var dotsWrap = stage.querySelector(".ds-stage__dots");
    var idx = 0, timer = null;
    frames.forEach(function (_, i) {
      var dot = document.createElement("span");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Show artifact " + (i + 1));
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", function () { show(i); restart(); });
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll("span");
    function show(i) {
      idx = i;
      frames.forEach(function (f, fi) { f.classList.toggle("is-active", fi === i); });
      dots.forEach(function (d, di) { d.classList.toggle("is-active", di === i); });
    }
    function tick() { show((idx + 1) % frames.length); }
    function restart() {
      if (timer) clearInterval(timer);
      if (!reduced) timer = setInterval(tick, 2600);
    }
    restart();
    stage.addEventListener("pointerenter", function () { if (timer) clearInterval(timer); });
    stage.addEventListener("pointerleave", restart);
  }

  // ---------- count-up numbers, triggered once in view ----------
  var counters = document.querySelectorAll(".ds-count");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        var el = en.target, target = parseFloat(el.getAttribute("data-count")) || 0;
        var suffix = el.getAttribute("data-suffix") || "";
        if (reduced) { el.textContent = target + suffix; return; }
        var dur = 1100, startT = null;
        function step(ts) {
          if (!startT) startT = ts;
          var p = Math.min(1, (ts - startT) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = (el.getAttribute("data-count") || "0") + (el.getAttribute("data-suffix") || ""); });
  }
})();
