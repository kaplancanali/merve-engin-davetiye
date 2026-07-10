"use client"

import { ExternalLink, MapPin, Navigation } from "lucide-react"
import { Reveal, SectionTitle } from "@/components/reveal"
import { wedding } from "@/lib/wedding"

export function MapSection() {
  const q = encodeURIComponent(wedding.map.query)
  const embed = `https://maps.google.com/maps?q=${q}&output=embed`
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${q}`
  const open = `https://www.google.com/maps/search/?api=1&query=${q}`

  return (
    <section id="konum" className="section-muted relative px-4 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="Konum"
          title="Düğün Adresi"
          subtitle="Sizleri aramızda görmekten mutluluk duyarız."
        />
        <Reveal>
          <div className="card-soft overflow-hidden rounded-md border border-border bg-white">
            <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
              <iframe
                title="Düğün mekanı haritası"
                src={embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-cream">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-serif text-xl text-foreground sm:text-2xl">
                    {wedding.map.label}
                  </p>
                  <p className="mt-1 font-serif text-base text-muted">{wedding.map.city}</p>
                  <p className="mt-2 font-serif text-base leading-relaxed text-muted">
                    {wedding.address}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-serif text-sm text-cream transition-opacity hover:opacity-90"
                >
                  <Navigation className="h-4 w-4" />
                  Yol Tarifi Al
                </a>
                <a
                  href={open}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-serif text-sm text-foreground transition-colors hover:bg-cream"
                >
                  <ExternalLink className="h-4 w-4" />
                  Haritada Aç
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
