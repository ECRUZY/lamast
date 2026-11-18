/* Общий код сайта и страницы заказа: каталог изделий, помощники и отрисовка изделия с макетом.
   Подключается после config.js и до script.js / z.html. */

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
    id: "neon", title: "Неоновые вывески", icon: "neon", view: "neon",
    desc: "Гибкий неон по вашему тексту или рисунку: надписи для кафе, салонов, фотозон и интерьера.",
    options: [
      { key: "text", label: "Текст вывески", type: "text", placeholder: "Или загрузите рисунок ниже", value: "Love" },
      { key: "color", label: "Цвет неона", values: ["Тёплый белый", "Холодный белый", "Розовый", "Красный", "Синий", "Голубой", "Зелёный", "Жёлтый", "Фиолетовый", "RGB"] },
      { key: "font", label: "Шрифт надписи", values: ["Рукописный", "Печатный"] },
      { key: "base", label: "Основа", values: ["Акрил по контуру", "Прямоугольный акрил", "Чёрный акрил", "Без основы"] },
      { key: "mount", label: "Монтаж", values: ["Нужен", "Не нужен"] },
    ],
    size: { unit: "см", w: 100, h: 50 },
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
  neon: '<path d="M3 16c2-7 4-10 5.5-10S9 14 11 14s2.5-7 4.5-7S17 13 21 12"/><path d="M5 20h14"/>',
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

/* ---------- состояние заказа ---------- */
const state = { id: PRODUCTS[0].id, opts: {}, w: 0, h: 0, qty: 0, files: [], fit: "cover", pic: 0 };
const product = () => PRODUCTS.find((p) => p.id === state.id);

/* ==========================================================
   Предпросмотр изделия (общий для конструктора и страницы заказа)
   ========================================================== */
// надписи на демо-макетах в каталоге
const DEMO_ART = {
  sticker: "", banner: "СКИДКИ 30%", film: "ОТКРЫТО", lightbox: "АПТЕКА", sign: "14",
  mobile: "", interior: "", photozone: "С днём свадьбы", cards: "", holders: "", mount: "ПРОДУКТЫ",
};

/* ---------- неон: из картинки клиента делаем светящиеся линии и акрил по контуру ---------- */
const NEON_COLORS = {
  "Тёплый белый": "#FFC98A", "Холодный белый": "#CFE3FF", "Розовый": "#FF3FD2", "Красный": "#FF2B3A", "Синий": "#2F6BFF",
  "Голубой": "#2FD3FF", "Зелёный": "#24FF74", "Жёлтый": "#FFDD2E", "Фиолетовый": "#A54BFF", "RGB": "#FF3FD2",
};
const neonCache = new Map(); // адрес картинки -> Promise (готовится) | { lines, plate, ratio } | null (не вышло)
function neonFrom(url) {
  if (neonCache.has(url)) return;
  const job = (async () => {
    // картинку грузим с разрешением CORS; если сервер временно отказал (например, Google 429), пробуем ещё раз
    const load = () => new Promise((res, rej) => { const i = new Image(); i.crossOrigin = "anonymous"; i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const img = await load().catch(() => new Promise((r) => setTimeout(r, 2500)).then(load));
    const k = Math.min(1, 900 / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * k)), h = Math.max(1, Math.round(img.naturalHeight * k));
    const m = document.createElement("canvas"); m.width = w; m.height = h;
    const mg = m.getContext("2d", { willReadFrequently: true });
    mg.drawImage(img, 0, 0, w, h);
    const d = mg.getImageData(0, 0, w, h), px = d.data;
    // PNG с прозрачным фоном: линии — это непрозрачные пиксели.
    // Иначе линии — то, что заметно отличается по яркости от фона (берём фон по краям картинки).
    let clear = 0;
    for (let i = 3; i < px.length; i += 4) if (px[i] < 245) clear++;
    const useAlpha = clear / (w * h) > 0.03;
    const lum = (i) => (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255;
    let bg = 0;
    if (!useAlpha) {
      const edge = [];
      for (let x = 0; x < w; x += 4) { edge.push(lum(x * 4), lum(((h - 1) * w + x) * 4)); }
      for (let y = 0; y < h; y += 4) { edge.push(lum(y * w * 4), lum((y * w + w - 1) * 4)); }
      edge.sort((a, b) => a - b);
      bg = edge[Math.floor(edge.length / 2)];
    }
    for (let i = 0; i < px.length; i += 4) {
      const a = useAlpha ? px[i + 3] : Math.max(0, Math.min(255, ((Math.abs(lum(i) - bg) - 0.12) / 0.25) * 255));
      px[i] = px[i + 1] = px[i + 2] = 255; px[i + 3] = a;
    }
    mg.putImageData(d, 0, 0);
    // обрезаем пустые поля вокруг линий, чтобы неон занимал всю сцену
    let x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (px[(y * w + x) * 4 + 3] > 40) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    if (x1 < 0) throw new Error("на картинке не нашлось линий");
    const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
    // поля вокруг рисунка, чтобы свечение и акрил не обрезались
    const pad = Math.round(Math.max(cw, ch) * 0.08), W = cw + pad * 2, H = ch + pad * 2;
    const L = document.createElement("canvas"); L.width = W; L.height = H;
    L.getContext("2d").drawImage(m, x0, y0, cw, ch, pad, pad, cw, ch);
    // акрил по контуру: рисунок «раздуваем» во все стороны и заливаем
    const Pc = document.createElement("canvas"); Pc.width = W; Pc.height = H;
    const pg = Pc.getContext("2d", { willReadFrequently: true });
    const r = pad * 0.75;
    const stamp = (dx, dy) => pg.drawImage(m, x0, y0, cw, ch, pad + dx, pad + dy, cw, ch);
    for (let s = 0; s < 24; s++) { const t = (s / 24) * Math.PI * 2; stamp(Math.cos(t) * r, Math.sin(t) * r); }
    for (let s = 0; s < 12; s++) { const t = (s / 12) * Math.PI * 2; stamp(Math.cos(t) * r * 0.5, Math.sin(t) * r * 0.5); }
    const pd = pg.getImageData(0, 0, W, H), pp = pd.data;
    for (let i = 0; i < pp.length; i += 4) { pp[i] = pp[i + 1] = pp[i + 2] = 255; pp[i + 3] = pp[i + 3] > 24 ? 255 : 0; }
    pg.putImageData(pd, 0, 0);
    return { lines: L.toDataURL("image/png"), plate: Pc.toDataURL("image/png"), ratio: W / H };
  })();
  neonCache.set(url, job);
  job.then((r) => neonCache.set(url, r), () => neonCache.set(url, null))
    .then(() => { if (typeof window.onNeonReady === "function") window.onNeonReady(); });
}
function artHTML(extra = "", entry) {
  const img = demoMode ? null : entry !== undefined ? entry : firstImg();
  return img
    ? `<div class="pv-art pv-art--${state.fit} ${extra}" style="background-image:url('${img.url}')"></div>`
    : demoMode
      ? `<div class="pv-art pv-demo pv-demo--${state.id} ${extra}"><span>${esc(DEMO_ART[state.id] || "")}</span></div>`
      : `<div class="pv-art pv-art--empty ${extra}"><span>Ваш макет</span></div>`;
}
// макет, выбранный для предпросмотра (если картинок несколько)
const imgs = () => state.files.filter((x) => x.url);
const firstImg = () => imgs()[Math.min(state.pic, imgs().length - 1)] || null;

// стороны двусторонней визитки: файл с пометкой стороны, иначе первая и вторая картинки по порядку
function sideImg(side) {
  const list = imgs();
  const tagged = list.find((x) => x.side === side);
  if (tagged) return tagged;
  const free = list.filter((x) => !x.side);
  return (side === "front" ? free[0] : list.some((x) => x.side === "front") ? free[0] : free[1]) || null;
}

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
  neon(sw, sh) {
    // страница заказа: готовый неон, «запечённый» конструктором при отправке
    if (!demoMode && state.neonBaked) {
      const W = Math.round(sw * 0.82), H = Math.round(sh * 0.74);
      return { bg: "bg-night", html: dims(`<div class="pv-neon"><img class="neon-baked" src="${state.neonBaked}" alt="Неоновая вывеска с макетом клиента" referrerpolicy="no-referrer"></div>`, W, H) };
    }
    const color = demoMode ? "Розовый" : state.opts.color;
    const col = NEON_COLORS[color] || NEON_COLORS["Тёплый белый"];
    const rgb = color === "RGB" ? " is-rgb" : "";
    const base = { "Акрил по контуру": "b-contour", "Прямоугольный акрил": "b-rect", "Чёрный акрил": "b-black", "Без основы": "b-none" }[state.opts.base] || "b-contour";
    const img = demoMode ? null : firstImg();
    if (img) {
      if (!neonCache.has(img.url)) neonFrom(img.url);
      const r = neonCache.get(img.url);
      if (r instanceof Promise) return { bg: "bg-night", html: `<div class="pv-neon-wait">Превращаем рисунок в неон…</div>` };
      const ratio = r ? r.ratio : 1.4;
      const { W, H } = fit(ratio, 1, sw * 0.8, sh * 0.72);
      const inner = r
        ? `${base === "b-contour" ? `<img class="neon-plate" src="${r.plate}" alt="">` : ""}<img class="neon-lines" src="${r.lines}" alt="">`
        : `<img class="neon-lines neon-raw" src="${img.alt || img.url}" alt="">`;
      return { bg: "bg-night", html: dims(`<div class="pv-neon ${base}${rgb}" style="--neon:${col}">${inner}</div>`, W, H) };
    }
    const text = (state.opts.text || "").trim() || "Ваш текст";
    const script = state.opts.font !== "Печатный";
    const fs = Math.max(20, Math.min(sh * 0.34, (sw * 0.78) / (Math.max(3, [...text].length) * (script ? 0.48 : 0.62))));
    return {
      bg: "bg-night",
      html: `<div class="pv-neon pv-neon--text ${base}${rgb}${script ? " is-script" : ""}" style="--neon:${col}; font-size:${Math.round(fs)}px">
        <span class="neon-plate-t" aria-hidden="true">${esc(text)}</span><span class="neon-t">${esc(text)}</span>
        ${state.w && state.h && !demoMode ? `<span class="dim dim--w">${fmt(state.w)} × ${fmt(state.h)} см</span>` : ""}
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
    const c = `${corners === "Скруглённые" ? "is-round" : ""} ${lam === "Глянцевая" ? "is-gloss" : ""} ${lam === "Матовая" ? "is-matte" : ""}`;
    if (sides === "Двусторонние" && !demoMode) {
      // обе стороны рядом, у каждой свой макет
      const W = Math.min(sw * 0.42, 340), H = W * 50 / 90;
      const side = (key, label) => {
        const img = sideImg(key);
        const art = img ? artHTML("", img) : `<div class="pv-art pv-art--empty"><span>${label}</span></div>`;
        return `<figure class="pv-side"><div class="pv-card pv-card--flat ${c}" style="width:${W}px;height:${H}px">${art}<i class="sheen"></i></div><figcaption>${label}</figcaption></figure>`;
      };
      return { bg: "bg-desk", html: `<div class="pv-sides">${side("front", "Лицевая")}${side("back", "Оборотная")}</div>` };
    }
    const W = Math.min(sw * 0.62, 460), H = W * 50 / 90;
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

/* ---------- короткий код заказа для ссылки ----------
   вид: изделие.варианты.ширинаxвысота.тираж  (варианты — номера выбранных значений по порядку)
   пример: banner.000.3x2  или  cards.110..500 ; текст вывески идёт отдельным параметром t */
function orderCode() {
  const p = product();
  const idx = p.options.filter((o) => o.type !== "text").map((o) => Math.max(0, o.values.indexOf(state.opts[o.key])).toString(36)).join("");
  const size = p.size ? `${fmt(state.w).replace(",", "_")}x${fmt(state.h).replace(",", "_")}` : "";
  const parts = [p.id, idx, size, p.qty && state.qty ? state.qty : ""];
  while (parts.length && parts[parts.length - 1] === "") parts.pop();
  let code = parts.join(".");
  const t = p.options.find((o) => o.type === "text");
  if (t && state.opts[t.key]) code += "&t=" + encodeURIComponent(state.opts[t.key].slice(0, 40));
  return code;
}
// разбираем код обратно в state; false — если код не подходит
function applyOrderCode(code, text) {
  const [id, idx = "", size = "", qty = ""] = String(code || "").split(".");
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return false;
  state.id = p.id;
  state.opts = defaults(p);
  p.options.filter((o) => o.type !== "text").forEach((o, i) => {
    const n = parseInt(idx[i] || "0", 36);
    if (o.values[n]) state.opts[o.key] = o.values[n];
  });
  const t = p.options.find((o) => o.type === "text");
  if (t && text) state.opts[t.key] = String(text).slice(0, 40);
  const [w, h] = size.split("x").map((v) => num((v || "").replace("_", ".")));
  state.w = w || (p.size ? p.size.w : 0);
  state.h = h || (p.size ? p.size.h : 0);
  state.qty = num(qty) || (p.qty ? p.qty.value : 0);
  return true;
}

// готовый неон одной картинкой: акрил по контуру и светящиеся линии нужного цвета (для страницы заказа)
async function bakeNeon(r, color, contour) {
  const load = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  const [lines, plate] = await Promise.all([load(r.lines), load(r.plate)]);
  const W = lines.naturalWidth, H = lines.naturalHeight, k = Math.max(W, H) / 900;
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d");
  if (contour) { g.globalAlpha = 0.16; g.drawImage(plate, 0, 0); g.globalAlpha = 1; }
  const col = NEON_COLORS[color] || NEON_COLORS["Тёплый белый"];
  g.shadowColor = col;
  [60, 36, 20, 10, 4].forEach((b) => { g.shadowBlur = b * k; g.drawImage(lines, 0, 0); g.drawImage(lines, 0, 0); });
  g.shadowBlur = 0;
  g.drawImage(lines, 0, 0);
  return new Promise((res) => c.toBlob(res, "image/png"));
}
