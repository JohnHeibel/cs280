/* ==========================================================================
   SlopProject2 — page chrome + interactive widgets. Vanilla JS, no build step.
   Widgets are declared in HTML with data-attributes (see build_site.py docstring).
   ========================================================================== */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (tag, attrs = {}, ...kids) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    for (const k of kids) e.append(k);
    return e;
  };
  const json = (s, d) => { try { return JSON.parse(s); } catch { return d; } };
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  };

  /* ------------------------------------------------------------ theme */
  const savedTheme = store.get("slop-theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  function toggleTheme() {
    const t = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = t;
    store.set("slop-theme", t);
  }

  /* ------------------------------------------------------------ TOC + scrollspy + progress */
  function buildToc() {
    const list = $("#toc ol");
    if (!list) return;
    const heads = $$("main section.part > h2, main section.part h3[id], .part-banner[id]");
    for (const h of heads) {
      const isBanner = h.classList.contains("part-banner");
      const target = isBanner ? h : (h.tagName === "H2" ? h.closest("section") : h);
      if (!target.id) continue;
      let label = h.dataset.toc;
      if (!label) {
        const src = (isBanner ? $("h2", h) : h).cloneNode(true);
        const num = $(".num", src);
        const nt = num ? num.textContent : "";
        const tag = /bells|b&w|whistle/i.test(nt) ? "✦" : (nt.match(/\d+\.\d+/) || [""])[0];
        if (num) num.remove();
        label = (tag && h.tagName === "H2" && !isBanner ? tag + " · " : "") + src.textContent;
      }
      const li = el("li", { class: h.tagName === "H3" ? "h3" : (isBanner ? "banner" : "h2") },
        el("a", { href: "#" + target.id }, label.trim()));
      list.append(li);
    }
    const links = $$("#toc a");
    const targets = links.map((a) => document.getElementById(a.hash.slice(1)));
    let lastActive = -1;
    const onScroll = () => {
      const y = window.scrollY + 120;
      let cur = 0;
      targets.forEach((t, i) => { if (t && t.offsetTop <= y) cur = i; });
      links.forEach((a, i) => a.classList.toggle("active", i === cur));
      if (cur !== lastActive) {  // keep the highlighted entry visible in a long sidebar
        lastActive = cur;
        const toc = $("#toc"), a = links[cur];
        if (a && (a.offsetTop < toc.scrollTop + 80 || a.offsetTop > toc.scrollTop + toc.clientHeight - 80)) {
          toc.scrollTop = a.offsetTop - toc.clientHeight / 2;
        }
      }
      const h = document.documentElement.scrollHeight - innerHeight;
      $("#progress").style.width = (100 * scrollY / Math.max(1, h)) + "%";
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    links.forEach((a) => a.addEventListener("click", () => $("#toc").classList.remove("open")));
  }

  /* ------------------------------------------------------------ lightbox with zoom + pan */
  function lightbox() {
    const imgs = $$("figure.fig:not(.nozoom) img");
    if (!imgs.length) return;
    const box = el("div", { id: "lightbox" });
    const stage = el("div", { class: "lb-stage" });
    const img = el("img", { alt: "" });
    const cap = el("div", { class: "lb-cap" });
    stage.append(img);
    box.append(stage, cap,
      el("button", { class: "lb-btn lb-help", title: "" }, "scroll = zoom · drag = pan · 0 = fit · P = pixels · ←/→"),
      el("button", { class: "lb-btn lb-close", onclick: close }, "✕ close"),
      el("button", { class: "lb-btn lb-prev", onclick: () => show(idx - 1) }, "‹"),
      el("button", { class: "lb-btn lb-next", onclick: () => show(idx + 1) }, "›"));
    document.body.append(box);
    let idx = 0, s = 1, tx = 0, ty = 0;
    const apply = () => { img.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`; };
    const fit = () => {
      const W = stage.clientWidth, H = stage.clientHeight;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      s = Math.min(W * 0.94 / iw, H * 0.94 / ih);
      tx = -iw * s / 2; ty = -ih * s / 2; apply();
    };
    function show(i) {
      idx = (i + imgs.length) % imgs.length;
      const src = imgs[idx];
      const fig = src.closest("figure");
      box.classList.toggle("pixel", fig.classList.contains("pixel"));
      img.onload = fit;
      img.src = src.dataset.full || src.currentSrc || src.src;
      const fc = $("figcaption", fig);
      cap.innerHTML = fc ? fc.innerHTML : "";
      box.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() { box.classList.remove("open"); document.body.style.overflow = ""; }
    imgs.forEach((im, i) => im.addEventListener("click", () => show(i)));
    stage.addEventListener("wheel", (e) => {
      e.preventDefault();
      const r = stage.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2, my = e.clientY - r.top - r.height / 2;
      const f = Math.exp(-e.deltaY * 0.0015);
      tx = mx - (mx - tx) * f; ty = my - (my - ty) * f; s *= f; apply();
    }, { passive: false });
    let drag = null;
    stage.addEventListener("pointerdown", (e) => { drag = [e.clientX - tx, e.clientY - ty]; stage.classList.add("drag"); stage.setPointerCapture(e.pointerId); });
    stage.addEventListener("pointermove", (e) => { if (drag) { tx = e.clientX - drag[0]; ty = e.clientY - drag[1]; apply(); } });
    stage.addEventListener("pointerup", () => { drag = null; stage.classList.remove("drag"); });
    stage.addEventListener("dblclick", fit);
    addEventListener("keydown", (e) => {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(idx + 1);
      else if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "0") fit();
      else if (e.key.toLowerCase() === "p") box.classList.toggle("pixel");
    });
    addEventListener("resize", () => { if (box.classList.contains("open")) fit(); });
  }

  /* ------------------------------------------------------------ widget: before/after compare */
  function compare(node) {
    const d = node.dataset;
    node.classList.add("compare");
    const before = el("img", { src: d.before, alt: d.beforeLabel || "before" });
    const after = el("img", { src: d.after, alt: d.afterLabel || "after" });
    const wrap = el("div", { class: "after-wrap" }, after);
    const handle = el("div", { class: "handle" });
    node.append(before, wrap, handle);
    if (d.beforeLabel) node.append(el("span", { class: "lab l" }, d.beforeLabel));
    if (d.afterLabel) node.append(el("span", { class: "lab r" }, d.afterLabel));
    if (d.maxWidth) node.style.maxWidth = `min(100%, ${d.maxWidth})`;
    // "after" is revealed on the RIGHT of the handle
    let t = parseFloat(d.start || "0.5");
    const set = () => {
      const w = node.clientWidth;
      wrap.style.left = (t * w) + "px";
      after.style.marginLeft = -(t * w) + "px";
      after.style.width = w + "px";
      after.style.height = "auto";
      handle.style.left = (t * w - 1) + "px";
    };
    const move = (e) => {
      const r = node.getBoundingClientRect();
      t = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); set();
    };
    let down = false;
    node.addEventListener("pointerdown", (e) => { down = true; node.setPointerCapture(e.pointerId); move(e); });
    node.addEventListener("pointermove", (e) => { if (down) move(e); });
    node.addEventListener("pointerup", () => { down = false; });
    before.addEventListener("load", set);
    addEventListener("resize", set);
    set();
  }

  /* ------------------------------------------------------------ widget: frame scrubber */
  function scrubber(node) {
    const d = node.dataset;
    const frames = json(d.frames, []);
    const labels = json(d.labels, frames.map((_, i) => String(i)));
    node.classList.add("widget", "scrubber");
    const start = Math.min(frames.length - 1, parseInt(d.start || "0", 10));
    const range = el("input", { type: "range", min: 0, max: frames.length - 1, step: 1, value: start });
    const val = el("span", { class: "w-val" });
    const img = el("img", { alt: d.title || "" });
    if (d.maxWidth) img.style.maxWidth = `min(100%, ${d.maxWidth})`;
    if (d.pixel) img.style.imageRendering = "pixelated";
    const play = el("button", { class: "btn" }, "▶ play");
    node.append(
      el("div", { class: "w-head" }, el("span", { class: "w-title" }, d.title || "scrub"), play, val),
      el("div", { class: "w-head" }, range),
      el("div", { class: "frame-wrap" }, img));
    if (d.note) node.append(el("div", { class: "w-note", html: d.note }));
    frames.forEach((f) => { const p = new Image(); p.src = f; });  // preload
    const set = (i) => { img.src = frames[i]; val.textContent = labels[i]; range.value = i; };
    range.addEventListener("input", () => set(+range.value));
    let timer = null, dir = 1;
    play.addEventListener("click", () => {
      if (timer) { clearInterval(timer); timer = null; play.textContent = "▶ play"; return; }
      play.textContent = "❚❚ pause";
      timer = setInterval(() => {
        let i = +range.value + dir;
        if (i >= frames.length || i < 0) { dir = -dir; i += 2 * dir; }
        set(i);
      }, parseInt(d.interval || "450", 10));
    });
    set(start);
  }

  /* ------------------------------------------------------------ widget: hybrid viewing distance */
  function distanceViewer(node) {
    const d = node.dataset;
    node.classList.add("widget", "distance-viewer");
    const img = el("img", { src: d.src, alt: d.title || "hybrid" });
    const range = el("input", { type: "range", min: 0, max: 1000, value: 0 });
    const val = el("span", { class: "w-val" });
    const walk = el("button", { class: "btn" }, "🚶 walk away");
    const ladder = el("div", { class: "ladder" });
    [1, 0.5, 0.25, 0.125, 0.0625].forEach((f) => {
      const li = el("img", { src: d.src, alt: "" });
      li.style.width = `calc(${f} * min(260px, 30vw))`;
      ladder.append(li);
    });
    node.append(
      el("div", { class: "w-head" }, el("span", { class: "w-title" }, d.title || "viewing distance"), walk, val),
      el("div", { class: "w-head" }, el("span", { class: "chip" }, "close"), range, el("span", { class: "chip" }, "far")),
      el("div", { class: "stage" }, img), ladder,
      el("div", { class: "w-note", html: d.note || "Drag right to &ldquo;walk away&rdquo;: shrinking the image removes the high frequencies your eye can resolve, so the low-pass image takes over. The ladder below shows the same thing as a pyramid." }));
    const set = (v) => {
      // distance multiplier 1x .. 16x, perceptually uniform (log)
      const dist = Math.pow(16, v / 1000);
      img.style.transform = `scale(${1 / dist})`;
      val.textContent = `${dist.toFixed(1)}× farther`;
      range.value = v;
    };
    range.addEventListener("input", () => set(+range.value));
    let anim = null;
    walk.addEventListener("click", () => {
      if (anim) { cancelAnimationFrame(anim); anim = null; walk.textContent = "🚶 walk away"; return; }
      walk.textContent = "■ stop";
      const t0 = performance.now();
      const step = (t) => {
        const ph = ((t - t0) / 7000) % 1;
        set(1000 * (0.5 - 0.5 * Math.cos(ph * 2 * Math.PI)));
        anim = requestAnimationFrame(step);
      };
      anim = requestAnimationFrame(step);
    });
    set(0);
  }

  /* ------------------------------------------------------------ widget: live threshold lab */
  function thresholdLab(node) {
    const d = node.dataset;
    node.classList.add("widget");
    const canvas = el("canvas");
    const range = el("input", { type: "range", min: 0, max: 1000, value: Math.round(1000 * parseFloat(d.init || "0.2")) });
    const val = el("span", { class: "w-val" });
    const mode = el("button", { class: "btn" }, "overlay: off");
    const marks = json(d.marks, {});
    const markRow = el("div", { class: "w-head" });
    for (const [name, v] of Object.entries(marks)) {
      markRow.append(el("button", { class: "btn", onclick: () => { range.value = Math.round(v * 1000); draw(); } }, `${name} = ${(+v).toFixed(3)}`));
    }
    node.append(
      el("div", { class: "w-head" }, el("span", { class: "w-title" }, d.title || "threshold"), mode, val),
      el("div", { class: "w-head" }, range), markRow, canvas);
    if (d.note) node.append(el("div", { class: "w-note", html: d.note }));
    const src = new Image();
    let mag = null, base = null, W = 0, H = 0, overlay = false;
    mode.addEventListener("click", () => { overlay = !overlay; mode.textContent = "overlay: " + (overlay ? "on" : "off"); draw(); });
    src.onload = () => {
      W = src.naturalWidth; H = src.naturalHeight;
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(src, 0, 0);
      const px = ctx.getImageData(0, 0, W, H).data;
      mag = new Float32Array(W * H);
      for (let i = 0; i < W * H; i++) mag[i] = px[4 * i] / 255;
      if (d.base) {
        const b = new Image();
        b.onload = () => {
          ctx.drawImage(b, 0, 0, W, H);
          base = ctx.getImageData(0, 0, W, H).data.slice();
          draw();
        };
        b.src = d.base;
      }
      draw();
    };
    src.src = d.src;
    function draw() {
      if (!mag) return;
      const t = +range.value / 1000;
      const ctx = canvas.getContext("2d");
      const out = ctx.createImageData(W, H);
      let on = 0;
      for (let i = 0; i < W * H; i++) {
        const e = mag[i] > t;
        on += e;
        if (overlay && base) {
          const k = 4 * i;
          out.data[k] = e ? 255 : base[k] * 0.55;
          out.data[k + 1] = e ? 60 : base[k + 1] * 0.55;
          out.data[k + 2] = e ? 150 : base[k + 2] * 0.55;
        } else {
          const v = e ? 255 : 0;
          out.data[4 * i] = out.data[4 * i + 1] = out.data[4 * i + 2] = v;
        }
        out.data[4 * i + 3] = 255;
      }
      ctx.putImageData(out, 0, 0);
      val.textContent = `t = ${t.toFixed(3)} · ${(100 * on / (W * H)).toFixed(1)}% edge pixels`;
    }
    range.addEventListener("input", draw);
  }

  /* ------------------------------------------------------------ widget: in-browser convolution playground */
  const PRESETS = {
    "identity": [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
    "box 3×3": [[1, 1, 1], [1, 1, 1], [1, 1, 1]].map((r) => r.map((v) => v / 9)),
    "D_x = [1, −1]": [[0, 0, 0], [0, 1, -1], [0, 0, 0]],
    "D_y = [1; −1]": [[0, 0, 0], [0, 1, 0], [0, -1, 0]],
    "Sobel x": [[1, 0, -1], [2, 0, -2], [1, 0, -1]],
    "Laplacian": [[0, 1, 0], [1, -4, 1], [0, 1, 0]],
    "sharpen": [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
    "emboss": [[-2, -1, 0], [-1, 1, 1], [0, 1, 2]],
    "gaussian-ish": [[1, 2, 1], [2, 4, 2], [1, 2, 1]].map((r) => r.map((v) => v / 16)),
  };
  function convPlayground(node) {
    const d = node.dataset;
    node.classList.add("widget");
    const select = el("select", { class: "btn" });
    Object.keys(PRESETS).forEach((k) => select.append(el("option", { value: k }, k)));
    const grid = el("div");
    grid.style.cssText = "display:grid;grid-template-columns:repeat(3,64px);gap:6px;";
    const cells = [];
    for (let i = 0; i < 9; i++) {
      const c = el("input", { type: "number", step: "0.1", value: "0" });
      c.style.cssText = "width:64px;padding:6px;border-radius:8px;border:1px solid var(--line);background:var(--panel-2);color:var(--fg);font:600 13px var(--mono);text-align:center";
      c.addEventListener("input", run);
      cells.push(c); grid.append(c);
    }
    const signed = el("label", { class: "chip" }, el("input", { type: "checkbox" }), " show signed (grey = 0)");
    const cin = el("canvas"), cout = el("canvas");
    const timing = el("span", { class: "w-val" });
    const panes = el("div", { class: "grid g2" }, cin, cout);
    node.append(
      el("div", { class: "w-head" }, el("span", { class: "w-title" }, d.title || "convolution playground"), select, signed, timing),
      el("div", { class: "w-head" }, grid, el("div", { class: "w-note", html: "Edit any tap. The kernel is <b>flipped</b> before sliding (true convolution), zero padding, &lsquo;same&rsquo; output — the exact semantics of <code>conv2d_2loops_taps</code>, re-typed in JavaScript." })),
      panes);
    select.addEventListener("change", () => { load(select.value); });
    $("input", signed).addEventListener("change", run);
    let G = null, W = 0, H = 0;
    const img = new Image();
    img.onload = () => {
      const maxW = parseInt(d.size || "320", 10);
      const s = Math.min(1, maxW / img.naturalWidth);
      W = Math.round(img.naturalWidth * s); H = Math.round(img.naturalHeight * s);
      [cin, cout].forEach((c) => { c.width = W; c.height = H; c.style.width = "100%"; c.style.imageRendering = "pixelated"; });
      const ctx = cin.getContext("2d");
      ctx.drawImage(img, 0, 0, W, H);
      const px = ctx.getImageData(0, 0, W, H).data;
      G = new Float32Array(W * H);
      for (let i = 0; i < W * H; i++) G[i] = (0.299 * px[4 * i] + 0.587 * px[4 * i + 1] + 0.114 * px[4 * i + 2]) / 255;
      const g = ctx.createImageData(W, H);
      for (let i = 0; i < W * H; i++) { g.data[4 * i] = g.data[4 * i + 1] = g.data[4 * i + 2] = G[i] * 255; g.data[4 * i + 3] = 255; }
      ctx.putImageData(g, 0, 0);
      load(select.value);
    };
    img.src = d.src;
    function load(name) { PRESETS[name].flat().forEach((v, i) => { cells[i].value = +v.toFixed(4); }); run(); }
    function run() {
      if (!G) return;
      const t0 = performance.now();
      const k = cells.map((c) => parseFloat(c.value) || 0);
      const kf = k.slice().reverse();  // flip both axes of a 3x3 == reverse the flat list
      const out = new Float32Array(W * H);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        let acc = 0;
        for (let m = -1; m <= 1; m++) for (let n = -1; n <= 1; n++) {
          const yy = y + m, xx = x + n;
          if (yy < 0 || yy >= H || xx < 0 || xx >= W) continue;
          acc += G[yy * W + xx] * kf[(m + 1) * 3 + (n + 1)];
        }
        out[y * W + x] = acc;
      }
      const sgn = $("input", signed).checked;
      let mx = 1e-9; if (sgn) for (const v of out) mx = Math.max(mx, Math.abs(v));
      const ctx = cout.getContext("2d");
      const o = ctx.createImageData(W, H);
      for (let i = 0; i < W * H; i++) {
        const v = sgn ? 0.5 + out[i] / (2 * mx) : out[i];
        o.data[4 * i] = o.data[4 * i + 1] = o.data[4 * i + 2] = Math.max(0, Math.min(255, v * 255));
        o.data[4 * i + 3] = 255;
      }
      ctx.putImageData(o, 0, 0);
      timing.textContent = `${(performance.now() - t0).toFixed(1)} ms in JS`;
    }
  }

  /* ------------------------------------------------------------ widget: blink comparator */
  function blink(node) {
    const d = node.dataset;
    node.append(el("img", { class: "a", src: d.a, alt: "" }), el("img", { class: "b", src: d.b, alt: "" }));
    node.addEventListener("click", () => node.classList.toggle("on"));
  }

  /* ------------------------------------------------------------ code blocks: highlight + copy */
  function codeBlocks() {
    $$(".code-block").forEach((b) => {
      const btn = $(".copy", b);
      if (btn) btn.addEventListener("click", () => {
        navigator.clipboard.writeText($("code", b).innerText).then(() => {
          btn.textContent = "copied!"; setTimeout(() => (btn.textContent = "copy"), 1200);
        });
      });
    });
    if (window.hljs) $$("pre code").forEach((c) => window.hljs.highlightElement(c));
  }

  /* ------------------------------------------------------------ boot */
  document.addEventListener("DOMContentLoaded", () => {
    $$("[data-action=theme]").forEach((b) => b.addEventListener("click", toggleTheme));
    const tt = $("#toc-toggle"); if (tt) tt.addEventListener("click", () => $("#toc").classList.toggle("open"));
    $$("[data-widget=compare]").forEach(compare);
    $$("[data-widget=scrubber]").forEach(scrubber);
    $$("[data-widget=distance]").forEach(distanceViewer);
    $$("[data-widget=threshold]").forEach(thresholdLab);
    $$("[data-widget=conv]").forEach(convPlayground);
    $$("[data-widget=blink]").forEach(blink);
    buildToc();
    lightbox();
    codeBlocks();
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
        throwOnError: false,
      });
    }
  });
})();
