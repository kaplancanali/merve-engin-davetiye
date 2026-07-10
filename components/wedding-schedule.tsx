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
    <section id="dugun-akisi" className="relative bg-cream-dark px-6 py-20">
      <SectionTitle eyebrow="Program" title="Düğün Akışı" />
      <p className="mx-auto -mt-6 mb-12 max-w-lg text-center font-serif text-sm text-muted sm:text-base">
        08 Ağustos 2026 Cumartesi akşamı programımız aşağıdaki gibidir.
      </p>

      <div className="mx-auto max-w-2xl space-y-4">
        {wedding.schedule.map((item, index) => {
          const Icon = icons[index] ?? Clock
          const isLast = index === wedding.schedule.length - 1

          return (
            <Reveal key={item.time} delay={index * 0.06}>
              <div className="relative flex gap-0">
                {/* Timeline column */}
                <div className="flex w-14 shrink-0 flex-col items-center sm:w-16">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-white shadow-sm sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4 text-accent sm:h-[18px] sm:w-[18px]" />
                  </div>
                  {!isLast && (
                    <div className="my-1 w-px flex-1 bg-border" />
                  )}
                </div>

                {/* Card */}
                <div className="mb-1 flex-1 rounded-sm border border-border bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-serif text-lg font-medium text-foreground sm:text-xl">
                      {item.title}
                    </h3>
                    <span className="rounded-sm bg-cream-dark px-3 py-1 font-serif text-sm font-medium tabular-nums text-foreground">
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-3 font-serif text-sm leading-relaxed text-muted sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
