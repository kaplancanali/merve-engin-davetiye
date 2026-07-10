"use client"

import {
  Cake,
  Clock,
  DoorOpen,
  Heart,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"
import { Reveal, SectionTitle } from "@/components/reveal"
import { wedding } from "@/lib/wedding"

const icons: LucideIcon[] = [
  DoorOpen,
  Heart,
  Sparkles,
  Users,
  Cake,
  Clock,
]

export function WeddingSchedule() {
  return (
    <section id="dugun-akisi" className="section-muted relative px-4 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Program" title="Düğün Akışı" />
        <p className="mx-auto -mt-4 mb-14 max-w-2xl text-center font-serif text-base leading-relaxed text-muted sm:text-lg">
          08 Ağustos 2026 Cumartesi akşamı, bu özel günümüzü sizlerle paylaşmak için
          hazırladığımız program.
        </p>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {wedding.schedule.map((item, index) => {
            const Icon = icons[index] ?? Clock

            return (
              <Reveal key={item.time} delay={index * 0.05}>
                <article className="card-soft group flex h-full flex-col rounded-md border border-border bg-white p-6 transition hover:border-accent/50 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-cream group-hover:border-accent sm:h-14 sm:w-14">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-serif text-xl font-medium text-foreground sm:text-2xl">
                          {item.title}
                        </h3>
                        <time className="font-serif text-lg font-medium tabular-nums text-accent sm:text-xl">
                          {item.time}
                        </time>
                      </div>
                      <p className="mt-4 font-serif text-base leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
