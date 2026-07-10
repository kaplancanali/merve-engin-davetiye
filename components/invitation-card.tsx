"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { FloralDivider } from "@/components/floral-divider"
import { wedding } from "@/lib/wedding"

export function InvitationCard() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
      <motion.div
        className="invitation-card relative w-full max-w-2xl overflow-hidden rounded-sm"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top cream area */}
        <div className="bg-white px-6 pb-8 pt-10 sm:px-12 sm:pb-10 sm:pt-14">
          {/* Names */}
          <div className="flex items-center justify-center">
            <h1 className="font-script text-[clamp(2.5rem,8vw,4.5rem)] leading-none text-foreground">
              {wedding.bride}
            </h1>
            <FloralDivider className="mx-2 h-14 w-14 shrink-0 sm:mx-4 sm:h-16 sm:w-16" />
            <h1 className="font-script text-[clamp(2.5rem,8vw,4.5rem)] leading-none text-foreground">
              {wedding.groom}
            </h1>
          </div>

          {/* Intro */}
          <p className="mt-8 text-center font-serif text-base italic text-muted sm:text-lg">
            {wedding.intro}
          </p>

          {/* Families */}
          <div className="mt-8 flex items-center justify-center gap-8 sm:gap-16">
            <p className="font-serif text-sm tracking-wide text-foreground sm:text-base">
              {wedding.families.bride}
            </p>
            <p className="font-serif text-sm tracking-wide text-foreground sm:text-base">
              {wedding.families.groom}
            </p>
          </div>

          {/* Event details */}
          <div className="mt-10 space-y-3 text-center font-serif">
            <p className="text-sm font-medium tracking-[0.35em] text-foreground sm:text-base">
              {wedding.event}
            </p>
            <p className="text-sm text-foreground sm:text-base">
              {wedding.date} Saat: {wedding.time}
            </p>
            <p className="mx-auto max-w-md text-xs leading-relaxed text-foreground sm:text-sm">
              {wedding.venue}
            </p>
            <p className="text-xs text-muted sm:text-sm">{wedding.address}</p>
          </div>
        </div>

        {/* Stripe decorative bottom */}
        <div className="stripe-pattern h-6 w-full sm:h-8" />
      </motion.div>

      <motion.a
        href="#dugun-akisi"
        className="mt-10 flex flex-col items-center gap-1 text-muted transition-colors hover:text-foreground"
        aria-label="Düğün akışına git"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="font-serif text-xs tracking-[0.2em]">Aşağı Kaydır</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section>
  )
}
