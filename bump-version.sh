#!/bin/sh
# Перед выкладкой: обновляет номер версии у css/js, чтобы браузеры не брали старые файлы из кэша.
# Страницы услуг (папки с index.html) собираются из build-pages.py.
V=$(date +%Y%m%d%H%M)
for f in index.html z.html */index.html; do
  sed -i '' -E "s#(href|src)=\"(/?)(styles\.css|config\.js|preview\.js|script\.js)(\?v=[0-9]+)?\"#\1=\"\2\3?v=$V\"#g" "$f"
done
echo "версия $V"
