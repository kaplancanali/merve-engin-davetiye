function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      data.phone || "",
      data.attendance === "yes" ? "Katılıyor" : "Katılamıyor",
      data.guestCount || 0,
      data.message || "",
    ]);
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: String(err.message || err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ success: true, status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
