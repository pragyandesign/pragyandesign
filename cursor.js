/* ==========================================================
   Pragyan custom cursor
   ========================================================== */
(function () {
  var copyEmailButtons = document.querySelectorAll("[data-copy-email]");
  copyEmailButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (button.tagName === "A") event.preventDefault();
      var email = button.getAttribute("data-copy-email");
      if (!email) return;

      function copied() {
        button.setAttribute("data-copy-state", "copied");
        document.dispatchEvent(new CustomEvent("pragyan-copy-success"));
        window.setTimeout(function () {
          button.removeAttribute("data-copy-state");
        }, 1400);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(copied).catch(function () {
        var area = document.createElement("textarea");
        area.value = email;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); copied(); } catch (e) {}
        document.body.removeChild(area);
      });
        return;
      }

      var area = document.createElement("textarea");
      area.value = email;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        copied();
      } catch (e) {}
      document.body.removeChild(area);
    });
  });

  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!finePointer) return;

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cursor = document.createElement("div");
  cursor.className = "pragyan-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML =
    '<svg class="pragyan-cursor__arrow" viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M2.5 2.5L45.2 27.3L25.1 30.7L15.2 50.2L2.5 2.5Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="M8 9L35.8 25.1L22 27.4L14.9 41.3L8 9Z" fill="#252525"/>' +
    '</svg>' +
    '<div class="pragyan-cursor__pill"><span class="pragyan-cursor__label">Pragyan</span></div>';
  document.body.appendChild(cursor);
  document.body.classList.add("cursor-enabled");

  var pill = cursor.querySelector(".pragyan-cursor__pill");
  var label = cursor.querySelector(".pragyan-cursor__label");
  var targetX = -100, targetY = -100, x = targetX, y = targetY;
  var visible = false, raf = 0, downTimer = 0;
  var currentLabel = "Pragyan";

  var measure = document.createElement("span");
  measure.style.cssText = "position:fixed;left:-9999px;top:-9999px;visibility:hidden;white-space:nowrap;font:600 18px/1 " + getComputedStyle(document.documentElement).getPropertyValue("--font-display");
  document.body.appendChild(measure);

  function setLabel(next) {
    next = (next || "Pragyan").trim() || "Pragyan";
    if (next === currentLabel) {
      measure.textContent = next;
      pill.style.width = Math.max(104, Math.ceil(measure.getBoundingClientRect().width + 44)) + "px";
      return;
    }
    currentLabel = next;
    measure.textContent = next;
    pill.style.width = Math.max(104, Math.ceil(measure.getBoundingClientRect().width + 44)) + "px";
    cursor.classList.add("is-label-changing");
    window.setTimeout(function () {
      label.textContent = currentLabel;
      cursor.classList.remove("is-label-changing");
    }, reduced ? 0 : 70);
  }

  document.addEventListener("pragyan-copy-success", function () {
    cursor.classList.add("is-hovering");
    setLabel("Email Copied");
    window.setTimeout(function () {
      var underCursor = document.elementFromPoint(targetX, targetY);
      setLabel(labelFor(underCursor || document.body));
    }, 1600);
  });

  function isPillTarget(target) {
    return !!(target && target.closest && target.closest("a, button, .pcard, .ccard, [data-cursor-label]"));
  }

  function updatePill(target) {
    cursor.classList.toggle("is-hovering", isPillTarget(target));
  }

  function labelFor(target) {
    var proto = target.closest && target.closest(".pcard");
    if (proto) return "View Prototype";

    var card = target.closest && target.closest(".ccard");
    if (card) {
      var cta = card.querySelector(".ccard__body .btn");
      if (cta) {
        var ctaText = cta.textContent.replace(/\s+/g, " ").trim();
        if (ctaText) return ctaText;
      }
      return "View Case Study";
    }

    var explicit = target.closest && target.closest("[data-cursor-label]");
    if (explicit) return explicit.getAttribute("data-cursor-label") || "Pragyan";

    var heroCta = target.closest && target.closest(".hero__cta a");
    if (heroCta) return heroCta.textContent.replace(/\s+/g, " ").trim();

    var link = target.closest && target.closest("a");
    if (link) {
      if (link.classList.contains("brand")) return "Home";
      var text = link.getAttribute("aria-label") || link.textContent;
      text = text.replace(/\s+/g, " ").trim();
      if (text && text.length <= 24) return text;
      return "Open";
    }

    var button = target.closest && target.closest("button");
    if (button) {
      var bt = button.getAttribute("aria-label") || button.textContent;
      bt = bt.replace(/\s+/g, " ").trim();
      return bt && bt.length <= 24 ? bt : "Open";
    }

    return "Pragyan";
  }

  function show() {
    if (visible) return;
    visible = true;
    cursor.classList.add("is-visible");
  }

  function hide() {
    visible = false;
    cursor.classList.remove("is-visible");
    targetX = -100;
    targetY = -100;
  }

  function render() {
    raf = 0;
    var ease = reduced ? 1 : 0.24;
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    cursor.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    if (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1) raf = window.requestAnimationFrame(render);
  }

  function move(e) {
    if (e.pointerType && e.pointerType !== "mouse") return;
    targetX = e.clientX;
    targetY = e.clientY;
    show();
    updatePill(e.target);
    setLabel(labelFor(e.target));
    if (!raf) raf = window.requestAnimationFrame(render);
  }

  function down(e) {
    if (e.pointerType && e.pointerType !== "mouse") return;
    cursor.classList.add("is-down");
    window.clearTimeout(downTimer);
  }

  function up() {
    window.clearTimeout(downTimer);
    downTimer = window.setTimeout(function () { cursor.classList.remove("is-down"); }, reduced ? 0 : 110);
  }

  window.addEventListener("pointermove", move, { passive: true });
  window.addEventListener("pointerdown", down, { passive: true });
  window.addEventListener("pointerup", up, { passive: true });
  window.addEventListener("pointercancel", up, { passive: true });
  window.addEventListener("blur", hide);
  document.addEventListener("mouseleave", hide);
  document.addEventListener("pointerover", function (e) {
    if (e.pointerType && e.pointerType !== "mouse") return;
    updatePill(e.target);
    setLabel(labelFor(e.target));
  }, { passive: true });

  setLabel("Pragyan");
})();
