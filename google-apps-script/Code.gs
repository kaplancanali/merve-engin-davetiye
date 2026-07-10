/**
 * ÖNEMLİ: Bu scripti Google Sheets içinden oluşturun:
 * Uzantılar > Apps Script (tabloya bağlı olmalı)
 *
 * Dağıtım ayarları:
 * - Yürüt: Ben
 * - Erişim: Herkes (Anyone)
 */
function doPost(e) {
  try {
    const data = getRequestData_(e);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      data.phone || "",
      data.attendance === "yes" ? "Katılıyor" : "Katılamıyor",
      Number(data.guestCount) || 0,
      data.message || "",
    ]);

    return jsonOutput_({ success: true });
  } catch (err) {
    return jsonOutput_({ success: false, error: String(err.message || err) });
  }
}

function doGet() {
  return jsonOutput_({ success: true, status: "ok" });
}

function getRequestData_(e) {
  if (e.parameter && e.parameter.name) {
    return e.parameter;
  }

  if (e.postData && e.postData.contents) {
    if (e.postData.type === "application/json") {
      return JSON.parse(e.postData.contents);
    }
    return JSON.parse(e.postData.contents);
  }

  throw new Error("Form verisi alınamadı.");
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
