#!/usr/bin/env python3
"""Собирает страницы услуг (ralamast.ru/<адрес>/) и sitemap.xml.

Тексты страниц лежат ниже в PAGES. После правки:  python3 build-pages.py
Шапка, контакты и подвал общие для всех страниц, стили берутся из styles.css.
"""
import datetime
import html
import json
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = "https://ralamast.ru"
ADDRESS = "Грозный, ул. Краснофлотская, 7А"

# фото работ: файл в assets/works, подпись, ширина, высота
W = {
    "neon": ("neon.jpg", "Неоновая вывеска", "акрил по контуру", 1672, 941),
    "amstore": ("amstore.jpg", "Световые буквы и логотипы", "AM Store", 1800, 601),
    "badr": ("badr.jpg", "Контражурные буквы", "Торговая компания BADR", 960, 1180),
    "techstation": ("techstation.jpg", "Световые буквы", "Техстанция, ГБО центр", 1439, 1093),
    "automag": ("automag.jpg", "Световые буквы", "Автомагазин", 1300, 1209),
    "raf": ("raf.jpg", "Световые буквы", "RAFXXIII", 1800, 601),
    "barber": ("barber.jpg", "Плоттерная резка", "Мужская парикмахерская", 995, 1580),
    "sign1": ("sign1.jpg", "Адресная табличка", "Фигурная, 62×30 см", 1585, 992),
    "sign2": ("sign2.jpg", "Адресная табличка", "55×15 см", 1586, 992),
    "mansmarket": ("mansmarket.jpg", "Проект вывески", "MANS MARKET", 1651, 953),
    "fresh": ("fresh.jpg", "Проект вывески", "Пекарня «Фрэш Франс»", 1651, 953),
    "shtender": ("shtender.jpg", "Штендер", "Детская парикмахерская", 1536, 1024),
    "ami": ("ami.jpg", "Объёмная фигура", "Ведро Ami, высота 2 м", 730, 660),
}

# общие вопросы, которые подходят любой услуге
FAQ_PRICE = ("Сколько это стоит?",
             "Цена зависит от размера, материалов и того, нужен ли монтаж. Пришлите макет или фото места в WhatsApp, и мы назовём стоимость и срок.")
FAQ_LAYOUT = ("Что делать, если макета нет?",
              "Разработаем макет сами. Достаточно логотипа, текста и фотографии места, где будет реклама.")
FAQ_WHERE = ("Где вы находитесь?",
             f"Наш адрес: {ADDRESS}. Работаем по Грозному и Чеченской Республике, на монтаж выезжаем сами.")

PAGES = [
    {
        "slug": "vyveski",
        "product": "letters",
        "nav": "Вывески",
        "title": "Изготовление вывесок в Грозном | Lamast (Ламаст)",
        "description": "Изготовление вывесок в Грозном: световые и объёмные буквы, световые короба, неон, композитные вывески. Макет, производство и монтаж. Рекламное агентство Lamast с 2016 года.",
        "h1": "Изготовление вывесок в Грозном",
        "lead": "Делаем вывески для магазинов, кафе, салонов и офисов: от макета до монтажа на фасаде. Работаем в Грозном с 2016 года.",
        "sections": [
            ("Какие вывески мы делаем", [
                ["Световые объёмные буквы с подсветкой изнутри",
                 "Контражурные буквы, которые подсвечивают стену за собой",
                 "Несветовые, композитные и акриловые буквы",
                 "Световые короба, односторонние и двусторонние",
                 "Неоновые вывески из гибкого неона",
                 "Вывески на композитном основании и в композитном коробе"],
            ]),
            ("Как проходит работа", [
                "Вы присылаете макет, логотип или просто фото фасада. Если макета нет, разрабатываем его и показываем, как вывеска будет смотреться на здании.",
                "После согласования изготавливаем вывеску, при необходимости делаем каркас и монтируем на месте. Старую конструкцию можем демонтировать.",
            ]),
        ],
        "links": ["svetovye-bukvy", "svetovye-koroba", "neonovye-vyveski", "tablichki"],
        "works": ["amstore", "badr", "techstation", "automag", "raf", "mansmarket", "fresh"],
        "faq": [FAQ_PRICE, FAQ_LAYOUT,
                ("Вы монтируете вывески сами?", "Да. Изготавливаем каркас, монтируем вывеску на фасаде и подключаем подсветку."),
                FAQ_WHERE],
    },
    {
        "slug": "svetovye-bukvy",
        "product": "letters",
        "nav": "Световые буквы",
        "title": "Световые и объёмные буквы в Грозном | Lamast (Ламаст)",
        "description": "Световые, контражурные и объёмные буквы в Грозном. Изготовление и монтаж вывесок из букв на фасаде. Примерьте свой текст в конструкторе на сайте.",
        "h1": "Световые и объёмные буквы в Грозном",
        "lead": "Изготавливаем объёмные буквы для вывесок: со светом и без, на стене, на композитном основании или в коробе. Монтируем на фасаде.",
        "sections": [
            ("Виды букв", [
                ["Световые: светятся лицевой частью",
                 "Контражурные: подсвечивают стену за буквами",
                 "Несветовые объёмные буквы",
                 "Псевдообъёмные буквы",
                 "Композитные буквы",
                 "Акриловые буквы"],
            ]),
            ("Основание", [
                "Буквы крепим прямо на фасад, на композитное основание или в композитный короб. Что подойдёт вашему зданию, подскажем по фото.",
            ]),
            ("Примерьте текст", [
                "В конструкторе на сайте можно ввести название, выбрать тип букв и размер и сразу увидеть, как будет выглядеть вывеска. Оттуда же заявка уходит нам в WhatsApp.",
            ]),
        ],
        "links": ["vyveski", "svetovye-koroba", "neonovye-vyveski"],
        "works": ["amstore", "badr", "techstation", "automag", "raf"],
        "faq": [FAQ_PRICE, FAQ_LAYOUT,
                ("Какой высоты бывают буквы?", "Высоту подбираем под фасад и расстояние, с которого вывеску должны видеть. Укажите размеры в конструкторе или пришлите фото, и мы предложим вариант."),
                FAQ_WHERE],
    },
    {
        "slug": "neonovye-vyveski",
        "product": "neon",
        "nav": "Неоновые вывески",
        "title": "Неоновые вывески на заказ в Грозном | Lamast (Ламаст)",
        "description": "Неоновые вывески на заказ в Грозном: надпись или рисунок из гибкого неона на акриле. Для кафе, салонов, фотозон и интерьера. 10 цветов, монтаж.",
        "h1": "Неоновые вывески на заказ в Грозном",
        "lead": "Делаем надписи и рисунки из гибкого неона: для кафе, салонов красоты, магазинов, фотозон и интерьера.",
        "sections": [
            ("Что можно заказать", [
                ["Надпись вашим текстом, рукописным или печатным шрифтом",
                 "Логотип или рисунок по картинке",
                 "Неон на акриле по контуру, на прямоугольном или чёрном акриле",
                 "Неон без основы, прямо на стену"],
            ]),
            ("Цвета", [
                "Тёплый и холодный белый, розовый, красный, синий, голубой, зелёный, жёлтый, фиолетовый и RGB, который меняет цвет.",
            ]),
            ("Посмотрите заранее", [
                "В конструкторе на сайте введите текст или загрузите картинку: увидите, как она будет светиться в выбранном цвете. Заявка с эскизом сразу уходит нам в WhatsApp.",
            ]),
        ],
        "links": ["vyveski", "fotozony", "svetovye-bukvy"],
        "works": ["neon"],
        "faq": [FAQ_PRICE,
                ("Можно сделать неон по моему рисунку?", "Да. Пришлите картинку или логотип, лучше на прозрачном или однотонном фоне, и мы подготовим макет."),
                ("Неон можно повесить на улице?", "Напишите, где будет вывеска, и мы подберём исполнение под это место."),
                FAQ_WHERE],
    },
    {
        "slug": "svetovye-koroba",
        "product": "lightbox",
        "nav": "Световые короба",
        "title": "Световые короба в Грозном | Lamast (Ламаст)",
        "description": "Световые короба (лайтбоксы) в Грозном: односторонние и двусторонние, прямоугольные и круглые. Изготовление и монтаж на фасаде.",
        "h1": "Световые короба в Грозном",
        "lead": "Изготавливаем световые короба для фасадов и входных групп: изображение равномерно подсвечивается изнутри и хорошо видно вечером.",
        "sections": [
            ("Варианты", [
                ["Односторонние: крепятся на стену",
                 "Двусторонние: на кронштейне, видны с двух сторон улицы",
                 "Прямоугольные, круглые и со скруглёнными углами"],
            ]),
            ("От макета до монтажа", [
                "Поможем с макетом, изготовим короб нужного размера и смонтируем на фасаде. В конструкторе на сайте можно загрузить свой макет и посмотреть, как он выглядит на коробе.",
            ]),
        ],
        "links": ["vyveski", "svetovye-bukvy", "bannery"],
        "works": ["mansmarket", "fresh"],
        "faq": [FAQ_PRICE, FAQ_LAYOUT,
                ("Чем короб отличается от объёмных букв?", "Короб — это одна светящаяся панель с изображением, у букв каждая буква отдельная. Короб обычно проще и быстрее в изготовлении, буквы смотрятся объёмнее."),
                FAQ_WHERE],
    },
    {
        "slug": "bannery",
        "product": "banner",
        "nav": "Баннеры",
        "title": "Печать баннеров в Грозном | Lamast (Ламаст)",
        "description": "Печать баннеров в Грозном: баннеры с люверсами и карманами, баннеры на металлическом каркасе, баннерная сетка. Монтаж.",
        "h1": "Печать баннеров в Грозном",
        "lead": "Печатаем баннеры для фасадов, заборов, мероприятий и акций. Делаем обработку края, каркас и монтаж.",
        "sections": [
            ("Что делаем", [
                ["Обычные баннеры",
                 "Баннеры на металлическом каркасе, например 3×2 м",
                 "Баннерную сетку для больших фасадов",
                 "Обработку: люверсы, карманы, проклейку края"],
            ]),
            ("Монтаж", [
                "Можем повесить баннер на фасад, забор или каркас. Если каркаса нет, изготовим его.",
            ]),
        ],
        "links": ["okleyka-vitrin", "fotozony", "vyveski"],
        "works": [],
        "faq": [FAQ_PRICE, FAQ_LAYOUT,
                ("Какой размер баннера можно заказать?", "Размер задаёте вы. Укажите ширину и высоту в конструкторе или в сообщении, и мы рассчитаем заказ."),
                FAQ_WHERE],
    },
    {
        "slug": "okleyka-vitrin",
        "product": "film",
        "nav": "Оклейка витрин",
        "title": "Оклейка витрин плёнкой в Грозном | Lamast (Ламаст)",
        "description": "Оклейка витрин и стёкол плёнкой в Грозном: печать на плёнке, перфорированная плёнка, плоттерная резка, интерьерная плёнка. Монтаж.",
        "h1": "Оклейка витрин плёнкой в Грозном",
        "lead": "Оформляем витрины, окна и стеклянные двери: печатаем на плёнке, вырезаем надписи и логотипы, клеим на месте.",
        "sections": [
            ("Виды плёнки", [
                ["Плёнка с печатью и ламинацией",
                 "Перфорированная плёнка: снаружи видно изображение, изнутри окно остаётся прозрачным",
                 "Плоттерная резка: надписи, логотипы, режим работы",
                 "Интерьерная плёнка",
                 "Плёнка на основе из ПВХ или композита"],
            ]),
            ("Монтаж", [
                "Оклеиваем витрины на месте. Старую плёнку можем снять.",
            ]),
        ],
        "links": ["bannery", "tablichki", "vyveski"],
        "works": ["barber"],
        "faq": [FAQ_PRICE, FAQ_LAYOUT,
                ("Будет ли видно улицу изнутри?", "С перфорированной плёнкой — да: снаружи видно изображение, а изнутри стекло остаётся прозрачным."),
                FAQ_WHERE],
    },
    {
        "slug": "tablichki",
        "product": "sign",
        "nav": "Таблички",
        "title": "Таблички на заказ в Грозном: адресные, режим работы | Lamast (Ламаст)",
        "description": "Таблички на заказ в Грозном: адресные таблички, режим работы, кабинетные. Жесть, ПВХ, композит, акрил. Фигурные таблички по вашему макету.",
        "h1": "Таблички на заказ в Грозном",
        "lead": "Делаем адресные таблички, таблички с режимом работы, кабинетные и информационные. Можно фигурные, по вашему макету.",
        "sections": [
            ("Материалы", [
                ["Жесть и жесть с подложкой",
                 "ПВХ",
                 "Композит",
                 "Акрил"],
            ]),
            ("Форма и размер", [
                "Прямоугольные, со скруглёнными углами, круглые, овальные и фигурные. Размер задаёте вы, тираж — от одной штуки.",
            ]),
        ],
        "links": ["vyveski", "okleyka-vitrin"],
        "works": ["sign1", "sign2"],
        "faq": [FAQ_PRICE,
                ("Можно заказать одну табличку?", "Да, делаем от одной штуки."),
                FAQ_LAYOUT, FAQ_WHERE],
    },
    {
        "slug": "fotozony",
        "product": "photozone",
        "nav": "Фотозоны",
        "title": "Фотозоны на заказ в Грозном | Lamast (Ламаст)",
        "description": "Фотозоны на заказ в Грозном: пресс-воллы, арки и фигурные фотозоны для свадеб, дней рождения, открытий и корпоративов. Печать и монтаж на площадке.",
        "h1": "Фотозоны на заказ в Грозном",
        "lead": "Печатаем и собираем фотозоны для свадеб, дней рождения, выпускных, открытий и корпоративных мероприятий.",
        "sections": [
            ("Форматы", [
                ["Пресс-волл с логотипами",
                 "Арка",
                 "Фигурная фотозона по вашему макету"],
            ]),
            ("Монтаж на площадке", [
                "Привезём и установим фотозону на месте мероприятия. Можно добавить неоновую надпись.",
            ]),
        ],
        "links": ["neonovye-vyveski", "bannery"],
        "works": ["ami"],
        "faq": [FAQ_PRICE, FAQ_LAYOUT,
                ("Вы устанавливаете фотозону сами?", "Да, привозим и монтируем на площадке."),
                FAQ_WHERE],
    },
]
BY_SLUG = {p["slug"]: p for p in PAGES}
e = html.escape
_ix = open(os.path.join(ROOT, "index.html")).read()
WA_SYMBOL = re.search(r'<symbol id="i-wa".*?</symbol>', _ix, re.S).group(0)


def section_html(title, blocks):
    out = [f'<h2>{e(title)}</h2>']
    for b in blocks:
        if isinstance(b, list):
            out.append("<ul>" + "".join(f"<li>{e(x)}</li>" for x in b) + "</ul>")
        else:
            out.append(f"<p>{e(b)}</p>")
    return '<div class="svc__block">' + "".join(out) + "</div>"


def work_html(key):
    f, title, sub, w, h = W[key]
    return (f'<figure class="work"><img src="/assets/works/{f}" alt="{e(title)}: {e(sub)}" width="{w}" height="{h}" loading="lazy" decoding="async">'
            f'<figcaption><b>{e(title)}</b><span>{e(sub)}</span></figcaption></figure>')


def page(p):
    url = f"{SITE}/{p['slug']}/"
    constructor = f"/?p={p['product']}#brief"
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "Service", "@id": url + "#service", "name": p["h1"], "description": p["description"], "url": url,
         "serviceType": p["nav"], "areaServed": [{"@type": "City", "name": "Грозный"}, {"@type": "AdministrativeArea", "name": "Чеченская Республика"}],
         "provider": {"@id": f"{SITE}/#business"}},
        {"@type": "LocalBusiness", "@id": f"{SITE}/#business", "name": "Lamast", "url": f"{SITE}/", "telephone": "+7 920 468-05-97",
         "image": f"{SITE}/assets/og.jpg",
         "address": {"@type": "PostalAddress", "streetAddress": "ул. Краснофлотская, 7А", "addressLocality": "Грозный",
                     "addressRegion": "Чеченская Республика", "postalCode": "364029", "addressCountry": "RU"}},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Lamast", "item": f"{SITE}/"},
            {"@type": "ListItem", "position": 2, "name": p["nav"], "item": url}]},
        {"@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p["faq"]]},
    ]}
    works = ""
    if p["works"]:
        works = f'''
  <section class="works svc__works">
    <div class="wrap">
      <div class="sec-head"><h2>Наши работы</h2><p>Больше проектов в Instagram <a data-cfg="insta" href="https://instagram.com/lamast_095" target="_blank" rel="noopener">@lamast_095</a></p></div>
      <div class="works__grid">{"".join(work_html(k) for k in p["works"])}</div>
    </div>
  </section>'''
    faq = "".join(f'<details class="svc__q"><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in p["faq"])
    links = "".join(f'<a href="/{s}/">{e(BY_SLUG[s]["nav"])}</a>' for s in p["links"])
    return f'''<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{e(p["title"])}</title>
  <meta name="description" content="{e(p["description"])}">
  <link rel="canonical" href="{url}">
  <meta name="theme-color" content="#140F2E">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Lamast">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:url" content="{url}">
  <meta property="og:title" content="{e(p["h1"])}">
  <meta property="og:description" content="{e(p["lead"])}">
  <meta property="og:image" content="{SITE}/assets/og.jpg">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon.png" type="image/png" sizes="48x48">
  <link rel="icon" href="/assets/icon-192.png" type="image/png" sizes="192x192">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geologica:wght@400;500;600;700;800&family=Onest:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css?v=1">
  <script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=1)}
  </script>
</head>
<body class="svc-page">
<header class="nav" id="top">
  <div class="wrap nav__in">
    <a class="brand" href="/" aria-label="Lamast, на главную"><img src="/assets/logo-mark.svg" alt="" width="34" height="34"><span>lamast</span></a>
    <nav class="nav__links" aria-label="Разделы">
      <a href="/#services">Услуги</a>
      <a href="/#brief">Конструктор</a>
      <a href="/#works">Работы</a>
      <a href="/#about">О нас</a>
      <a href="#contacts">Контакты</a>
    </nav>
    <a class="nav__phone" data-cfg="phone" href="tel:+79204680597">+7 920 468-05-97</a>
    <a class="btn btn--wa btn--sm" href="{constructor}"><svg aria-hidden="true" viewBox="0 0 24 24"><use href="#i-wa"/></svg>Оставить заявку</a>
    <button class="nav__burger" aria-label="Меню" aria-expanded="false"><span></span><span></span></button>
  </div>
</header>

<main>
  <section class="svc-hero">
    <div class="wrap">
      <nav class="svc-crumbs" aria-label="Навигация"><a href="/">Lamast</a><span aria-hidden="true">/</span><span>{e(p["nav"])}</span></nav>
      <h1>{e(p["h1"])}</h1>
      <p class="svc-hero__lead">{e(p["lead"])}</p>
      <div class="hero__cta">
        <a class="btn btn--wa" href="{constructor}"><svg aria-hidden="true" viewBox="0 0 24 24"><use href="#i-wa"/></svg>Примерить макет и рассчитать</a>
        <a class="btn btn--ghost" href="tel:+79204680597">Позвонить</a>
      </div>
    </div>
  </section>

  <section class="svc">
    <div class="wrap svc__in">
      <div class="svc__text">{"".join(section_html(t, b) for t, b in p["sections"])}</div>
      <aside class="svc__side">
        <h2>Расчёт стоимости</h2>
        <p>Пришлите макет, фото места или опишите задачу. Ответим в WhatsApp со стоимостью и сроками.</p>
        <a class="btn btn--wa" href="https://wa.me/79659400066?text={e(_wa(p))}" target="_blank" rel="noopener" data-wa-text="{e(_wa_text(p))}"><svg aria-hidden="true" viewBox="0 0 24 24"><use href="#i-wa"/></svg>Написать в WhatsApp</a>
        <a class="btn btn--dark" href="{constructor}">Открыть в конструкторе</a>
        <p class="svc__also">Также делаем: {links}</p>
      </aside>
    </div>
  </section>
{works}
  <section class="svc-faq">
    <div class="wrap svc-faq__in">
      <h2>Частые вопросы</h2>
      <div>{faq}</div>
    </div>
  </section>

  <section class="contacts" id="contacts">
    <div class="wrap contacts__in">
      <h2 class="contacts__big">Контакты</h2>
      <dl class="contacts__list">
        <div><dt>Адрес</dt><dd><a data-cfg="address" href="https://yandex.ru/maps/org/89276249927" target="_blank" rel="noopener">{ADDRESS}</a></dd></div>
        <div><dt>Телефон для звонков</dt><dd><a data-cfg="phone" href="tel:+79204680597">+7 920 468-05-97</a></dd></div>
        <div><dt>WhatsApp</dt><dd><a data-cfg="wa" href="https://wa.me/79659400066" target="_blank" rel="noopener">+7 965 940-00-66</a></dd></div>
        <div><dt>Часы работы</dt><dd>Ежедневно 8:00–22:00</dd></div>
      </dl>
    </div>
  </section>
</main>

<footer class="footer">
  <div class="wrap footer__in">
    <a class="brand brand--light" href="/"><img src="/assets/logo-mark.svg" alt="" width="28" height="28"><span>lamast</span></a>
    <p>Рекламное агентство в Грозном с 2016 года</p>
    <p>© <span data-year>{datetime.date.today().year}</span> Lamast</p>
  </div>
</footer>

<a class="fab" href="https://wa.me/79659400066?text={e(_wa(p))}" target="_blank" rel="noopener" aria-label="Написать в WhatsApp"><svg aria-hidden="true" viewBox="0 0 24 24"><use href="#i-wa"/></svg></a>

<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  {WA_SYMBOL}
</svg>
<script>
  // меню на телефоне и сплошная шапка при прокрутке
  (function () {{
    var nav = document.querySelector(".nav"), b = document.querySelector(".nav__burger");
    var solid = function () {{ nav.classList.toggle("is-solid", scrollY > 40); }};
    solid(); addEventListener("scroll", solid, {{ passive: true }});
    b.addEventListener("click", function () {{ b.setAttribute("aria-expanded", nav.classList.toggle("is-menu")); }});
  }})();
</script>
</body>
</html>
'''


def _wa_text(p):
    return f"Здравствуйте! Пишу с сайта Lamast. Интересует: {p['nav'].lower()}."


def _wa(p):
    from urllib.parse import quote
    return quote(_wa_text(p))


def main():
    for p in PAGES:
        d = os.path.join(ROOT, p["slug"])
        os.makedirs(d, exist_ok=True)
        with open(os.path.join(d, "index.html"), "w") as f:
            f.write(page(p))
    today = datetime.date.today().isoformat()
    urls = [("/", "1.0")] + [(f"/{p['slug']}/", "0.8") for p in PAGES]
    sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for u, pr in urls:
        sm += f"  <url>\n    <loc>{SITE}{u}</loc>\n    <lastmod>{today}</lastmod>\n    <priority>{pr}</priority>\n  </url>\n"
    sm += "</urlset>\n"
    open(os.path.join(ROOT, "sitemap.xml"), "w").write(sm)
    print("страниц:", len(PAGES))


if __name__ == "__main__":
    main()
