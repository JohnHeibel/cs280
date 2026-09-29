/* Image lab + before/after blocks. Driven by data/john.js (and data/llm.js later), both written by make_website.py. */
(function () {
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

  // ---------- data ----------
  const tiers = window.TIERS || {};
  const john = tiers.john, llm = tiers.llm;

  // ---------- lightbox (also used by the static galleries) ----------
  const lb = el("div", { class: "lightbox", onclick: () => lb.classList.remove("on") }, el("img"));
  document.body.append(lb);
  const openLightbox = (src) => { $("img", lb).src = src; lb.classList.add("on"); };
  document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("on"); });
  document.querySelectorAll(".gallery img").forEach(img => img.addEventListener("click", () => openLightbox(img.src)));

  if (!john) { const lab = $("#lab"); if (lab) lab.textContent = "data/john.js not found. Run make_website.py."; return; }

  for (const t of Object.values(tiers)) for (const set of Object.values(t.sets)) {
    set.byId = {};
    for (const st of set.stages) set.byId[st.id] = st;
  }
  const setNames = Object.keys(john.sets);
  const itemByName = (set, name) => set && set.items.find(i => i.name === name);
  const captionFor = (tierName, setName, stageId) => {
    const c = window.CAPTIONS || {};
    const pick = (t) => c[t] && c[t][setName] && c[t][setName][stageId];
    return pick(tierName) || pick("john") || "";
  };

  // ---------- readout of one stage record ----------
  function fillReadout(readout, rec) {
    readout.innerHTML = "";
    for (const [k, v] of rec.params || []) readout.append(el("span", {}, el("b", {}, k + " "), String(v)));
  }

  // ---------- before / after panel ----------
  function makePanel() {
    const imgB = el("img", { onclick: () => openLightbox(imgB.src) }), imgA = el("img", { onclick: () => openLightbox(imgA.src) });
    const capB = el("figcaption"), capA = el("figcaption");
    // each image sits in a fixed frame, so zooming out shrinks the picture without moving the layout
    const figB = el("figure", {}, el("div", { class: "frame" }, imgB), capB), figA = el("figure", {}, el("div", { class: "frame" }, imgA), capA);
    const pics = el("div", { class: "pics" }, figB, figA);
    const title = el("div", { class: "panel-title" });
    const readout = el("div", { class: "readout" });
    const note = el("div", { class: "caption" });
    const root = el("div", { class: "panel" }, title, pics, readout, note);
    return {
      root,
      setZoom(scale) {
        for (const img of [imgB, imgA]) img.style.transform = scale === 1 ? "" : `scale(${scale})`;
      },
      show(tierName, setName, item, stageId) {
        const set = tiers[tierName].sets[setName];
        this.showPair(tierName, setName, item, set.byId[stageId].before, stageId);
      },
      showPair(tierName, setName, item, leftId, rightId) {
        const set = tiers[tierName].sets[setName];
        const st = set.byId[rightId], rec = item && item.stages[rightId];
        const isDefault = leftId === st.before;
        title.textContent = `${item ? item.label : ""} — ` +
          (isDefault ? st.label : `${leftId ? set.byId[leftId].label : "—"} vs ${st.label}`);
        if (!rec) { pics.hidden = true; readout.textContent = "not available for this image"; note.textContent = ""; return; }
        pics.hidden = false;
        const beforeRec = leftId && item.stages[leftId];
        figB.hidden = !beforeRec;
        pics.classList.toggle("single", !beforeRec);
        if (beforeRec) { imgB.src = beforeRec.file; capB.textContent = (isDefault ? "before: " : "left: ") + set.byId[leftId].label; }
        imgA.src = rec.file; capA.textContent = beforeRec ? (isDefault ? "after: " : "right: ") + st.label : st.label;
        fillReadout(readout, rec);
        note.textContent = captionFor(tierName, setName, rightId);
      },
    };
  }

  // fill a <select> with a set's stages, grouped, skipping stages this item does not have
  function fillStageSelect(sel, sets, item) {
    sel.innerHTML = "";
    let group = null, og = null;
    for (const set of sets) for (const st of set.stages) {
      if (!(item && item.stages[st.id])) continue;
      if ([...sel.options].find(o => o.value === st.id)) continue;
      if (st.group !== group) { group = st.group; og = el("optgroup", { label: group }); sel.append(og); }
      og.append(el("option", { value: st.id }, st.label));
    }
  }

  const makeThumbs = (set, onpick) => {
    const t = el("div", { class: "thumbs" });
    for (const it of set.items) {
      const rec = it.stages[set.thumb] || Object.values(it.stages)[0];
      const b = el("button", { type: "button", onclick: () => onpick(it.name) },
        el("img", { src: rec.file, loading: "lazy", alt: it.label }), el("span", {}, it.label));
      b.dataset.name = it.name; t.append(b);
    }
    return t;
  };
  const markThumbs = (thumbs, name) => thumbs.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.name === name));

  // ---------- LLM section toggle (global, remembered) ----------
  const llmOn = () => document.body.classList.contains("llm");
  const toggles = [];
  const paintToggles = () => toggles.forEach(b => {
    b.classList.toggle("on", llmOn());
    if (!llm) { b.innerHTML = "LLM-code version: work in progress"; return; }
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
  if (lab) {
    const state = { set: setNames[0], item: {}, stage: {}, left: undefined, right: undefined };  // left/right override the step's default pair
    for (const n of setNames) { state.item[n] = john.sets[n].items[0].name; state.stage[n] = john.sets[n].default_stage; }
    // optional starting collection and image, e.g. <div id="lab" data-set="blends" data-image="sam_dario">
    if (lab.dataset.set && john.sets[lab.dataset.set]) {
      state.set = lab.dataset.set;
      if (itemByName(john.sets[state.set], lab.dataset.image)) state.item[state.set] = lab.dataset.image;
    }
    const resetPair = () => { state.left = state.right = undefined; };

    const tabs = el("div", { class: "tabs" });
    for (const n of setNames) {
      const b = el("button", { class: "shortcut", type: "button", onclick: () => { state.set = n; resetPair(); renderLab(); } }, john.sets[n].label);
      b.dataset.set = n; tabs.append(b);
    }
    const thumbsSlot = el("div", { class: "thumbs-slot" });
    const thumbsBySet = {};
    for (const n of setNames) thumbsBySet[n] = makeThumbs(john.sets[n], name => { state.item[n] = name; renderLab(); });
    const stepSel = el("select", { class: "picker big" });
    stepSel.addEventListener("change", () => { state.stage[state.set] = stepSel.value; resetPair(); renderLab(); });
    const shortcutSlot = el("div", { class: "shortcuts" });
    const leftSel = el("select", { class: "picker" }), rightSel = el("select", { class: "picker" });
    leftSel.addEventListener("change", () => { state.left = leftSel.value || null; renderLab(); });
    rightSel.addEventListener("change", () => { state.right = rightSel.value; renderLab(); });
    const panel = makePanel();

    // zoom out: shrinking an image is like stepping back from it, which is what makes a hybrid switch
    const zoomSlider = el("input", { type: "range", min: "1", max: "12", step: "0.25", value: "1", "aria-label": "zoom out" });
    const zoomReadout = el("span", { class: "hint" });
    const applyZoom = () => {
      const d = Number(zoomSlider.value);
      panel.setZoom(1 / d);
      zoomReadout.textContent = `shown at ${Math.round(100 / d)}% size`;
    };
    const zoomJump = (d) => el("button", { class: "shortcut", type: "button", onclick: () => { zoomSlider.value = d; applyZoom(); } }, `${Math.round(100 / d)}%`);
    zoomSlider.addEventListener("input", applyZoom);

    lab.append(
      el("div", { class: "lab-row" }, el("span", { class: "label" }, "Collection"), tabs),
      el("div", { class: "lab-row" }, el("span", { class: "label" }, "Image"), thumbsSlot),
      el("div", { class: "lab-row" }, el("span", { class: "label" }, "Step"), stepSel, shortcutSlot),
      el("div", { class: "lab-row sub" }, el("span", { class: "label" }, "Compare"), leftSel, el("span", { class: "vs" }, "vs"), rightSel,
        el("span", { class: "hint" }, "pick any two steps; the Step menu resets this")),
      el("div", { class: "lab-row zoom" }, el("span", { class: "label" }, "Zoom out"), zoomSlider, zoomJump(1), zoomJump(4), zoomJump(10), zoomReadout),
      el("div", { class: "panels" }, panel.root),
      el("div", { class: "stamp" }, `images generated ${john.generated}`));

    function renderLab() {
      const setName = state.set, set = john.sets[setName];
      const item = itemByName(set, state.item[setName]);
      tabs.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.set === setName));
      if (thumbsSlot.firstChild !== thumbsBySet[setName]) { thumbsSlot.innerHTML = ""; thumbsSlot.append(thumbsBySet[setName]); }
      markThumbs(thumbsBySet[setName], item.name);

      fillStageSelect(stepSel, [set], item);
      if (![...stepSel.options].find(o => o.value === state.stage[setName])) state.stage[setName] = set.default_stage;
      stepSel.value = state.stage[setName];

      shortcutSlot.innerHTML = "";
      for (const [label, stageId] of set.shortcuts || []) {
        shortcutSlot.append(el("button", { class: "shortcut" + (state.stage[setName] === stageId ? " on" : ""), type: "button",
          onclick: () => { state.stage[setName] = stageId; resetPair(); renderLab(); } }, label));
      }

      // left / right pair: default to the step's before/after unless overridden
      const avail = [...stepSel.options].map(o => o.value);
      const right = state.right && avail.includes(state.right) ? state.right : state.stage[setName];
      let left = state.left === undefined ? set.byId[right].before : state.left;
      if (left && !avail.includes(left)) left = null;
      leftSel.innerHTML = ""; rightSel.innerHTML = "";
      leftSel.append(el("option", { value: "" }, "(none)"));
      for (const id of avail) { leftSel.append(el("option", { value: id }, set.byId[id].label)); rightSel.append(el("option", { value: id }, set.byId[id].label)); }
      leftSel.value = left || ""; rightSel.value = right;

      panel.showPair("john", setName, item, left, right);
    }
    try { if (localStorage.getItem("llm") === "1" && llm) document.body.classList.add("llm"); } catch (e) {}
    renderLab();
    applyZoom();
  }
  document.querySelectorAll(".llm-toggle-slot").forEach(slot => slot.append(makeToggle()));
  paintToggles();

  // ---------- John vs LLM comparison lab (only once data/llm.js exists) ----------
  const cmpRoot = $("#compare-lab");
  if (cmpRoot && llm) {
    const cstate = { set: setNames[0], item: {}, stage: {} };
    for (const n of setNames) { cstate.item[n] = john.sets[n].items[0].name; cstate.stage[n] = john.sets[n].default_stage; }
    const ctabs = el("div", { class: "tabs" });
    for (const n of setNames) {
      const b = el("button", { class: "shortcut", type: "button", onclick: () => { cstate.set = n; renderCompare(); } }, john.sets[n].label);
      b.dataset.set = n; ctabs.append(b);
    }
    const cthumbsSlot = el("div", { class: "thumbs-slot" });
    const cthumbsBySet = {};
    for (const n of setNames) cthumbsBySet[n] = makeThumbs(john.sets[n], name => { cstate.item[n] = name; renderCompare(); });
    const cstep = el("select", { class: "picker big" });
    cstep.addEventListener("change", () => { cstate.stage[cstate.set] = cstep.value; renderCompare(); });
    const mkSide = () => {
      const img = el("img", { onclick: () => openLightbox(img.src) });
      const cap = el("figcaption"), ro = el("div", { class: "readout" }), note = el("div", { class: "caption" });
      return { fig: el("figure", {}, img, cap, ro, note), img, cap, ro, note };
    };
    const sides = { john: mkSide(), llm: mkSide() };
    const title = el("div", { class: "panel-title" });
    cmpRoot.append(
      el("div", { class: "lab-row" }, el("span", { class: "label" }, "Collection"), ctabs),
      el("div", { class: "lab-row" }, el("span", { class: "label" }, "Image"), cthumbsSlot),
      el("div", { class: "lab-row" }, el("span", { class: "label" }, "Step"), cstep,
        el("span", { class: "hint" }, "left: my code · right: LLM code, same image and same step")),
      el("div", { class: "panel compare" }, title, el("div", { class: "pics" }, sides.john.fig, sides.llm.fig)));
    function renderCompare() {
      const setName = cstate.set;
      const setJ = john.sets[setName], setL = llm.sets[setName];
      const imJ = itemByName(setJ, cstate.item[setName]), imL = itemByName(setL, cstate.item[setName]);
      ctabs.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.set === setName));
      if (cthumbsSlot.firstChild !== cthumbsBySet[setName]) { cthumbsSlot.innerHTML = ""; cthumbsSlot.append(cthumbsBySet[setName]); }
      markThumbs(cthumbsBySet[setName], cstate.item[setName]);
      const merged = { stages: {} };
      for (const im of [imJ, imL]) if (im) Object.assign(merged.stages, im.stages);
      fillStageSelect(cstep, setL ? [setJ, setL] : [setJ], merged);
      if (![...cstep.options].find(o => o.value === cstate.stage[setName])) cstate.stage[setName] = setJ.default_stage;
      cstep.value = cstate.stage[setName];
      const stageId = cstate.stage[setName];
      const st = setJ.byId[stageId] || (setL && setL.byId[stageId]);
      title.textContent = `${imJ ? imJ.label : cstate.item[setName]} — ${st.label}`;
      for (const [key, im] of [["john", imJ], ["llm", imL]]) {
        const s = sides[key], rec = im && im.stages[stageId];
        s.cap.textContent = `${key === "john" ? "my code" : "LLM code"} — ${st.label}`;
        s.img.hidden = !rec;
        if (!rec) { s.ro.textContent = "not available for this image in this version"; s.note.textContent = ""; continue; }
        s.img.src = rec.file;
        fillReadout(s.ro, rec);
        s.note.textContent = captionFor(key, setName, stageId);
      }
    }
    renderCompare();
  }

  // ---------- fixed before/after blocks ----------
  // <div data-compare="stage id" data-set="images|hybrids|blends" data-image="item name" data-left="optional stage id">
  document.querySelectorAll("[data-compare]").forEach(node => {
    const tierName = node.dataset.tier || "john", tier = tiers[tierName];
    if (!tier) return;
    const setName = node.dataset.set || "images", set = tier.sets[setName];
    if (!set) return;
    const stageId = node.dataset.compare;
    const leftId = node.dataset.left;
    const sel = el("select", { class: "picker" });
    for (const it of set.items) if (it.stages[stageId]) sel.append(el("option", { value: it.name }, it.label));
    if (node.dataset.image && itemByName(set, node.dataset.image)) sel.value = node.dataset.image;
    const panel = makePanel();
    const draw = () => {
      const item = itemByName(set, sel.value);
      if (leftId) panel.showPair(tierName, setName, item, leftId, stageId);
      else panel.show(tierName, setName, item, stageId);
    };
    sel.addEventListener("change", draw);
    node.append(el("div", { class: "lab-row" }, el("span", { class: "label" }, "Image"), sel), panel.root);
    draw();
  });

  // ---------- hybrid viewing distance ----------
  const hv = $("#hybrid-viewer");
  if (hv && john.sets.hybrids) {
    const set = john.sets.hybrids;
    let current = hv.dataset.image && itemByName(set, hv.dataset.image) ? hv.dataset.image : set.items[0].name;
    const thumbs = makeThumbs(set, name => { current = name; draw(); });
    const img = el("img", { alt: "hybrid image" });
    const stage = el("div", { class: "distance-stage" }, img);
    const slider = el("input", { type: "range", min: "1", max: "12", step: "0.25", value: "1", "aria-label": "viewing distance" });
    const readout = el("div", { class: "readout" });
    const jump = (d) => el("button", { class: "shortcut", type: "button", onclick: () => { slider.value = d; draw(); } },
      d === 1 ? "Up close" : d <= 4 ? "Arm's length" : "Across the room");
    const note = el("div", { class: "caption" });
    hv.append(
      el("div", { class: "lab-row" }, el("span", { class: "label" }, "Pair"), thumbs),
      stage,
      el("div", { class: "distance-controls" }, el("span", { class: "label hint" }, "Distance"), slider, jump(1), jump(4), jump(12)),
      readout, note);
    function draw() {
      const item = itemByName(set, current);
      const rec = item.stages.hybrid;
      markThumbs(thumbs, current);
      const d = Number(slider.value);
      img.src = rec.file;
      img.style.height = `${100 / d}%`;
      readout.innerHTML = "";
      readout.append(el("span", {}, el("b", {}, "shown at "), `${Math.round(100 / d)}% size`),
        el("span", {}, el("b", {}, "like standing "), `${d}x farther away`));
      for (const [k, v] of rec.params || []) readout.append(el("span", {}, el("b", {}, k + " "), String(v)));
      note.textContent = captionFor("john", "hybrid-viewer", current);
    }
    slider.addEventListener("input", draw);
    draw();
  }
})();
