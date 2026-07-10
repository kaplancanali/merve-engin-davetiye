"use client"

import { useState, useTransition } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Heart, X } from "lucide-react"
import { submitRsvp } from "@/app/actions/rsvp"
import { Reveal, SectionTitle } from "@/components/reveal"

type Attendance = "yes" | "no" | null

export function Rsvp() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [attendance, setAttendance] = useState<Attendance>(null)
  const [guests, setGuests] = useState(1)
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Lütfen adınızı ve soyadınızı girin.")
      return
    }
    if (attendance === null) {
      setError("Lütfen katılım durumunuzu seçin.")
      return
    }
    setError("")
    startTransition(async () => {
      try {
        const result = await submitRsvp({
          name,
          phone,
          attendance,
          guestCount: attendance === "yes" ? guests : undefined,
          message,
        })
        if (result.success) {
          setSubmitted(true)
        } else {
          setError(result.error || "Gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")
        }
      } catch {
        setError("Gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")
      }
    })
  }

  const fieldClass =
    "w-full rounded-md border border-border bg-cream/30 px-4 py-3.5 font-serif text-foreground placeholder:text-muted outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"

  return (
    <section id="katilim" className="section-surface relative px-4 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="Lütfen Bildirin"
          title="Katılım Formu"
          subtitle="Katılım durumunuzu bizimle paylaşmanızı rica ederiz."
        />
        <Reveal className="mx-auto max-w-2xl">
          <div className="card-soft rounded-md border border-border bg-white p-6 sm:p-12">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-dark text-accent">
                  <Heart className="h-7 w-7" fill="currentColor" />
                </div>
                <h3 className="mt-5 font-serif text-3xl text-foreground">
                  Teşekkür Ederiz
                </h3>
                <p className="mt-3 text-pretty font-serif text-muted">
                  {attendance === "yes"
                    ? `Sevgili ${name}, sizi aramızda görmek için sabırsızlanıyoruz.`
                    : `Sevgili ${name}, bizi düşündüğünüz için teşekkür ederiz.`}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-serif text-sm text-accent underline-offset-4 hover:underline"
                >
                  Yanıtı düzenle
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <label htmlFor="name" className="mb-2 block font-serif text-sm text-foreground">
                    Ad Soyad *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız ve soyadınız"
                    className={fieldClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block font-serif text-sm text-foreground">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <span className="mb-2 block font-serif text-sm text-foreground">
                    Katılım Durumu *
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttendance("yes")}
                      aria-pressed={attendance === "yes"}
                      className={`flex items-center justify-center gap-2 rounded-sm border px-4 py-3 font-serif text-sm transition ${
                        attendance === "yes"
                          ? "border-transparent bg-foreground text-cream"
                          : "border-border text-foreground hover:bg-cream-dark"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                      Katılıyorum
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance("no")}
                      aria-pressed={attendance === "no"}
                      className={`flex items-center justify-center gap-2 rounded-sm border px-4 py-3 font-serif text-sm transition ${
                        attendance === "no"
                          ? "border-transparent bg-foreground text-cream"
                          : "border-border text-foreground hover:bg-cream-dark"
                      }`}
                    >
                      <X className="h-4 w-4" />
                      Katılamıyorum
                    </button>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {attendance === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <label htmlFor="guests" className="mb-2 block font-serif text-sm text-foreground">
                        Katılacak Kişi Sayısı
                      </label>
                      <input
                        id="guests"
                        type="number"
                        min={1}
                        max={20}
                        value={guests}
                        onChange={(e) =>
                          setGuests(Math.max(1, Math.min(20, Number(e.target.value))))
                        }
                        className={fieldClass}
                      />
                      <p className="mt-1.5 font-serif text-xs text-muted">
                        Kendiniz dahil toplam kişi sayısını yazın.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label htmlFor="message" className="mb-2 block font-serif text-sm text-foreground">
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Dilek ve mesajlarınız..."
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="font-serif text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 font-serif text-sm uppercase tracking-[0.2em] text-cream transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
                >
                  {isPending ? "Gönderiliyor..." : "Gönder"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
