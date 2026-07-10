"use server"

export type SubmitRsvpInput = {
  name: string
  phone?: string
  attendance: "yes" | "no"
  guestCount?: number
  message?: string
}

export async function submitRsvp(input: SubmitRsvpInput) {
  const name = input.name.trim()
  if (!name) {
    throw new Error("Lütfen adınızı ve soyadınızı girin.")
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhookUrl) {
    throw new Error("Katılım formu henüz yapılandırılmamış.")
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

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error("Kayıt gönderilemedi.")
  }

  const result = (await response.json()) as { success?: boolean; error?: string }
  if (!result.success) {
    throw new Error(result.error || "Kayıt gönderilemedi.")
  }
}
