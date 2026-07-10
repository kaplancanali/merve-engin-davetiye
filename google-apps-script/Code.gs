/**
 * ÖNEMLİ: Bu scripti Google Sheets içinden oluşturun:
 * Uzantılar > Apps Script (tabloya bağlı olmalı)
 *
 * Dağıtım ayarları:
 * - Yürüt: Ben
 * - Erişim: Herkes (Anyone)
 */
function doGet(e) {
  try {
    if (e.parameter && e.parameter.name) {
      appendRsvp_(e.parameter);
      return jsonOutput_({ success: true });
    }
    return jsonOutput_({ success: true, status: "ok" });
  } catch (err) {
    return jsonOutput_({ success: false, error: String(err.message || err) });
  }
}

function doPost(e) {
  try {
    const data = getRequestData_(e);
    appendRsvp_(data);
    return jsonOutput_({ success: true });
  } catch (err) {
    return jsonOutput_({ success: false, error: String(err.message || err) });
  }
}

function appendRsvp_(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.phone || "",
    data.attendance === "yes" ? "Katılıyor" : "Katılamıyor",
    Number(data.guestCount) || 0,
    data.message || "",
  ]);
}

function getRequestData_(e) {
  if (e.parameter && e.parameter.name) {
    return e.parameter;
  }
  if (e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }
  throw new Error("Form verisi alınamadı.");
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
