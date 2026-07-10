"use server"

export type SubmitRsvpInput = {
  name: string
  phone?: string
  attendance: "yes" | "no"
  guestCount?: number
  message?: string
}

export type SubmitRsvpResult = {
  success: boolean
  error?: string
}

async function postToGoogleScript(
  url: string,
  payload: Record<string, unknown>,
): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "manual",
    cache: "no-store",
  })

  let text: string

  // Google Apps Script web uygulamaları 302 redirect döner
  if (response.status === 301 || response.status === 302 || response.status === 303) {
    const location = response.headers.get("location")
    if (!location) {
      return { success: false, error: "Webhook yanıtı geçersiz (redirect)." }
    }
    const followUp = await fetch(location, { method: "GET", cache: "no-store" })
    text = await followUp.text()
  } else {
    text = await response.text()
  }

  try {
    const result = JSON.parse(text) as { success?: boolean; error?: string }
    if (result.success) return { success: true }
    return { success: false, error: result.error || "Kayıt gönderilemedi." }
  } catch {
    // Bazen JSON dışı gövde dönebilir; kayıt yine de yazılmış olabilir
    if (text.includes('"success":true') || text.includes('"success": true')) {
      return { success: true }
    }
    return {
      success: false,
      error: "Webhook yanıtı okunamadı. URL ve Apps Script dağıtımını kontrol edin.",
    }
  }
}

export async function submitRsvp(
  input: SubmitRsvpInput,
): Promise<SubmitRsvpResult> {
  const name = input.name.trim()
  if (!name) {
    return { success: false, error: "Lütfen adınızı ve soyadınızı girin." }
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim()
  if (!webhookUrl) {
    return {
      success: false,
      error: "Katılım formu henüz yapılandırılmamış. (GOOGLE_SHEETS_WEBHOOK_URL)",
    }
  }

  const guestCount = input.attendance === "yes" ? (input.guestCount ?? 1) : 0
  const phone = input.phone?.trim() || ""
  const message = input.message?.trim() || ""

  const payload = {
    name,
    phone,
    attendance: input.attendance,
    guestCount,
    message,
    submittedAt: new Date().toISOString(),
  }

  try {
    return await postToGoogleScript(webhookUrl, payload)
  } catch {
    return {
      success: false,
      error: "Bağlantı hatası. Webhook URL'sini kontrol edin.",
    }
  }
}
