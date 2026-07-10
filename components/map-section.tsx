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
    <section className="relative bg-cream-dark px-6 py-20 pb-28">
      <SectionTitle eyebrow="Konum" title="Düğün Adresi" />
      <Reveal className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-sm border border-border bg-white shadow-sm">
          <div className="relative aspect-[16/10] w-full">
            <iframe
              title="Düğün mekanı haritası"
              src={embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="font-serif text-lg text-foreground">
                  {wedding.map.label}
                </p>
                <p className="text-sm text-muted">{wedding.map.city}</p>
                <p className="mt-1 text-sm text-muted">{wedding.address}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-foreground px-5 py-2.5 text-sm text-cream transition-opacity hover:opacity-90"
              >
                <Navigation className="h-4 w-4" />
                Yol Tarifi Al
              </a>
              <a
                href={open}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-cream-dark"
              >
                <ExternalLink className="h-4 w-4" />
                Haritada Aç
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
