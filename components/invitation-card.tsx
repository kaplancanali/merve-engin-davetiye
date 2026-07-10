"use client"

import { motion } from "framer-motion"
import { Calendar, ChevronDown, MapPin } from "lucide-react"
import { FloralDivider } from "@/components/floral-divider"
import { QuickNav } from "@/components/quick-nav"
import { wedding } from "@/lib/wedding"

export function InvitationCard() {
  return (
    <section className="hero-glow relative min-h-screen px-4 py-16 sm:px-8 sm:py-20">
      {/* Decorative corners */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-accent-soft/20 blur-3xl" />
        <div className="absolute -right-16 bottom-32 h-72 w-72 rounded-full bg-stripe/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center">
        <motion.p
          className="mb-6 text-xs uppercase tracking-[0.55em] text-accent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Dijital Davetiye
        </motion.p>

        <motion.div
          className="invitation-card relative w-full overflow-hidden rounded-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="stripe-pattern h-2 w-full sm:h-3" />

          <div className="bg-white px-6 py-12 sm:px-16 sm:py-16 lg:px-20 lg:py-20">
            {/* Names */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <h1 className="font-script text-[clamp(3rem,10vw,5.5rem)] leading-none text-foreground">
                {wedding.bride}
              </h1>
              <FloralDivider className="h-16 w-16 sm:h-20 sm:w-20" />
              <h1 className="font-script text-[clamp(3rem,10vw,5.5rem)] leading-none text-foreground">
                {wedding.groom}
              </h1>
            </div>

            <div className="mx-auto mt-8 h-px w-32 gold-line sm:mt-10 sm:w-48" />

            <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-lg italic leading-relaxed text-muted sm:mt-10 sm:text-xl">
              {wedding.intro}
            </p>

            {/* Families */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row sm:gap-20">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.35em] text-accent">Gelin Tarafı</p>
                <p className="mt-2 font-serif text-base tracking-wide text-foreground sm:text-lg">
                  {wedding.families.bride}
                </p>
              </div>
              <div className="hidden h-10 w-px bg-border sm:block" />
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.35em] text-accent">Damat Tarafı</p>
                <p className="mt-2 font-serif text-base tracking-wide text-foreground sm:text-lg">
                  {wedding.families.groom}
                </p>
              </div>
            </div>

            {/* Info grid */}
            <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
              <div className="card-soft rounded-md border border-border bg-cream/50 p-6 text-center sm:p-8">
                <Calendar className="mx-auto h-5 w-5 text-accent" />
                <p className="mt-3 font-serif text-xs uppercase tracking-[0.25em] text-accent">
                  Tarih & Saat
                </p>
                <p className="mt-2 font-serif text-base text-foreground sm:text-lg">
                  {wedding.date}
                </p>
                <p className="mt-1 font-serif text-base text-foreground">Saat {wedding.time}</p>
              </div>

              <div className="card-soft rounded-md border border-border bg-cream/50 p-6 text-center sm:p-8">
                <MapPin className="mx-auto h-5 w-5 text-accent" />
                <p className="mt-3 font-serif text-xs uppercase tracking-[0.25em] text-accent">
                  Mekan
                </p>
                <p className="mt-2 font-serif text-sm leading-relaxed text-foreground sm:text-base">
                  {wedding.venue}
                </p>
                <p className="mt-2 font-serif text-sm text-muted">{wedding.address}</p>
              </div>
            </div>
          </div>

          <div className="stripe-pattern h-3 w-full sm:h-4" />
        </motion.div>

        <motion.div
          className="mt-12 w-full max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <QuickNav />
        </motion.div>

        <motion.a
          href="#dugun-akisi"
          className="mt-10 flex flex-col items-center gap-2 text-muted transition-colors hover:text-foreground"
          aria-label="Düğün akışına git"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="font-serif text-xs tracking-[0.25em]">Keşfetmeye Başla</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.a>
      </div>
    </section>
  )
}
