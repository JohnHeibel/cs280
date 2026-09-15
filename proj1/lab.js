/* Image lab + result sections. Driven by docs/data/john.json and docs/data/llm.json (see sitegen.py). */
(async function () {
  const $ = (s, el = document) => el.querySelector(s);
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v; else if (k === "html") n.innerHTML = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v); else n.setAttribute(k, v);
    }
    for (const k of kids) if (k != null) n.append(k);
    return n;
  };
  const fmt = (v) => (v == null ? "–" : Array.isArray(v) ? `(${v.join(", ")})` : v);

  // ---------- data ----------
  const tiers = {};
  for (const t of ["john", "llm"]) {
    try { tiers[t] = await (await fetch(`data/${t}.json`)).json(); } catch (e) { console.warn("missing tier", t); }
  }
  const john = tiers.john, llm = tiers.llm;
  if (!john) { $("#lab").textContent = "data/john.json not found — run colorize_john.py"; return; }
  const stagesById = {};
  for (const t of Object.values(tiers)) for (const s of t.stages) stagesById[s.id] = s;
  const johnIds = john.stages.map(s => s.id);
  const orderedStages = [];                 // John's order, LLM-only stages right after their "before"
  for (const id of johnIds) {
    orderedStages.push(id);
    if (llm) for (const s of llm.stages) if (!johnIds.includes(s.id) && s.before === id) orderedStages.push(s.id);
  }
  const imageByName = (tier, name) => tier && tier.images.find(i => i.name === name);
  const captionFor = (tierName, stageId) => {
    const c = window.CAPTIONS || {};
    return (c[tierName] && c[tierName][stageId]) || (c.john && c.john[stageId]) || "";
  };

  // ---------- lightbox ----------
  const lb = el("div", { class: "lightbox", onclick: () => lb.classList.remove("on") }, el("img"));
  document.body.append(lb);
  const openLightbox = (src) => { $("img", lb).src = src; lb.classList.add("on"); };

  // ---------- readout of one stage record ----------
  function fillReadout(readout, rec) {
    readout.innerHTML = "";
    const out = [];
    if (rec.g) out.push(["G (dx, dy)", rec.g]); if (rec.r) out.push(["R (dx, dy)", rec.r]);
    if (rec.angle_g != null) out.push(["G rotation / scale", `${rec.angle_g}° / ${rec.scale_g}`]);
    if (rec.angle_r != null) out.push(["R rotation / scale", `${rec.angle_r}° / ${rec.scale_r}`]);
    if (rec.accepted != null) out.push(["used", rec.accepted ? "yes" : "no"]);
    if (rec.illuminant) out.push(["illuminant R,G,B", rec.illuminant.map(v => v.toFixed(2)).join(" ")]);
    if (rec.shape) out.push(["size", rec.shape.join(" × ")]);
    if (rec.seconds != null) out.push(["time", rec.seconds + " s"]);
    for (const [k, v] of out) readout.append(el("span", {}, el("b", {}, k + " "), fmt(v)));
  }

  // ---------- before / after panel ----------
  function makePanel() {
    const imgB = el("img", { onclick: () => openLightbox(imgB.src) }), imgA = el("img", { onclick: () => openLightbox(imgA.src) });
    const capB = el("figcaption"), capA = el("figcaption");
    const figB = el("figure", {}, imgB, capB), figA = el("figure", {}, imgA, capA);
    const pics = el("div", { class: "pics" }, figB, figA);
    const title = el("div", { class: "panel-title" });
    const readout = el("div", { class: "readout" });
    const note = el("div", { class: "caption" });
    const root = el("div", { class: "panel" }, title, pics, readout, note);
    return {
      root,
      show(tier, image, stageId) {
        this.showPair(tier, image, stagesById[stageId].before, stageId);
      },
      showPair(tier, image, leftId, rightId) {
        const st = stagesById[rightId], rec = image && image.stages[rightId];
        const isDefault = leftId === st.before;
        title.textContent = `${image ? image.name : ""} — ` +
          (isDefault ? st.label : `${leftId ? stagesById[leftId].label : "—"} vs ${st.label}`);
        if (!rec) { pics.hidden = true; readout.textContent = "not available for this image"; note.textContent = ""; return; }
        pics.hidden = false;
        const beforeRec = leftId && image.stages[leftId];
        figB.hidden = !beforeRec;
        pics.classList.toggle("single", !beforeRec);
        if (beforeRec) { imgB.src = beforeRec.file; capB.textContent = (isDefault ? "before: " : "left: ") + stagesById[leftId].label; }
        imgA.src = rec.file; capA.textContent = beforeRec ? (isDefault ? "after: " : "right: ") + st.label : st.label;
        fillReadout(readout, rec);
        note.textContent = captionFor(tier.tier, rightId);
      },
    };
  }

  // ---------- LLM section toggle (global, remembered) ----------
  const llmOn = () => document.body.classList.contains("llm");
  const toggles = [];
  const paintToggles = () => toggles.forEach(b => {
    b.classList.toggle("on", llmOn());
    b.innerHTML = llmOn() ? "Hide the LLM-code version <span>▲</span>" : "Show the LLM-code version <span>▼</span>";
  });
  const setLLM = (on) => {
    document.body.classList.toggle("llm", !!on && !!llm);
    try { localStorage.setItem("llm", on ? "1" : "0"); } catch (e) {}
    paintToggles();
  };
  const makeToggle = () => {
    const b = el("button", { class: "llm-toggle", type: "button", onclick: () => setLLM(!llmOn()) });
    if (!llm) b.disabled = true;
    toggles.push(b);
    return b;
  };

  // ---------- the lab ----------
  const lab = $("#lab");
  const state = { image: john.images[0].name, stage: "pyr_ncc", left: undefined, right: undefined };  // left/right override the step's default pair
  const makeThumbs = (onpick) => {
    const t = el("div", { class: "thumbs" });
    for (const im of john.images) {
      const src = (im.stages.colormap || im.stages.pyr_ncc || im.stages.unaligned).file;
      const b = el("button", { class: im.source === "extra" ? "extra" : "", onclick: () => onpick(im.name) },
        el("img", { src, loading: "lazy", alt: im.name }), el("span", {}, im.name));
      b.dataset.name = im.name; t.append(b);
    }
    return t;
  };
  const thumbs = makeThumbs(name => { state.image = name; renderLab(); });
  const stepSel = el("select", { class: "picker big" });
  stepSel.addEventListener("change", () => { state.stage = stepSel.value; state.left = state.right = undefined; renderLab(); });
  const leftSel = el("select", { class: "picker" }), rightSel = el("select", { class: "picker" });
  leftSel.addEventListener("change", () => { state.left = leftSel.value || null; renderLab(); });
  rightSel.addEventListener("change", () => { state.right = rightSel.value; renderLab(); });
  const panels = el("div", { class: "panels" });
  const panelJ = makePanel();
  // shortcuts: jump straight to the two "final" views
  const shortcut = (label, stageId) => el("button", { class: "shortcut", type: "button",
    onclick: () => { state.stage = stageId; state.left = state.right = undefined; renderLab(); } }, label);
  lab.append(
    el("div", { class: "lab-row" }, el("span", { class: "label" }, "Image"), thumbs),
    el("div", { class: "lab-row" }, el("span", { class: "label" }, "Step"), stepSel,
      shortcut("Final: bare requirements", "pyr_ncc"), shortcut("Final: bells & whistles", "colormap")),
    el("div", { class: "lab-row sub" }, el("span", { class: "label" }, "Compare"), leftSel, el("span", { class: "vs" }, "vs"), rightSel,
      el("span", { class: "hint" }, "pick any two steps; the Step menu resets this")),
    panels);

  function renderLab() {
    const imJ = imageByName(john, state.image);
    thumbs.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.name === state.image));
    stepSel.innerHTML = "";
    let group = null, og = null;
    for (const id of johnIds) {
      const st = stagesById[id];
      if (!(imJ && imJ.stages[id])) continue;
      if (st.group !== group) { group = st.group; og = el("optgroup", { label: group === "align" ? "Alignment" : "Bells & whistles" }); stepSel.append(og); }
      og.append(el("option", { value: id }, st.label));
    }
    if (![...stepSel.options].find(o => o.value === state.stage)) state.stage = "pyr_ncc";
    stepSel.value = state.stage;
    // left / right pair: default to the step's before/after unless overridden
    const avail = [...stepSel.options].map(o => o.value);
    const right = state.right && avail.includes(state.right) ? state.right : state.stage;
    let left = state.left === undefined ? stagesById[right].before : state.left;
    if (left && !avail.includes(left)) left = null;
    leftSel.innerHTML = ""; rightSel.innerHTML = "";
    leftSel.append(el("option", { value: "" }, "(none)"));
    for (const id of avail) { leftSel.append(el("option", { value: id }, stagesById[id].label)); rightSel.append(el("option", { value: id }, stagesById[id].label)); }
    leftSel.value = left || ""; rightSel.value = right;
    lab.querySelectorAll(".shortcut").forEach(b => b.classList.toggle("on",
      (b.textContent.includes("bare") && state.stage === "pyr_ncc") || (b.textContent.includes("bells") && state.stage === "colormap")));
    panels.innerHTML = "";
    if (imJ) { panels.append(panelJ.root); panelJ.showPair(john, imJ, left, right); }
  }
  try { if (localStorage.getItem("llm") === "1" && llm) document.body.classList.add("llm"); } catch (e) {}
  renderLab();
  document.querySelectorAll(".llm-toggle-slot").forEach(slot => slot.append(makeToggle()));
  paintToggles();

  // ---------- John vs LLM comparison lab ----------
  const cmpRoot = $("#compare-lab");
  if (cmpRoot && llm) {
    const cstate = { image: john.images[0].name, stage: "colormap" };
    const cthumbs = makeThumbs(name => { cstate.image = name; renderCompare(); });
    const cstep = el("select", { class: "picker big" });
    cstep.addEventListener("change", () => { cstate.stage = cstep.value; renderCompare(); });
    const mkSide = () => {
      const img = el("img", { onclick: () => openLightbox(img.src) });
      const cap = el("figcaption"), ro = el("div", { class: "readout" }), note = el("div", { class: "caption" });
      return { fig: el("figure", {}, img, cap, ro, note), img, cap, ro, note };
    };
    const sides = { john: mkSide(), llm: mkSide() };
    const title = el("div", { class: "panel-title" });
    const cpics = el("div", { class: "pics" }, sides.john.fig, sides.llm.fig);
    cmpRoot.append(
      el("div", { class: "lab-row" }, el("span", { class: "label" }, "Image"), cthumbs),
      el("div", { class: "lab-row" }, el("span", { class: "label" }, "Step"), cstep,
        el("span", { class: "hint" }, "left: my code · right: LLM code, at the same point in the pipeline")),
      el("div", { class: "panel compare" }, title, cpics));
    function renderCompare() {
      const imJ = imageByName(john, cstate.image), imL = imageByName(llm, cstate.image);
      cthumbs.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.name === cstate.image));
      cstep.innerHTML = "";
      let group = null, og = null;
      for (const id of orderedStages) {
        const st = stagesById[id];
        if (!((imJ && imJ.stages[id]) || (imL && imL.stages[id]))) continue;
        if (st.group !== group) { group = st.group; og = el("optgroup", { label: group === "align" ? "Alignment" : "Bells & whistles" }); cstep.append(og); }
        og.append(el("option", { value: id }, st.label));
      }
      if (![...cstep.options].find(o => o.value === cstate.stage)) cstate.stage = "colormap";
      cstep.value = cstate.stage;
      title.textContent = `${cstate.image} — ${stagesById[cstate.stage].label}`;
      for (const [key, tier, im] of [["john", john, imJ], ["llm", llm, imL]]) {
        const s = sides[key], rec = im && im.stages[cstate.stage];
        s.cap.textContent = `${key === "john" ? "my code" : "LLM code"} — ${stagesById[cstate.stage].label}`;
        s.img.hidden = !rec;
        if (!rec) { s.ro.textContent = "not available for this image in this version"; s.note.textContent = ""; continue; }
        s.img.src = rec.file;
        fillReadout(s.ro, rec);
        s.note.textContent = captionFor(key, cstate.stage);
      }
    }
    renderCompare();
  }

  // ---------- offsets tables ----------
  function offsetsTable(container, tier, stageIds, filter = () => true, badCheck = null) {
    const t = el("table", { class: "offsets" });
    const head = el("tr", {}, el("th", {}, "image"));
    for (const id of stageIds) head.append(el("th", {}, stagesById[id].label + "  G / R · time"));
    t.append(el("thead", {}, head));
    const body = el("tbody");
    for (const im of tier.images.filter(filter)) {
      const tr = el("tr", {}, el("td", {}, im.name + (im.source === "extra" ? " *" : "")));
      for (const id of stageIds) {
        const r = im.stages[id];
        const td = el("td", {}, r && r.g ? `${fmt(r.g)} / ${fmt(r.r)}` + (r.seconds != null ? ` · ${r.seconds} s` : "") : "–");
        if (r && badCheck && badCheck(im, id, r)) td.classList.add("bad");
        tr.append(td);
      }
      body.append(tr);
    }
    t.append(body); container.innerHTML = ""; container.append(t);
  }
  const disagrees = (im, id, r) => {   // flag results more than 3 px from the tier's edge-feature result
    const ref = im.stages.pyr_feat; if (!ref || !ref.g || id === "pyr_feat") return false;
    const d = (a, b) => Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]));
    return d(r.g, ref.g) > 3 || d(r.r, ref.r) > 3;
  };
  if ($("#tbl-single")) offsetsTable($("#tbl-single"), john, ["single_l2", "single_ncc"], im => im.kind === "jpg");
  if ($("#tbl-pyramid")) offsetsTable($("#tbl-pyramid"), john, ["pyr_l2", "pyr_ncc", "pyr_feat"], () => true, disagrees);
  if (llm && $("#tbl-pyramid-llm")) offsetsTable($("#tbl-pyramid-llm"), llm, ["pyr_l2", "pyr_ncc", "pyr_feat", "similarity"], () => true, disagrees);

  // ---------- galleries ----------
  function gallery(container, tier, stageId, filter = () => true, captionFn) {
    container.innerHTML = "";
    for (const im of tier.images.filter(filter)) {
      const r = im.stages[stageId]; if (!r) continue;
      container.append(el("figure", {}, el("img", { src: r.file, loading: "lazy", onclick: () => openLightbox(im.large || r.file) }),
        el("figcaption", {}, captionFn ? captionFn(im, r) : im.name)));
    }
  }
  const offCap = (im, r) => `${im.name}  G${fmt(r.g)} R${fmt(r.r)}`;
  if ($("#gal-single")) gallery($("#gal-single"), john, "single_ncc", im => im.kind === "jpg", offCap);
  if ($("#gal-pyramid")) gallery($("#gal-pyramid"), john, "pyr_ncc", im => im.source === "provided" && im.kind === "tif", offCap);
  if ($("#gal-extra")) gallery($("#gal-extra"), john, "pyr_ncc", im => im.source === "extra", offCap);
  if ($("#gal-final")) gallery($("#gal-final"), john, "colormap", () => true);
  if (llm && $("#gal-final-llm")) gallery($("#gal-final-llm"), llm, "colormap", () => true);

  // ---------- fixed before/after blocks ----------
  document.querySelectorAll("[data-compare]").forEach(node => {
    const stageId = node.dataset.compare, tier = tiers[node.dataset.tier || "john"];
    if (!tier) return;
    const sel = el("select", { class: "picker" });
    for (const im of tier.images) if (im.stages[stageId]) sel.append(el("option", { value: im.name }, im.name));
    if (node.dataset.image && imageByName(tier, node.dataset.image)) sel.value = node.dataset.image;
    const panel = makePanel();
    const draw = () => panel.show(tier, imageByName(tier, sel.value), stageId);
    sel.addEventListener("change", draw);
    node.append(el("div", { class: "lab-row" }, el("span", { class: "label" }, "Image"), sel), panel.root);
    draw();
  });

  // ---------- LLM extras ----------
  if (llm && llm.color_matrix && $("#color-matrix"))
    $("#color-matrix").textContent = llm.color_matrix.map(row => row.map(v => v.toFixed(3).padStart(7)).join(" ")).join("\n");
  if (llm && llm.hubble && $("#hubble")) {
    const h = llm.hubble;
    const fig = (src, cap) => el("figure", {}, el("img", { src, onclick: () => openLightbox(src) }), el("figcaption", {}, cap));
    $("#hubble").append(
      el("div", { class: "readout" },
        el("span", {}, el("b", {}, "[O III] 1995 → Hα (dx, dy) "), fmt(h.offsets_dxdy_to_reference.b)),
        el("span", {}, el("b", {}, "[S II] → Hα (dx, dy) "), fmt(h.offsets_dxdy_to_reference.r)),
        el("span", {}, el("b", {}, "plate-scale ratio "), h.moving.g.resample_ratio.toFixed(4))),
      el("div", { class: "gallery three" }, fig(h.files.unaligned, "before: unaligned"), fig(h.files.aligned, "after: aligned"),
        fig(h.files.final, "final: contrast + gray-world")),
      el("div", { class: "gallery one" }, fig(h.files.zoom, "zoom on the pillar: before / after")));
  }
})();
