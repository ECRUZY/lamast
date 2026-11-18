const CONFIG = window.CONFIG; // настройки в config.js


/* ---------- контакты из CONFIG ---------- */
(function applyConfig() {
  $$('[data-cfg="phone"], [data-cfg="phone2"]').forEach((a) => { a.textContent = CONFIG.phoneLabel; a.href = `tel:${CONFIG.phoneTel}`; });
  const addr = $('[data-cfg="address"]');
  if (addr) { addr.textContent = CONFIG.address; addr.href = "https://yandex.ru/maps/?text=" + encodeURIComponent(CONFIG.address); }
  const fd = $('[data-cfg="founded"]'); if (fd && CONFIG.founded) fd.textContent = `с ${CONFIG.founded} года`;
  $$('[data-cfg="insta"]').forEach((a) => (a.href = CONFIG.instagram));
  const y = $("[data-year]"); if (y) y.textContent = new Date().getFullYear();
})();

/* ---------- nav ---------- */
(function nav() {
  const navEl = $(".nav"), burger = $(".nav__burger"), fab = $(".fab");
  const onScroll = () => navEl.classList.toggle("is-solid", scrollY > 40);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });
  burger.addEventListener("click", () => {
    const open = navEl.classList.toggle("is-menu");
    burger.setAttribute("aria-expanded", open);
  });
  $$(".nav__links a").forEach((a) => a.addEventListener("click", () => { navEl.classList.remove("is-menu"); burger.setAttribute("aria-expanded", "false"); }));
  // плавающая кнопка ведёт в WhatsApp: номер и приветствие берём из CONFIG
  fab.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Здравствуйте! Пишу с сайта Lamast.")}`;
})();

/* ---------- hero: буквы включаются по одной ---------- */
(function neon() {
  const lines = $$("[data-neon]");
  const chars = [];
  lines.forEach((line) => {
    const text = line.textContent;
    line.textContent = "";
    [...text].forEach((c) => {
      const s = document.createElement("span");
      s.className = "ch"; s.textContent = c; s.setAttribute("aria-hidden", "true");
      line.appendChild(s); chars.push(s);
    });
  });
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { chars.forEach((c) => c.classList.add("on")); return; }
  // порядок включения немного перемешан, некоторые буквы «моргают»
  const order = chars.map((c, i) => ({ c, t: 250 + i * 70 + Math.random() * 160 }));
  order.forEach(({ c, t }, i) => {
    const flicker = i % 4 === 1;
    setTimeout(() => {
      c.classList.add("on");
      if (flicker) {
        setTimeout(() => c.classList.remove("on"), 90);
        setTimeout(() => c.classList.add("on"), 200);
        setTimeout(() => c.classList.remove("on"), 260);
        setTimeout(() => c.classList.add("on"), 420);
      }
    }, t);
  });
})();

/* ---------- услуги: каталог с мини-сценами ---------- */
const catalogEl = $("[data-services]");
catalogEl.innerHTML = PRODUCTS.map((p) => `
  <button type="button" class="cat cat--${p.id}" data-pick="${p.id}">
    <span class="cat__scene stage" data-scene="${p.id}" aria-hidden="true"></span>
    <span class="cat__body">
      <span class="cat__title">${esc(p.title)}</span>
      <span class="cat__text">${esc(p.desc)}</span>
      <span class="cat__go">Рассчитать</span>
    </span>
  </button>`).join("");
catalogEl.addEventListener("click", (e) => {
  const b = e.target.closest("[data-pick]");
  if (b) selectProduct(b.dataset.pick, true);
});

function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

/* ==========================================================
   Конструктор заказа
   ========================================================== */
const form = $("#briefForm");

// плитки изделий
$("[data-products]").innerHTML = PRODUCTS.map((p) => `
  <label class="prod">
    <input type="radio" name="product" value="${p.id}">
    <span>${svgIcon(p.icon)}<b>${esc(p.title)}</b></span>
  </label>`).join("");

$("[data-products]").addEventListener("change", (e) => selectProduct(e.target.value));

function selectProduct(id, scroll) {
  state.id = id;
  const p = product();
  state.opts = {};
  p.options.forEach((o) => (state.opts[o.key] = o.type === "text" ? o.value || "" : o.values[0]));
  state.w = p.size ? p.size.w : 0;
  state.h = p.size ? p.size.h : 0;
  state.qty = p.qty ? p.qty.value : 0;
  const radio = $(`input[name="product"][value="${id}"]`);
  radio.checked = true;
  renderConfig();
  update();
  if (scroll) {
    $("#brief").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    radio.parentElement.classList.remove("pulse"); void radio.offsetWidth; radio.parentElement.classList.add("pulse");
  }
}

function renderConfig() {
  const p = product();
  let html = p.options.map((o) => {
    if (o.type === "text") {
      return `<label class="field"><span>${esc(o.label)}</span>
        <input type="text" data-opt="${o.key}" value="${esc(state.opts[o.key])}" placeholder="${esc(o.placeholder || "")}" maxlength="40" autocomplete="off"></label>`;
    }
    return `<fieldset class="field"><legend>${esc(o.label)}</legend><div class="chips">
      ${o.values.map((v) => `<label class="chip"><input type="radio" name="opt-${o.key}" data-opt="${o.key}" value="${esc(v)}"${state.opts[o.key] === v ? " checked" : ""}><span>${esc(v)}</span></label>`).join("")}
    </div></fieldset>`;
  }).join("");

  const row = [];
  if (p.size) {
    row.push(`<label class="field"><span>${esc(p.size.wLabel || "Ширина")}, ${p.size.unit}</span>
      <input type="text" inputmode="decimal" data-dim="w" value="${fmt(state.w)}" autocomplete="off"></label>`);
    row.push(`<label class="field"><span>${esc(p.size.hLabel || "Высота")}, ${p.size.unit}</span>
      <input type="text" inputmode="decimal" data-dim="h" value="${fmt(state.h)}" autocomplete="off"></label>`);
  }
  if (p.qty) {
    row.push(`<label class="field"><span>Тираж, ${p.qty.unit}</span>
      <input type="text" inputmode="numeric" data-qty value="${state.qty}" autocomplete="off"></label>`);
  }
  if (row.length) html += `<div class="field-row field-row--${row.length}">${row.join("")}</div>`;
  if (p.qty && p.qty.presets) {
    html += `<div class="chips chips--sm">${p.qty.presets.map((n) => `<button type="button" class="chip-btn" data-qty-preset="${n}">${n} ${p.qty.unit}</button>`).join("")}</div>`;
  }
  if (p.id === "cards") html += `<div class="field" data-sides-wrap><span>Макеты сторон</span><div class="sides-up" data-sides></div></div>`;
  const cfg = $("[data-config]");
  cfg.innerHTML = html;
  cfg.classList.remove("is-in"); void cfg.offsetWidth; cfg.classList.add("is-in");
  syncSquare();
}

// квадратные формы: ширина = высоте
function syncSquare() {
  const p = product();
  const sq = p.size && p.size.square && p.size.square.includes(state.opts.shape);
  const hInput = $('[data-dim="h"]');
  if (!hInput) return;
  hInput.disabled = !!sq;
  if (sq) { state.h = state.w; hInput.value = fmt(state.w); }
}

$("[data-config]").addEventListener("input", (e) => {
  const t = e.target;
  if (t.dataset.opt) state.opts[t.dataset.opt] = t.value;
  if (t.dataset.dim) { state[t.dataset.dim] = num(t.value); if (t.dataset.dim === "w") syncSquare(); }
  if ("qty" in t.dataset) state.qty = num(t.value);
  if (t.name && t.name.startsWith("opt-shape")) syncSquare();
  update();
});
$("[data-config]").addEventListener("click", (e) => {
  const b = e.target.closest("[data-qty-preset]");
  if (!b) return;
  state.qty = +b.dataset.qtyPreset;
  $("[data-qty]").value = state.qty;
  update();
});
form.addEventListener("input", (e) => { if (["desc", "name", "city"].includes(e.target.name)) update(); });

/* ---------- файлы ---------- */
const drop = $("[data-drop]"), fileInput = $('input[type="file"]', drop), filesList = $("[data-files]");
const MAX_FILES = 6;

let pendingSide = null; // «лицевая» или «оборотная», если файл выбирают из слота визитки
function addFiles(list) {
  const side = pendingSide;
  pendingSide = null;
  for (const f of list) {
    if (state.files.length >= MAX_FILES) { note(`Можно добавить не более ${MAX_FILES} файлов.`, true); break; }
    if (state.files.some((x) => x.file.name === f.name && x.file.size === f.size)) continue;
    if (f.size > MAX_MB * 1048576) { note(`Файл «${f.name}» больше ${MAX_MB} МБ. Отправьте его в WhatsApp отдельно.`, true); continue; }
    const entry = { file: f, url: isImage(f) ? URL.createObjectURL(f) : null, status: "local", progress: 0, uuid: "" };
    if (side && isImage(f)) {
      // новая картинка для стороны заменяет старую
      const old = state.files.find((x) => x.side === side);
      if (old) removeEntry(old);
      entry.side = side;
    }
    state.files.push(entry);
    if (isImage(f)) state.pic = imgs().length - 1; // показываем только что добавленный
    startUpload(entry);
  }
  renderFiles(); update();
}

/* загрузка в Google Диск (через Google-скрипт) сразу после выбора, чтобы к отправке ссылка была готова */
const MAX_MB = 35;
const uploadOn = () => !!CONFIG.driveUploadUrl;
const readBase64 = (file) => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(String(r.result).split(",")[1] || "");
  r.onerror = rej;
  r.readAsDataURL(file);
});
function startUpload(entry) {
  entry.done = Promise.resolve();
  if (!uploadOn()) return;
  entry.status = "uploading";
  entry.done = new Promise(async (resolve) => {
    const finish = (ok) => {
      entry.status = ok ? "done" : "error";
      entry.xhr = null;
      renderFiles(); update();
      resolve();
    };
    let data;
    try { data = await readBase64(entry.file); } catch { return finish(false); }
    if (!state.files.includes(entry) && !entry.standalone) return resolve(); // файл убрали, пока читали
    // Обычный fetch с text/plain: браузер не шлёт проверочный OPTIONS, на который Google-скрипт не отвечает.
    // По той же причине нельзя следить за процентами отправки: показываем бегущую полосу.
    const ctrl = new AbortController();
    entry.xhr = ctrl;
    let r = {}, ok = false;
    try {
      const res = await fetch(CONFIG.driveUploadUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ name: entry.file.name, type: entry.file.type, data, product: product().title }),
        signal: ctrl.signal,
      });
      r = await res.json();
      ok = res.ok && r.ok && /^[\w-]{20,}$/.test(r.id || "");
    } catch (err) {
      if (err.name === "AbortError") return resolve();
    }
    if (ok) entry.uuid = r.id;
    finish(ok);
  });
}
const fileStatus = (x) => ({
  uploading: "Загружается…",
  done: "Загружен",
  error: "Не загрузился, отправьте файл в WhatsApp отдельно",
  local: prettySize(x.file.size),
}[x.status]);

// страница заказа на нашем сайте: на ней все макеты с кнопками «Скачать»
function orderPageUrl() {
  const order = { front: 0, back: 1 };
  const done = state.files.filter((x) => x.uuid)
    .sort((a, b) => (order[a.side] ?? (a.url ? 2 : 3)) - (order[b.side] ?? (b.url ? 2 : 3)));
  if (!done.length) return "";
  // короткая ссылка: только id файлов Google Диска через точку
  const u = new URL("z", location.href);
  // и код заказа, чтобы на странице заказа нарисовать изделие с макетом, как в конструкторе
  const np = product().id === "neon" && state.neonPreview && state.neonPreview.uuid ? `&n=${state.neonPreview.uuid}` : "";
  return `${u.origin}${u.pathname}?${done.map((x) => x.uuid).join(".")}&c=${orderCode()}${np}`;
}

function renderFiles() {
  filesList.innerHTML = state.files.map((x, i) => {
    const ext = (x.file.name.split(".").pop() || "файл").slice(0, 4).toUpperCase();
    const thumb = x.url ? `<img class="thumb" src="${x.url}" alt="">` : `<span class="thumb">${esc(ext)}</span>`;
    return `<li class="is-${x.status}">${thumb}<span class="meta"><b>${esc(x.file.name)}</b><small data-status="${i}">${esc(fileStatus(x))}</small>
      ${x.status === "uploading" ? `<span class="bar bar--run"></span>` : ""}</span>
      <button type="button" data-remove="${i}" aria-label="Убрать ${esc(x.file.name)}">×</button></li>`;
  }).join("");
}
function removeEntry(x) {
  const i = state.files.indexOf(x);
  if (i < 0) return;
  state.files.splice(i, 1);
  if (x.xhr) x.xhr.abort();
  if (x.url) URL.revokeObjectURL(x.url);
}
fileInput.addEventListener("change", () => { addFiles(fileInput.files); fileInput.value = ""; });
fileInput.addEventListener("cancel", () => { pendingSide = null; });
filesList.addEventListener("click", (e) => {
  const b = e.target.closest("[data-remove]"); if (!b) return;
  const [x] = state.files.splice(+b.dataset.remove, 1);
  if (x.xhr) x.xhr.abort(); // AbortController
  if (x.url) URL.revokeObjectURL(x.url);
  renderFiles(); update();
});
["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("is-over"); }));
["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("is-over"); }));
drop.addEventListener("drop", (e) => addFiles(e.dataTransfer.files));

/* ==========================================================
   Предпросмотр изделия
   ========================================================== */
const stage = $("[data-stage]"), stageCap = $("[data-stage-cap]");

function renderScenes() {
  const saved = { id: state.id, opts: state.opts, w: state.w, h: state.h, files: state.files };
  demoMode = true;
  $$("[data-scene]").forEach((el) => {
    const p = PRODUCTS.find((x) => x.id === el.dataset.scene);
    Object.assign(state, { id: p.id, opts: defaults(p), w: p.size ? p.size.w : 0, h: p.size ? p.size.h : 0, files: [] });
    const { bg, html } = VIEWS[p.view](el.clientWidth || 300, el.clientHeight || 220);
    el.className = "cat__scene stage " + bg;
    el.innerHTML = html;
  });
  demoMode = false;
  Object.assign(state, saved);
}

function renderStage() {
  const p = product();
  const sw = stage.clientWidth || 480, sh = stage.clientHeight || 380;
  const { bg, html } = VIEWS[p.view](sw, sh);
  stage.className = "stage " + bg;
  stage.innerHTML = html;
  const parts = p.options.filter((o) => o.type !== "text").map((o) => state.opts[o.key]).filter((v) => !/^(Нужен|Нужна|Не нужен|Не нужна|Не знаю)$/.test(v));
  stageCap.textContent = `${p.title}: ${parts.join(", ").toLowerCase()}`;
}

/* ---------- текст сообщения ---------- */
function buildMessage() {
  const p = product();
  const name = form.name.value.trim();
  const L = [`Здравствуйте!${name ? ` Меня зовут ${name}.` : ""} Заявка с сайта Lamast.`, "", `Изделие: ${p.title}`];
  p.options.forEach((o) => {
    const v = (state.opts[o.key] || "").trim();
    if (v) L.push(`• ${o.label}: ${v}`);
  });
  if (p.size && (state.w || state.h)) L.push(`• Размер: ${fmt(state.w)} × ${fmt(state.h)} ${p.size.unit}`);
  if (p.qty && state.qty) L.push(`• Тираж: ${state.qty} ${p.qty.unit}`);
  const city = needsAddress() ? form.city.value.trim() : "";
  if (city) L.push(`• Адрес: ${city}`);
  const desc = form.desc.value.trim();
  if (desc) L.push("", desc);
  const page = orderPageUrl();
  const notUploaded = state.files.filter((x) => !x.uuid);
  if (page) L.push("", "📎 Ссылка на макет:", page);
  if (notUploaded.length) L.push("", `📎 ${page ? "Ещё файлы" : "Макет"}: ${notUploaded.map((x) => x.file.name).join(", ")}`);
  return L.join("\n");
}

const stageWrap = $(".stage-wrap"), stageTools = $("[data-stage-tools]"), stagePics = $("[data-stage-pics]");
// адрес объекта нужен только там, где есть монтаж
function needsAddress() {
  const p = product();
  if (p.id === "mount") return true;
  return state.opts.mount === "Нужен";
}
function renderSides() {
  const box = $("[data-sides]");
  if (!box) return;
  const two = state.opts.sides === "Двусторонние";
  $("[data-sides-wrap]").hidden = !two;
  if (!two) return;
  box.innerHTML = [["front", "Лицевая сторона"], ["back", "Оборотная сторона"]].map(([key, label]) => {
    const img = sideImg(key);
    return `<button type="button" class="side-slot${img ? " is-set" : ""}" data-side-upload="${key}">
      <span class="side-slot__thumb"${img ? ` style="background-image:url('${img.url}')"` : ""}>${img ? "" : "+"}</span>
      <span><b>${label}</b><small>${img ? "Нажмите, чтобы заменить" : "Загрузить макет"}</small></span>
    </button>`;
  }).join("");
}
$("[data-config]").addEventListener("click", (e) => {
  const b = e.target.closest("[data-side-upload]");
  if (!b) return;
  pendingSide = b.dataset.sideUpload;
  fileInput.click();
});
function update() {
  renderSides();
  const showCity = needsAddress();
  $("[data-city-field]").hidden = !showCity;
  $("[data-contact-row]").classList.toggle("field-row--1", !showCity);
  renderStage();
  const list = imgs();
  const has = list.length > 0;
  stageWrap.classList.toggle("has-art", has);
  stageTools.hidden = !has;
  stagePics.innerHTML = list.length > 1
    ? list.map((x, i) => `<button type="button" data-pic="${i}" aria-label="Показать ${esc(x.file.name)}" aria-pressed="${i === Math.min(state.pic, list.length - 1)}"><img src="${x.url}" alt=""></button>`).join("")
    : "";
  $$("[data-fit]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.fit === state.fit));
}
$("[data-stage-upload]").addEventListener("click", () => fileInput.click());
$("[data-stage-replace]").addEventListener("click", () => fileInput.click());
stageTools.addEventListener("click", (e) => {
  const f = e.target.closest("[data-fit]");
  if (f) { state.fit = f.dataset.fit; update(); }
  const pic = e.target.closest("[data-pic]");
  if (pic) { state.pic = +pic.dataset.pic; update(); }
});
// перетаскивание файла прямо на предпросмотр
["dragenter", "dragover"].forEach((ev) => stageWrap.addEventListener(ev, (e) => { e.preventDefault(); stageWrap.classList.add("is-over"); }));
["dragleave", "drop"].forEach((ev) => stageWrap.addEventListener(ev, (e) => { e.preventDefault(); stageWrap.classList.remove("is-over"); }));
stageWrap.addEventListener("drop", (e) => addFiles(e.dataTransfer.files));
let rT; addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(() => { renderStage(); renderScenes(); }, 120); });

/* ---------- заметка под кнопкой ---------- */
const noteEl = $("[data-note]");
function note(msg, err) { noteEl.textContent = msg; noteEl.classList.toggle("is-error", !!err); }

/* ---------- отправка в WhatsApp ---------- */
const waUrl = () => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(buildMessage())}`;
const submitBtn = $('button[type="submit"]', form);
const submitHTML = submitBtn.innerHTML;
// неон по рисунку: при отправке «запекаем» готовый вид и загружаем его отдельной картинкой для страницы заказа
function ensureNeonPreview() {
  if (product().id !== "neon" || !uploadOn()) return null;
  const img = firstImg();
  const r = img && neonCache.get(img.url);
  if (!r || r instanceof Promise) return null;
  const contour = state.opts.base === "Акрил по контуру";
  const key = `${img.url}|${state.opts.color}|${contour}`;
  if (state.neonPreview && state.neonPreview.key === key) return state.neonPreview;
  const entry = { key, uuid: "", status: "local", progress: 0, standalone: true, url: null };
  entry.ready = bakeNeon(r, state.opts.color, contour)
    .then((blob) => { entry.file = new File([blob], "неон-превью.png", { type: "image/png" }); startUpload(entry); return entry.done; })
    .catch(() => {});
  state.neonPreview = entry;
  return entry;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const np = ensureNeonPreview();
  const pending = state.files.filter((x) => x.status === "uploading").map((x) => x.done);
  if (np && !np.uuid) pending.push(np.ready);
  if (!pending.length) {
    if (!window.open(waUrl(), "_blank", "noopener")) location.href = waUrl();
    return;
  }
  // окно открываем сразу (иначе браузер его заблокирует), адрес подставим, когда файлы загрузятся
  const win = window.open("", "_blank");
  if (win) win.opener = null;
  submitBtn.disabled = true;
  submitBtn.textContent = "Загружаем макет…";
  await Promise.all(pending);
  submitBtn.disabled = false;
  submitBtn.innerHTML = submitHTML;
  if (win) win.location.href = waUrl();
  else location.href = waUrl();
});

/* ==========================================================
   Обрезка макета: рамку двигают и тянут за углы, можно повернуть.
   «Сохранить» заменяет макет обрезанной версией (она же уходит на Диск),
   «Исходник» возвращает файл, который загрузил клиент.
   ========================================================== */
const crop = {
  modal: $("#cropModal"), area: $("[data-crop-area]"), stage: $("[data-crop-stage]"),
  canvas: $("[data-crop-canvas]"), box: $("[data-crop-box]"),
  entry: null, img: null, rot: 0, src: null, scale: 1, ratio: "product", r: { x: 0, y: 0, w: 0, h: 0 },
};

// пропорции изделия, под которые удобно кадрировать макет
function productRatio() {
  const p = product(), o = state.opts;
  if (p.id === "cards") return 90 / 50;
  if (p.id === "mobile") return o.type.includes("150") ? 150 / 200 : o.type.includes("84") ? 84 / 200 : 60 / 100;
  if (p.id === "letters" || p.id === "holders" || !p.size || !state.w || !state.h) return null;
  if (p.size.square && p.size.square.includes(o.shape)) return 1;
  if (o.shape === "Овал" && Math.abs(state.w - state.h) < 0.01) return 1.45;
  return state.w / state.h;
}
const cropRatio = () => crop.ratio === "free" ? null : crop.ratio === "1" ? 1 : productRatio();

function loadImage(url) {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
}

// исходник с учётом поворота — на отдельном холсте в полном разрешении
function buildSource() {
  const i = crop.img, turned = crop.rot % 180 !== 0;
  const c = document.createElement("canvas");
  c.width = turned ? i.naturalHeight : i.naturalWidth;
  c.height = turned ? i.naturalWidth : i.naturalHeight;
  const g = c.getContext("2d");
  g.translate(c.width / 2, c.height / 2);
  g.rotate((crop.rot * Math.PI) / 180);
  g.drawImage(i, -i.naturalWidth / 2, -i.naturalHeight / 2);
  crop.src = c;
}

// вписываем картинку в окно и ставим рамку по центру
function layoutCrop(resetBox = true) {
  const a = crop.area.getBoundingClientRect();
  const pad = 40, maxW = Math.max(100, a.width - pad), maxH = Math.max(100, a.height - pad);
  crop.scale = Math.min(maxW / crop.src.width, maxH / crop.src.height, 1);
  const w = Math.round(crop.src.width * crop.scale), h = Math.round(crop.src.height * crop.scale);
  const dpr = window.devicePixelRatio || 1;
  crop.canvas.width = w * dpr; crop.canvas.height = h * dpr;
  crop.canvas.style.width = w + "px"; crop.canvas.style.height = h + "px";
  crop.canvas.getContext("2d").drawImage(crop.src, 0, 0, w * dpr, h * dpr);
  if (resetBox) fitBox();
  drawBox();
}
function fitBox() {
  const W = parseFloat(crop.canvas.style.width), H = parseFloat(crop.canvas.style.height), k = cropRatio();
  let w = W * 0.9, h = H * 0.9;
  if (k) { if (w / h > k) w = h * k; else h = w / k; }
  crop.r = { x: (W - w) / 2, y: (H - h) / 2, w, h };
}
function drawBox() {
  const r = crop.r;
  Object.assign(crop.box.style, { left: r.x + "px", top: r.y + "px", width: r.w + "px", height: r.h + "px" });
}
function setRatioButtons() {
  const hasProduct = !!productRatio();
  $$("[data-ratio]", crop.modal).forEach((b) => {
    b.setAttribute("aria-pressed", b.dataset.ratio === crop.ratio);
    if (b.dataset.ratio === "product") b.hidden = !hasProduct;
  });
}

async function openCrop() {
  const entry = firstImg();
  if (!entry) return;
  crop.entry = entry;
  crop.rot = 0;
  crop.ratio = productRatio() ? "product" : "free";
  // всегда кадрируем от исходника, а не от прошлой обрезки
  crop.img = await loadImage(entry.originalUrl || entry.url);
  buildSource();
  setRatioButtons();
  crop.modal.showModal();
  requestAnimationFrame(() => layoutCrop(true));
}

// перетаскивание рамки и углов
let drag = null;
crop.box.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  crop.box.setPointerCapture(e.pointerId);
  drag = { h: e.target.dataset.h || "move", x: e.clientX, y: e.clientY, r: { ...crop.r } };
});
crop.box.addEventListener("pointermove", (e) => {
  if (!drag) return;
  const W = parseFloat(crop.canvas.style.width), H = parseFloat(crop.canvas.style.height);
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y, o = drag.r, k = cropRatio(), min = 30;
  let { x, y, w, h } = o;
  if (drag.h === "move") {
    x = Math.min(Math.max(0, o.x + dx), W - o.w);
    y = Math.min(Math.max(0, o.y + dy), H - o.h);
  } else {
    const left = drag.h.includes("w"), top = drag.h.includes("n");
    // противоположный угол стоит на месте
    const ax = left ? o.x + o.w : o.x, ay = top ? o.y + o.h : o.y;
    w = Math.max(min, left ? o.w - dx : o.w + dx);
    h = Math.max(min, top ? o.h - dy : o.h + dy);
    w = Math.min(w, left ? ax : W - ax);
    h = Math.min(h, top ? ay : H - ay);
    if (k) {
      if (w / h > k) w = h * k; else h = w / k;
    }
    x = left ? ax - w : ax;
    y = top ? ay - h : ay;
  }
  crop.r = { x, y, w, h };
  drawBox();
});
["pointerup", "pointercancel"].forEach((ev) => crop.box.addEventListener(ev, () => (drag = null)));

$("[data-crop-ratio]").addEventListener("click", (e) => {
  const b = e.target.closest("[data-ratio]");
  if (!b) return;
  crop.ratio = b.dataset.ratio;
  setRatioButtons();
  fitBox(); drawBox();
});
$("[data-crop-rotate]").addEventListener("click", () => {
  crop.rot = (crop.rot + 90) % 360;
  buildSource();
  layoutCrop(true);
});
$("[data-crop-close]").addEventListener("click", () => crop.modal.close());
crop.modal.addEventListener("click", (e) => { if (e.target === crop.modal) crop.modal.close(); });
addEventListener("resize", () => { if (crop.modal.open) layoutCrop(true); });

// «Исходник»: вернуть файл клиента без обрезки
$("[data-crop-reset]").addEventListener("click", () => {
  const en = crop.entry;
  if (en && en.original) {
    URL.revokeObjectURL(en.url);
    replaceFile(en, en.original, en.originalUrl);
    en.original = null; en.originalUrl = null;
  }
  crop.modal.close();
});

$("[data-crop-save]").addEventListener("click", async () => {
  const en = crop.entry, s = 1 / crop.scale, r = crop.r;
  const sx = Math.round(r.x * s), sy = Math.round(r.y * s);
  const sw = Math.max(1, Math.round(r.w * s)), sh = Math.max(1, Math.round(r.h * s));
  const out = document.createElement("canvas");
  out.width = sw; out.height = sh;
  out.getContext("2d").drawImage(crop.src, sx, sy, sw, sh, 0, 0, sw, sh);
  const src = en.original || en.file;
  const png = src.type === "image/png" || src.type === "image/webp";
  const blob = await new Promise((res) => out.toBlob(res, png ? "image/png" : "image/jpeg", 0.95));
  if (!blob) return crop.modal.close();
  const base = src.name.replace(/\.[^.]+$/, "");
  const file = new File([blob], `${base}-обрезка.${png ? "png" : "jpg"}`, { type: blob.type });
  if (!en.original) { en.original = en.file; en.originalUrl = en.url; }
  else URL.revokeObjectURL(en.url);
  replaceFile(en, file, URL.createObjectURL(blob));
  crop.modal.close();
});

// подменяем файл в заявке и загружаем новую версию на Диск
function replaceFile(entry, file, url) {
  if (entry.xhr) entry.xhr.abort();
  entry.file = file;
  entry.url = url;
  entry.uuid = "";
  entry.status = "local";
  startUpload(entry);
  renderFiles(); update();
}
$("[data-crop-open]").addEventListener("click", openCrop);

// неон из рисунка готовится в фоне: когда готов, перерисовываем предпросмотр
window.onNeonReady = () => renderStage();

/* старт */
selectProduct(PRODUCTS[0].id);
renderScenes();
if (document.fonts) document.fonts.ready.then(renderScenes);
