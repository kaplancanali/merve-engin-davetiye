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

function parseScriptResponse(text: string): { success: boolean; error?: string } {
  const trimmed = text.trim()
  if (!trimmed) {
    return { success: false, error: "Webhook boş yanıt döndü." }
  }

  try {
    const result = JSON.parse(trimmed) as { success?: boolean; error?: string }
    if (result.success) return { success: true }
    return { success: false, error: result.error || "Kayıt gönderilemedi." }
  } catch {
    // devam
  }

  const successMatch = trimmed.match(/\{[\s\S]*?"success"\s*:\s*true[\s\S]*?\}/)
  if (successMatch) {
    try {
      const result = JSON.parse(successMatch[0]) as { success?: boolean }
      if (result.success) return { success: true }
    } catch {
      return { success: true }
    }
  }

  const errorMatch = trimmed.match(/\{[\s\S]*?"success"\s*:\s*false[\s\S]*?\}/)
  if (errorMatch) {
    try {
      const result = JSON.parse(errorMatch[0]) as { error?: string }
      return { success: false, error: result.error || "Kayıt gönderilemedi." }
    } catch {
      // devam
    }
  }

  if (
    trimmed.includes("accounts.google.com") ||
    trimmed.toLowerCase().includes("sign in")
  ) {
    return {
      success: false,
      error:
        "Apps Script erişimi 'Herkes' olmalı. Dağıtım ayarlarını kontrol edin.",
    }
  }

  return {
    success: false,
    error:
      "Webhook yanıtı okunamadı. Apps Script'i tablodan oluşturup yeniden dağıtın.",
  }
}

async function readScriptResponse(response: Response): Promise<string> {
  if (response.status === 301 || response.status === 302 || response.status === 303) {
    const location = response.headers.get("location")
    if (!location) return ""
    const followUp = await fetch(location, { method: "GET", cache: "no-store" })
    return followUp.text()
  }
  return response.text()
}

async function postToGoogleScript(
  url: string,
  payload: Record<string, string>,
): Promise<{ success: boolean; error?: string }> {
  const body = new URLSearchParams(payload)

  // form-urlencoded — Google Apps Script ile en güvenilir yöntem
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    redirect: "manual",
    cache: "no-store",
  })

  let text = await readScriptResponse(response)

  // redirect manual başarısızsa follow ile dene
  if (!text.trim() && response.status === 200) {
    text = await response.text()
  }

  if (!text.trim()) {
    const fallback = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      redirect: "follow",
      cache: "no-store",
    })
    text = await fallback.text()
  }

  return parseScriptResponse(text)
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

  if (!webhookUrl.includes("script.google.com/macros/s/")) {
    return {
      success: false,
      error: "Webhook URL geçersiz. /macros/s/.../exec formatında olmalı.",
    }
  }

  const guestCount = input.attendance === "yes" ? (input.guestCount ?? 1) : 0
  const phone = input.phone?.trim() || ""
  const message = input.message?.trim() || ""

  const payload = {
    name,
    phone,
    attendance: input.attendance,
    guestCount: String(guestCount),
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
