(function () {
  var doc = document.documentElement;
  doc.classList.remove("no-js"); doc.classList.add("js");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- hero: split the title into per-word, per-character spans, then reveal ----------
  document.querySelectorAll(".aw-title[data-split]").forEach(function (el) {
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
  var cards = document.querySelectorAll(".aw-pcard");
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

  // ---------- colour swatches: one open at a time, click to expand, click the chip to copy ----------
  var swatches = document.querySelectorAll(".aw-sw");
  swatches.forEach(function (sw) {
    sw.addEventListener("click", function (e) {
      if (e.target.closest(".aw-sw__chip")) return;
      swatches.forEach(function (o) { o.setAttribute("aria-expanded", String(o === sw)); });
    });
    var chip = sw.querySelector(".aw-sw__chip");
    if (chip) {
      chip.addEventListener("click", function (e) {
        e.stopPropagation();
        var hex = chip.textContent.trim();
        var toast = sw.querySelector(".aw-sw__toast");
        function flash(msg) { if (!toast) return; toast.textContent = msg; toast.classList.add("on"); setTimeout(function () { toast.classList.remove("on"); }, 1200); }
        if (navigator.clipboard) navigator.clipboard.writeText(hex).then(function () { flash("Copied " + hex); }, function () { flash(hex); });
        else flash(hex);
      });
    }
  });

  // ---------- type weight slider: snaps across the three loaded Aquire weights ----------
  var slider = document.querySelector("[data-weight-slider]");
  if (slider) {
    var out = document.querySelector("[data-weight-value]");
    function apply(v) {
      document.documentElement.style.setProperty("--w", v);
      if (out) out.textContent = v;
    }
    slider.addEventListener("input", function () { apply(slider.value); });
    apply(slider.value);
  }

  // ---------- visual identity: autoplaying loop + Apple-style pause player ----------
  var stage = document.querySelector(".aw-stage");
  if (stage) {
    var frames = stage.querySelectorAll(".aw-frame");
    var dots = document.querySelectorAll(".aw-dots i");
    var i = 0;
    var timer = null;
    var paused = reduced;

    var player = document.createElement("div");
    player.className = "aw-player";
    player.setAttribute("aria-label", "Logo animation controls");
    player.innerHTML =
      '<button class="aw-player__reveal" type="button" aria-label="Show animation controls"></button>' +
      '<div class="aw-player__body">' +
        '<div class="aw-player__track" role="tablist" aria-label="Logo variations"></div>' +
      '</div>' +
      '<button class="aw-player__pause" type="button" aria-label="Pause logo animation" aria-pressed="false">' +
        '<svg class="pause" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="5" width="5" height="14" rx="1.2"></rect><rect x="13.5" y="5" width="5" height="14" rx="1.2"></rect></svg>' +
        '<svg class="play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z"></path></svg>' +
      '</button>';

    var switcher = document.querySelector(".aw-switcher");
    if (switcher) switcher.appendChild(player);

    var reveal = player.querySelector(".aw-player__reveal");
    var pauseButton = player.querySelector(".aw-player__pause");
    var track = player.querySelector(".aw-player__track");
    var playerTrackDots = [];

    frames.forEach(function (_, k) {
      var d = document.createElement("i");
      d.setAttribute("role", "presentation");
      track.appendChild(d);
      playerTrackDots.push(d);
    });

    function show(n) {
      frames.forEach(function (f, k) { f.classList.toggle("is-active", k === n); });
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === n); });
      playerTrackDots.forEach(function (d, k) { d.classList.toggle("is-active", k === n); });
    }

    function start() {
      if (timer || paused || frames.length < 2) return;
      timer = window.setInterval(function () {
        i = (i + 1) % frames.length;
        show(i);
      }, 2200);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function setPaused(value) {
      paused = value;
      if (paused) stop(); else start();
      player.classList.toggle("is-paused", paused);
      pauseButton.setAttribute("aria-pressed", String(paused));
      pauseButton.setAttribute("aria-label", paused ? "Resume logo animation" : "Pause logo animation");
    }

    function expand() {
      player.classList.add("is-expanded");
    }

    function collapseLater() {
      if (paused) return;
      window.clearTimeout(player._collapseTimer);
      player._collapseTimer = window.setTimeout(function () {
        if (!player.matches(":hover") && !player.contains(document.activeElement)) {
          player.classList.remove("is-expanded");
        }
      }, 1800);
    }

    reveal.addEventListener("click", function () {
      expand();
      window.clearTimeout(player._collapseTimer);
    });

    pauseButton.addEventListener("click", function () {
      expand();
      setPaused(!paused);
      if (!paused) collapseLater();
    });

    player.addEventListener("mouseenter", expand);
    player.addEventListener("mouseleave", collapseLater);
    player.addEventListener("focusin", expand);
    player.addEventListener("focusout", function () {
      window.setTimeout(collapseLater, 0);
    });

    show(0);
    if (!reduced) start();
  }
})();
