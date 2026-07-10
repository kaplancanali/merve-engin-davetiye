"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Reveal, SectionTitle } from "@/components/reveal"
import { wedding } from "@/lib/wedding"

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Unit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0")
  return (
    <div className="flex min-w-[72px] flex-col items-center rounded-sm border border-border bg-white px-4 py-5 sm:min-w-[100px] sm:px-6 sm:py-7">
      <div className="relative h-12 overflow-hidden sm:h-14">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="block font-serif text-4xl font-medium tabular-nums text-foreground sm:text-5xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted sm:text-xs">
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const target = new Date(wedding.weddingDateISO).getTime()
  const [time, setTime] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTime(getTimeLeft(target))
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <section className="relative px-6 py-20">
      <SectionTitle eyebrow="Geri Sayım" title="Mutluluğumuza Kalan" />
      <Reveal>
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-3 sm:gap-5">
          {time ? (
            <>
              <Unit value={time.days} label="Gün" />
              <Unit value={time.hours} label="Saat" />
              <Unit value={time.minutes} label="Dakika" />
              <Unit value={time.seconds} label="Saniye" />
            </>
          ) : (
            <div className="h-32" />
          )}
        </div>
      </Reveal>
    </section>
  )
}
