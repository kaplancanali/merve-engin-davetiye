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
            <Petals count={8} />
          </div>

          <div className="relative z-[2]">
            <InvitationCard />
            <WeddingSchedule />
            <Countdown />
            <Rsvp />
            <MapSection />

            <footer className="border-t border-border bg-white py-8 text-center">
              <p className="font-script text-2xl text-foreground">
                {wedding.bride} & {wedding.groom}
              </p>
              <p className="mt-2 font-serif text-sm text-muted">
                {wedding.date}
              </p>
            </footer>
          </div>
        </motion.div>
      )}
    </main>
  )
}
