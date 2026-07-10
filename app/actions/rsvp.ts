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
    return { success: true }
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

  if (trimmed.includes("Sayfa Bulunamadı") || trimmed.includes("404")) {
    return {
      success: false,
      error: "Webhook URL geçersiz veya dağıtım süresi dolmuş. Yeni sürüm dağıtın.",
    }
  }

  return {
    success: false,
    error: "Webhook yanıtı okunamadı. Apps Script'i yeniden dağıtın.",
  }
}

async function fetchScript(url: string): Promise<string> {
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow",
    cache: "no-store",
  })
  return response.text()
}

async function submitViaGet(
  baseUrl: string,
  payload: Record<string, string>,
): Promise<{ success: boolean; error?: string }> {
  const url = new URL(baseUrl)
  Object.entries(payload).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const text = await fetchScript(url.toString())
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
    return await submitViaGet(webhookUrl, payload)
  } catch {
    return {
      success: false,
      error: "Bağlantı hatası. Webhook URL'sini kontrol edin.",
    }
  }
}
