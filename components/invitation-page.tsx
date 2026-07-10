"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { EnvelopeIntro } from "@/components/envelope-intro"
import { InvitationCard } from "@/components/invitation-card"
import { WeddingSchedule } from "@/components/wedding-schedule"
import { Countdown } from "@/components/countdown"
import { MapSection } from "@/components/map-section"
import { Rsvp } from "@/components/rsvp"
import { Petals } from "@/components/petals"
import { SectionDivider } from "@/components/section-divider"
import { FloralDivider } from "@/components/floral-divider"
import { wedding } from "@/lib/wedding"

export function InvitationPage() {
  const [opened, setOpened] = useState(false)

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {!opened && <EnvelopeIntro onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none fixed inset-0 z-[1]">
            <Petals count={10} />
          </div>

          <div className="relative z-[2]">
            <InvitationCard />
            <SectionDivider />
            <WeddingSchedule />
            <SectionDivider />
            <Countdown />
            <SectionDivider />
            <Rsvp />
            <SectionDivider />
            <MapSection />

            <footer className="border-t border-border bg-white px-6 py-16 text-center sm:py-20">
              <FloralDivider className="mx-auto h-10 w-10 opacity-70" />
              <p className="mt-6 font-script text-4xl text-foreground sm:text-5xl">
                {wedding.bride} & {wedding.groom}
              </p>
              <p className="mt-3 font-serif text-base text-muted">{wedding.date}</p>
              <p className="mt-2 font-serif text-sm text-muted">{wedding.venue}</p>
              <div className="mx-auto mt-8 h-px w-24 gold-line" />
              <p className="mt-6 font-serif text-xs tracking-[0.3em] text-muted">
                SEVGİYLE
              </p>
            </footer>
          </div>
        </motion.div>
      )}
    </main>
  )
}
