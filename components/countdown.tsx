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
    <div className="card-soft flex min-w-[80px] flex-1 flex-col items-center rounded-md border border-border bg-white px-4 py-6 sm:min-w-[110px] sm:px-8 sm:py-9">
      <div className="relative h-14 overflow-hidden sm:h-16">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="block font-serif text-5xl font-medium tabular-nums text-foreground sm:text-6xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-[10px] uppercase tracking-[0.35em] text-muted sm:text-xs">
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
    <section id="geri-sayim" className="section-surface relative px-4 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Geri Sayım" title="Mutluluğumuza Kalan" />
        <p className="mx-auto -mt-4 mb-12 max-w-xl text-center font-serif text-base text-muted sm:text-lg">
          {wedding.date} · Saat {wedding.time}
        </p>
        <Reveal>
          <div className="mx-auto flex max-w-3xl gap-3 sm:gap-5">
            {time ? (
              <>
                <Unit value={time.days} label="Gün" />
                <Unit value={time.hours} label="Saat" />
                <Unit value={time.minutes} label="Dakika" />
                <Unit value={time.seconds} label="Saniye" />
              </>
            ) : (
              <div className="h-36 w-full" />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
