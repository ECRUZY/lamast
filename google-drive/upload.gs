/**
 * Приём макетов с сайта Lamast в Google Диск.
 *
 * Сайт присылает файл (base64), скрипт сохраняет его в папку «Макеты Lamast»
 * на вашем Диске, открывает доступ «по ссылке, только просмотр» и возвращает id файла.
 * Как установить: см. google-drive/ИНСТРУКЦИЯ.md
 */

const FOLDER_NAME = 'Макеты Lamast';
const MAX_MB = 35;
const ALLOWED = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'pdf', 'ai', 'cdr', 'eps', 'psd', 'svg', 'tif', 'tiff', 'zip', 'rar'];

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents);
    const name = String(req.name || 'макет').slice(0, 150).replace(/[\\/:*?"<>|]/g, '_');
    const ext = (name.split('.').pop() || '').toLowerCase();
    if (ALLOWED.indexOf(ext) === -1) return reply({ ok: false, error: 'Такой формат не принимаем' });

    const bytes = Utilities.base64Decode(String(req.data || ''));
    if (!bytes.length) return reply({ ok: false, error: 'Пустой файл' });
    if (bytes.length > MAX_MB * 1024 * 1024) return reply({ ok: false, error: 'Файл больше ' + MAX_MB + ' МБ' });

    const type = String(req.type || 'application/octet-stream').slice(0, 100);
    const stamp = Utilities.formatDate(new Date(), 'Europe/Moscow', 'yyyy-MM-dd HH-mm');
    const blob = Utilities.newBlob(bytes, type, stamp + ' ' + name);

    const file = folder().createFile(blob);
    if (req.product) file.setDescription('Заявка с сайта: ' + String(req.product).slice(0, 200));
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return reply({ ok: true, id: file.getId() });
  } catch (err) {
    return reply({ ok: false, error: 'Не удалось сохранить файл' });
  }
}

// папку создаём один раз и запоминаем её id
function folder() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('FOLDER_ID');
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (e) { /* папку удалили, создадим заново */ }
  }
  const f = DriveApp.createFolder(FOLDER_NAME);
  props.setProperty('FOLDER_ID', f.getId());
  return f;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Запустите один раз вручную из редактора: Google попросит разрешения на доступ к Диску.
function setup() {
  Logger.log('Папка готова: ' + folder().getUrl());
}
