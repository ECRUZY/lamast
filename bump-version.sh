#!/bin/sh
# Перед выкладкой: обновляет номер версии у css/js, чтобы браузеры не брали старые файлы из кэша.
V=$(date +%Y%m%d%H%M)
for f in index.html z.html; do
  sed -i '' -E "s#(href|src)=\"(styles\.css|config\.js|preview\.js|script\.js)(\?v=[0-9]+)?\"#\1=\"\2?v=$V\"#g" "$f"
done
echo "версия $V"
