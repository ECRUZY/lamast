/* ==========================================================
   НАСТРОЙКИ — заменить на реальные данные
   ========================================================== */
const CONFIG = {
  whatsapp: "79659400066",          // номер WhatsApp без +, пробелов и скобок
  phoneLabel: "+7 965 940-00-66",   // как показывать номер на сайте
  phoneTel: "+79659400066",
  address: "Грозный, ул. Краснофлотская, 7А",
  founded: "2016",
  instagram: "https://instagram.com/lamast_095",
};

/* ==========================================================
   Каталог: из него строятся и список услуг, и конструктор.
   options: choice — выбор одного варианта; text — поле ввода.
   size: единицы и значения по умолчанию; square — формы, где ширина = высоте.
   ========================================================== */
const PRODUCTS = [
  {
    id: "sticker", title: "Наклейки и стикеры", icon: "sticker", view: "sticker",
    desc: "Круглые, квадратные и фигурные наклейки на белой или прозрачной плёнке, с глянцевым или матовым покрытием.",
    options: [
      { key: "material", label: "Материал", values: ["Белая плёнка", "Прозрачная плёнка", "Бумага"] },
      { key: "finish", label: "Покрытие", values: ["Глянцевая", "Матовая"] },
      { key: "shape", label: "Форма", values: ["Круг", "Овал", "Квадрат", "Прямоугольник", "Скруглённые углы", "По контуру"] },
    ],
    size: { unit: "см", w: 8, h: 8, square: ["Круг", "Квадрат"] },
    qty: { unit: "шт", value: 100 },
  },
  {
    id: "banner", title: "Баннеры", icon: "banner", view: "banner",
    desc: "Баннеры с люверсами, карманами или на металлическом каркасе 3×2 м.",
    options: [
      { key: "type", label: "Вид", values: ["Обычный", "На каркасе", "Баннерная сетка"] },
      { key: "edge", label: "Обработка", values: ["Люверсы", "Кармашки", "Проклейка края", "Без обработки"] },
      { key: "mount", label: "Монтаж", values: ["Нужен", "Не нужен"] },
    ],
    size: { unit: "м", w: 3, h: 2 },
  },
  {
    id: "film", title: "Плёнка и аппликация", icon: "film", view: "film",
    desc: "Плёнка с ламинацией, перфорированная плёнка для витрин, плоттерная резка, монтаж на ПВХ и композит.",
    options: [
      { key: "type", label: "Вид", values: ["С ламинацией", "Перфорированная", "Плоттерная резка", "Интерьерная"] },
      { key: "finish", label: "Покрытие", values: ["Глянцевая", "Матовая"] },
      { key: "base", label: "Основа", values: ["Без основы", "ПВХ 3 мм", "ПВХ 5 мм", "Композит"] },
      { key: "mount", label: "Монтаж", values: ["Нужен", "Не нужен"] },
    ],
    size: { unit: "м", w: 2, h: 1.2 },
  },
  {
    id: "letters", title: "Объёмные буквы", icon: "letters", view: "letters",
    desc: "Световые, контражурные, несветовые, псевдообъёмные, композитные и акриловые буквы.",
    options: [
      { key: "text", label: "Текст вывески", type: "text", placeholder: "Например, КОФЕ", value: "КОФЕ" },
      { key: "type", label: "Тип букв", values: ["Световые", "Контражурные", "Несветовые", "Псевдообъёмные", "Композитные", "Акриловые"] },
      { key: "base", label: "Подложка", values: ["Без подложки", "Композитное основание", "Композитный короб"] },
      { key: "mount", label: "Монтаж", values: ["Нужен", "Не нужен"] },
    ],
    size: { unit: "см", w: 300, h: 50, wLabel: "Длина вывески", hLabel: "Высота букв" },
  },
  {
    id: "lightbox", title: "Световые короба", icon: "lightbox", view: "lightbox",
    desc: "Односторонние и двусторонние световые короба прямоугольной и круглой формы.",
    options: [
      { key: "sides", label: "Стороны", values: ["Односторонний", "Двусторонний"] },
      { key: "shape", label: "Форма", values: ["Прямоугольник", "Круг", "Скруглённые углы"] },
      { key: "mount", label: "Монтаж", values: ["Нужен", "Не нужен"] },
    ],
    size: { unit: "см", w: 120, h: 60, square: ["Круг"] },
  },
  {
    id: "sign", title: "Таблички", icon: "sign", view: "sign",
    desc: "Таблички на жести, ПВХ, композите и акриле: режим работы, адресные и кабинетные таблички.",
    options: [
      { key: "base", label: "Основа", values: ["Жесть", "Жесть с подложкой", "ПВХ", "Композит", "Акрил"] },
      { key: "shape", label: "Форма", values: ["Прямоугольник", "Скруглённые углы", "Круг", "Овал"] },
    ],
    size: { unit: "см", w: 40, h: 30, square: ["Круг"] },
    qty: { unit: "шт", value: 1 },
  },
  {
    id: "mobile", title: "Ролл-апы и штендеры", icon: "rollup", view: "mobile",
    desc: "Ролл-апы 200×84 и 200×150 см. Деревянные штендеры 100×60 см (металлические штендеры в Грозном не допускаются).",
    options: [
      { key: "type", label: "Вид", values: ["Ролл-ап 200×84", "Ролл-ап 200×150", "Деревянный штендер 100×60"] },
    ],
    qty: { unit: "шт", value: 1 },
  },
  {
    id: "interior", title: "Интерьерная печать", icon: "interior", view: "interior",
    desc: "Фотообои, холсты, постеры и плёнка на стекло для кафе, офисов и магазинов.",
    options: [
      { key: "material", label: "Материал", values: ["Интерьерная плёнка", "Фотообои", "Холст", "Бумага / постер"] },
      { key: "finish", label: "Покрытие", values: ["Матовая", "Глянцевая"] },
      { key: "mount", label: "Монтаж", values: ["Нужен", "Не нужен"] },
    ],
    size: { unit: "м", w: 3, h: 2.5 },
  },
  {
    id: "photozone", title: "Фотозоны", icon: "photozone", view: "photozone",
    desc: "Пресс-воллы, арки и фигурные фотозоны для свадеб, дней рождения, открытий и корпоративных мероприятий.",
    options: [
      { key: "format", label: "Формат", values: ["Пресс-волл", "Арка", "Фигурная"] },
      { key: "event", label: "Повод", values: ["Свадьба", "День рождения", "Открытие", "Корпоратив", "Выпускной"] },
      { key: "mount", label: "Монтаж на площадке", values: ["Нужен", "Не нужен"] },
    ],
    size: { unit: "м", w: 3, h: 2.2 },
  },
  {
    id: "cards", title: "Визитки", icon: "cards", view: "cards",
    desc: "Односторонние и двусторонние визитки, с ламинацией и скруглёнными углами.",
    options: [
      { key: "sides", label: "Печать", values: ["Двусторонние", "Односторонние"] },
      { key: "lam", label: "Ламинация", values: ["Без ламинации", "Матовая", "Глянцевая"] },
      { key: "corners", label: "Углы", values: ["Прямые", "Скруглённые"] },
    ],
    qty: { unit: "шт", value: 500, presets: [100, 200, 500, 1000] },
  },
  {
    id: "holders", title: "Визитницы", icon: "holder", view: "holders",
    desc: "Настольные и настенные визитницы из акрила.",
    options: [
      { key: "type", label: "Вид", values: ["Настольная", "Настенная", "Карманная"] },
      { key: "material", label: "Материал", values: ["Прозрачный акрил", "Цветной акрил"] },
    ],
    qty: { unit: "шт", value: 1 },
  },
  {
    id: "mount", title: "Каркасы и монтаж", icon: "mount", view: "mount",
    desc: "Монтаж вывесок и баннеров, оклейка витрин, изготовление каркасов, демонтаж старых конструкций.",
    options: [
      { key: "what", label: "Вид работ", values: ["Монтаж вывески", "Монтаж баннера", "Оклейка плёнкой", "Демонтаж"] },
      { key: "frame", label: "Каркас", values: ["Нужен", "Не нужен", "Не знаю"] },
    ],
  },
];

const ICONS = {
  sticker: '<path d="M20 12v1a8 8 0 1 1-8-8h1"/><path d="M13 5c0 4 2 6 7 7"/><path d="M13 5h1a6 6 0 0 1 6 6v1"/>',
  banner: '<rect x="3" y="5" width="18" height="11" rx="1"/><circle cx="5.5" cy="7.5" r=".6"/><circle cx="18.5" cy="7.5" r=".6"/><circle cx="5.5" cy="13.5" r=".6"/><circle cx="18.5" cy="13.5" r=".6"/><path d="M7 16v4M17 16v4"/>',
  film: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 4l7 7M14 20l7-7"/><path d="M12 4v16"/>',
  letters: '<path d="M4 19 8 5l4 14M5.5 14h5"/><path d="M14 5h4a3 3 0 0 1 0 6h-4zM14 11h4.5a4 4 0 0 1 0 8H14z"/>',
  lightbox: '<rect x="3" y="6" width="18" height="11" rx="1.5"/><path d="M7 3v3M12 2v4M17 3v3M8 21h8"/>',
  sign: '<rect x="4" y="6" width="16" height="12" rx="2"/><circle cx="7" cy="9" r=".6"/><circle cx="17" cy="9" r=".6"/><circle cx="7" cy="15" r=".6"/><circle cx="17" cy="15" r=".6"/><path d="M9.5 12h5"/>',
  rollup: '<path d="M8 3h8v15H8zM6 21h12M9 18v3M15 18v3"/><path d="M10 7h4"/>',
  interior: '<path d="M3 20h18M5 20V5h14v15"/><path d="m5 15 4-4 4 4 2-2 4 4"/><circle cx="15" cy="9" r="1.5"/>',
  photozone: '<path d="M5 21V10a7 7 0 0 1 14 0v11"/><path d="M3 21h18"/><path d="M12 9.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z"/>',
  cards: '<rect x="2.5" y="7" width="15" height="10" rx="1.5"/><path d="M6.5 4h13a2 2 0 0 1 2 2v9"/><path d="M5.5 11h6M5.5 13.5h4"/>',
  holder: '<path d="M4 20h16l-2-9H6z"/><path d="M8 11V5h8v6"/><path d="M10 8h4"/>',
  mount: '<path d="M14 4l6 6-9 9H5v-6z"/><path d="M12 6l6 6"/><path d="M3 21h8"/>',
};

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const svgIcon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k] || ""}</svg>`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const num = (v) => { const n = parseFloat(String(v).replace(",", ".")); return isFinite(n) && n > 0 ? n : 0; };
const fmt = (n) => String(+n.toFixed(2)).replace(".", ",");
const isImage = (f) => /^image\/(png|jpe?g|webp|gif|svg\+xml|avif)$/.test(f.type);
const prettySize = (b) => (b > 1048576 ? (b / 1048576).toFixed(1) + " МБ" : Math.max(1, Math.round(b / 1024)) + " КБ");

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
  const navEl = $(".nav"), burger = $(".nav__burger"), fab = $(".fab"), brief = $("#brief");
  const onScroll = () => navEl.classList.toggle("is-solid", scrollY > 40);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });
  burger.addEventListener("click", () => {
    const open = navEl.classList.toggle("is-menu");
    burger.setAttribute("aria-expanded", open);
  });
  $$(".nav__links a").forEach((a) => a.addEventListener("click", () => { navEl.classList.remove("is-menu"); burger.setAttribute("aria-expanded", "false"); }));
  // прячем плавающую кнопку, когда форма на экране
  new IntersectionObserver(([e]) => fab.classList.toggle("is-hidden", e.isIntersecting), { threshold: 0.15 }).observe(brief);
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
const state = { id: PRODUCTS[0].id, opts: {}, w: 0, h: 0, qty: 0, files: [], fit: "cover", pic: 0 };
const product = () => PRODUCTS.find((p) => p.id === state.id);

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

function addFiles(list) {
  for (const f of list) {
    if (state.files.length >= MAX_FILES) { note(`Можно добавить не более ${MAX_FILES} файлов.`, true); break; }
    if (state.files.some((x) => x.file.name === f.name && x.file.size === f.size)) continue;
    state.files.push({ file: f, url: isImage(f) ? URL.createObjectURL(f) : null });
    if (isImage(f)) state.pic = imgs().length - 1; // показываем только что добавленный
  }
  renderFiles(); update();
}

function renderFiles() {
  filesList.innerHTML = state.files.map((x, i) => {
    const ext = (x.file.name.split(".").pop() || "файл").slice(0, 4).toUpperCase();
    const thumb = x.url ? `<img class="thumb" src="${x.url}" alt="">` : `<span class="thumb">${esc(ext)}</span>`;
    return `<li>${thumb}<span class="meta"><b>${esc(x.file.name)}</b><small>${prettySize(x.file.size)}</small></span>
      <button type="button" data-remove="${i}" aria-label="Убрать ${esc(x.file.name)}">×</button></li>`;
  }).join("");
}
fileInput.addEventListener("change", () => { addFiles(fileInput.files); fileInput.value = ""; });
filesList.addEventListener("click", (e) => {
  const b = e.target.closest("[data-remove]"); if (!b) return;
  const [x] = state.files.splice(+b.dataset.remove, 1);
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

// надписи на демо-макетах в каталоге
const DEMO_ART = {
  sticker: "", banner: "СКИДКИ 30%", film: "ОТКРЫТО", lightbox: "АПТЕКА", sign: "14",
  mobile: "", interior: "", photozone: "С днём свадьбы", cards: "", holders: "", mount: "ПРОДУКТЫ",
};
function artHTML(extra = "") {
  const img = demoMode ? null : firstImg();
  return img
    ? `<div class="pv-art pv-art--${state.fit} ${extra}" style="background-image:url('${img.url}')"></div>`
    : demoMode
      ? `<div class="pv-art pv-demo pv-demo--${state.id} ${extra}"><span>${esc(DEMO_ART[state.id] || "")}</span></div>`
      : `<div class="pv-art pv-art--empty ${extra}"><span>Ваш макет</span></div>`;
}
// макет, выбранный для предпросмотра (если картинок несколько)
const imgs = () => state.files.filter((x) => x.url);
const firstImg = () => imgs()[Math.min(state.pic, imgs().length - 1)] || null;

// подбираем размер объекта под сцену, сохраняя пропорции
function fit(w, h, maxW, maxH) {
  const r = w > 0 && h > 0 ? w / h : 1.5;
  let W = maxW, H = W / r;
  if (H > maxH) { H = maxH; W = H * r; }
  return { W: Math.round(W), H: Math.round(H) };
}
function dims(content, W, H, showW = true, showH = true) {
  const p = product(), u = p.size ? p.size.unit : "";
  return `<div class="pv-obj" style="width:${W}px;height:${H}px">${content}
    ${showW && state.w ? `<span class="dim dim--w">${fmt(state.w)} ${u}</span>` : ""}
    ${showH && state.h ? `<span class="dim dim--h">${fmt(state.h)} ${u}</span>` : ""}
  </div>`;
}

const VIEWS = {
  sticker(sw, sh) {
    const { shape, finish, material } = state.opts;
    let w = state.w, h = state.h;
    if (shape === "Овал" && Math.abs(w - h) < 0.01) w = h * 1.45;
    const { W, H } = fit(w, h, sw * 0.62, sh * 0.62);
    const cls = { "Круг": "s-circle", "Овал": "s-oval", "Квадрат": "s-square", "Прямоугольник": "s-rect", "Скруглённые углы": "s-round", "По контуру": "s-contour" }[shape];
    const img = firstImg();
    const inner = shape === "По контуру" && img
      ? `<img class="pv-contour" src="${img.url}" alt="">`
      : artHTML();
    return {
      bg: material === "Прозрачная плёнка" ? "bg-glass" : "bg-desk",
      html: dims(`<div class="pv-sticker ${cls} ${finish === "Глянцевая" ? "is-gloss" : "is-matte"} ${material === "Прозрачная плёнка" ? "is-clear" : ""} ${material === "Бумага" ? "is-paper" : ""}">${inner}<i class="sheen"></i></div>`, W, H),
    };
  },
  banner(sw, sh) {
    const { type, edge } = state.opts;
    const { W, H } = fit(state.w, state.h, sw * 0.72, sh * (type === "На каркасе" ? 0.5 : 0.6));
    return {
      bg: "bg-street",
      html: dims(`<div class="pv-banner ${type === "На каркасе" ? "is-framed" : ""} ${type === "Баннерная сетка" ? "is-mesh" : ""} edge-${{ "Люверсы": "eyelets", "Кармашки": "pockets", "Проклейка края": "hem", "Без обработки": "none" }[edge]}">${artHTML()}<i class="mesh"></i></div>${type === "На каркасе" ? '<i class="legs"></i>' : ""}`, W, H),
    };
  },
  film(sw, sh) {
    const { type, finish, base } = state.opts;
    const { W, H } = fit(state.w, state.h, sw * 0.7, sh * 0.6);
    return {
      bg: base === "Без основы" ? "bg-shop" : "bg-wall",
      html: dims(`<div class="pv-film ${type === "Перфорированная" ? "is-perf" : ""} ${type === "Плоттерная резка" ? "is-plotter" : ""} ${finish === "Глянцевая" ? "is-gloss" : ""} ${base !== "Без основы" ? "is-board" : ""} ${base === "Композит" ? "is-acp" : ""}">${artHTML()}<i class="sheen"></i></div>`, W, H),
    };
  },
  letters(sw, sh) {
    const { type, base } = state.opts;
    const text = (state.opts.text || "ВЫВЕСКА").trim() || "ВЫВЕСКА";
    const n = [...text].length;
    const fs = Math.max(18, Math.min(sh * 0.32, (sw * 0.8) / (n * 0.78)));
    const cls = { "Световые": "l-lit", "Контражурные": "l-halo", "Несветовые": "l-solid", "Псевдообъёмные": "l-flat", "Композитные": "l-acp", "Акриловые": "l-acryl" }[type];
    const dark = ["Световые", "Контражурные"].includes(type);
    return {
      bg: dark ? "bg-night" : "bg-facade",
      html: `<div class="pv-letters ${cls} base-${{ "Без подложки": "none", "Композитное основание": "plate", "Композитный короб": "box" }[base]}">
        <span style="font-size:${Math.round(fs)}px">${esc(text)}</span>
        ${state.h ? `<span class="dim dim--h">${fmt(state.h)} см</span>` : ""}
        ${state.w ? `<span class="dim dim--w">${fmt(state.w)} см</span>` : ""}
      </div>`,
    };
  },
  lightbox(sw, sh) {
    const { sides, shape } = state.opts;
    const { W, H } = fit(state.w, state.h, sw * 0.6, sh * 0.55);
    const cls = { "Прямоугольник": "", "Круг": "s-circle", "Скруглённые углы": "s-round" }[shape];
    return {
      bg: "bg-night",
      html: dims(`<div class="pv-lightbox ${cls} ${sides === "Двусторонний" ? "is-double" : ""}">${artHTML()}</div><i class="bracket"></i>`, W, H),
    };
  },
  sign(sw, sh) {
    const { base, shape } = state.opts;
    let w = state.w, h = state.h;
    if (shape === "Овал" && Math.abs(w - h) < 0.01) w = h * 1.45;
    const { W, H } = fit(w, h, sw * 0.58, sh * 0.58);
    const cls = { "Прямоугольник": "", "Скруглённые углы": "s-round", "Круг": "s-circle", "Овал": "s-oval" }[shape];
    const bcls = { "Жесть": "b-tin", "Жесть с подложкой": "b-tin b-backed", "ПВХ": "b-pvc", "Композит": "b-acp", "Акрил": "b-acryl" }[base];
    return { bg: "bg-facade", html: dims(`<div class="pv-sign ${cls} ${bcls}">${artHTML()}<i class="screws"></i></div>`, W, H) };
  },
  mobile(sw, sh) {
    const t = state.opts.type;
    if (t.startsWith("Деревянный")) {
      const H = sh * 0.7, W = H * 0.62;
      return { bg: "bg-street", html: `<div class="pv-obj" style="width:${W}px;height:${H}px"><div class="pv-stand">${artHTML()}</div><span class="dim dim--h">100 см</span></div>` };
    }
    const wide = t.includes("150");
    const H = sh * 0.78, W = H * (wide ? 0.75 : 0.42);
    return { bg: "bg-expo", html: `<div class="pv-obj" style="width:${W}px;height:${H}px"><div class="pv-rollup">${artHTML()}</div><i class="rollup-base"></i><span class="dim dim--w">${wide ? 150 : 84} см</span><span class="dim dim--h">200 см</span></div>` };
  },
  interior(sw, sh) {
    const { material, finish } = state.opts;
    const { W, H } = fit(state.w, state.h, sw * 0.7, sh * 0.58);
    const cls = { "Интерьерная плёнка": "", "Фотообои": "is-wall", "Холст": "is-canvas", "Бумага / постер": "is-poster" }[material];
    return { bg: "bg-room", html: dims(`<div class="pv-interior ${cls} ${finish === "Глянцевая" ? "is-gloss" : ""}">${artHTML()}<i class="sheen"></i></div>`, W, H) };
  },
  photozone(sw, sh) {
    const f = state.opts.format;
    const { W, H } = fit(state.w, state.h, sw * 0.66, sh * 0.66);
    const cls = { "Пресс-волл": "z-wall", "Арка": "z-arch", "Фигурная": "z-shape" }[f];
    return { bg: "bg-hall", html: dims(`<div class="pv-zone ${cls}">${artHTML()}</div><i class="zone-feet"></i>`, W, H) };
  },
  cards(sw, sh) {
    const { sides, lam, corners } = state.opts;
    const W = Math.min(sw * 0.62, 460), H = W * 50 / 90;
    const c = `${corners === "Скруглённые" ? "is-round" : ""} ${lam === "Глянцевая" ? "is-gloss" : ""} ${lam === "Матовая" ? "is-matte" : ""}`;
    return {
      bg: "bg-desk",
      html: `<div class="pv-cards" style="width:${W}px;height:${H}px">
        ${sides === "Двусторонние" ? `<div class="pv-card pv-card--back ${c}"><span>lamast</span></div>` : `<div class="pv-card pv-card--blank ${c}"></div>`}
        <div class="pv-card ${c}">${artHTML()}<i class="sheen"></i></div>
        <span class="dim dim--w">90 × 50 мм</span>
      </div>`,
    };
  },
  holders(sw, sh) {
    const { type, material } = state.opts;
    const W = Math.min(sw * 0.44, 320), H = W * 0.9;
    return { bg: type === "Настенная" ? "bg-wall" : "bg-desk", html: `<div class="pv-holder h-${{ "Настольная": "desk", "Настенная": "wall", "Карманная": "pocket" }[type]} ${material === "Цветной акрил" ? "is-tint" : ""}" style="width:${W}px;height:${H}px"><div class="holder-cards">${artHTML()}</div><i class="holder-glass"></i></div>` };
  },
  mount(sw, sh) {
    const { W, H } = fit(3, 1, sw * 0.7, sh * 0.4);
    return { bg: "bg-street", html: `<div class="pv-obj" style="width:${W}px;height:${H}px"><div class="pv-mount">${artHTML()}</div><i class="ladder"></i></div>` };
  },
};

let demoMode = false;
function defaults(p) {
  const o = {};
  p.options.forEach((x) => (o[x.key] = x.type === "text" ? x.value || "" : x.values[0]));
  return o;
}
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
  const L = ["Здравствуйте! Заявка с сайта Lamast.", "", `Изделие: ${p.title}`];
  p.options.forEach((o) => {
    const v = (state.opts[o.key] || "").trim();
    if (v) L.push(`• ${o.label}: ${v}`);
  });
  if (p.size && (state.w || state.h)) L.push(`• Размер: ${fmt(state.w)} × ${fmt(state.h)} ${p.size.unit}`);
  if (p.qty && state.qty) L.push(`• Тираж: ${state.qty} ${p.qty.unit}`);
  const city = form.city.value.trim();
  if (city) L.push(`• Адрес: ${city}`);
  const desc = form.desc.value.trim();
  if (desc) L.push("", desc);
  if (state.files.length) L.push("", `📎 Макет: ${state.files.map((x) => x.file.name).join(", ")}`);
  const name = form.name.value.trim();
  if (name) L.push("", `${name}`);
  return L.join("\n");
}

const stageWrap = $(".stage-wrap"), stageTools = $("[data-stage-tools]"), stagePics = $("[data-stage-pics]");
function update() {
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
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!window.open(waUrl(), "_blank", "noopener")) location.href = waUrl();
});

/* старт */
selectProduct(PRODUCTS[0].id);
renderScenes();
if (document.fonts) document.fonts.ready.then(renderScenes);
