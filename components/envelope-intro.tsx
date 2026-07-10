"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FloralDivider } from "@/components/floral-divider"
import { Petals } from "@/components/petals"
import { wedding } from "@/lib/wedding"

export function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false)

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    window.setTimeout(onOpen, 2200)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden px-6"
      style={{
        background:
          "radial-gradient(circle at 50% 35%, #ffffff, #fdfdf9 65%, #f5f5f0)",
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: opened ? 0 : 1 }}
      transition={{ duration: 0.9, delay: opened ? 1.4 : 0 }}
    >
      <Petals count={10} />

      <div className="relative flex w-full max-w-sm flex-col items-center">
        <motion.div
          className="mb-8 text-center sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-accent">
            Dijital Davetiye
          </p>
          <div className="flex items-center justify-center">
            <h1 className="font-script text-5xl leading-none text-foreground sm:text-6xl">
              {wedding.bride}
            </h1>
            <FloralDivider className="mx-2 h-12 w-12 sm:mx-3 sm:h-14 sm:w-14" />
            <h1 className="font-script text-5xl leading-none text-foreground sm:text-6xl">
              {wedding.groom}
            </h1>
          </div>
        </motion.div>

        <motion.button
          type="button"
          onClick={handleOpen}
          aria-label="Davetiyeyi aç"
          className="group relative h-52 w-80 max-w-full cursor-pointer rounded-sm outline-none sm:h-56 sm:w-96"
          style={{ perspective: 1200 }}
          whileHover={opened ? {} : { scale: 1.02 }}
          whileTap={opened ? {} : { scale: 0.98 }}
        >
          {/* Envelope body */}
          <div className="absolute inset-0 overflow-hidden rounded-sm bg-white shadow-xl shadow-black/8">
            <div className="absolute inset-x-0 bottom-0 h-[38%] stripe-pattern" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, transparent 49.6%, rgba(212,207,196,0.4) 50%, transparent 50.4%), linear-gradient(-135deg, transparent 49.6%, rgba(212,207,196,0.4) 50%, transparent 50.4%)",
              }}
            />
          </div>

          {/* Card sliding up */}
          <motion.div
            className="absolute left-1/2 top-4 z-20 flex h-[88%] w-[86%] -translate-x-1/2 flex-col items-center justify-center rounded-sm border border-border bg-white px-4 text-center shadow-md"
            initial={{ y: 0, opacity: 0 }}
            animate={opened ? { y: "-58%", opacity: 1 } : { y: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif text-xl italic text-accent sm:text-2xl">
              Davetlisiniz
            </p>
            <div className="my-3 h-px w-16 gold-line" />
            <div className="flex items-center justify-center gap-2">
              <span className="font-script text-3xl text-foreground sm:text-4xl">
                {wedding.bride}
              </span>
              <FloralDivider className="h-8 w-8 sm:h-10 sm:w-10" />
              <span className="font-script text-3xl text-foreground sm:text-4xl">
                {wedding.groom}
              </span>
            </div>
            <p className="mt-2 font-serif text-[10px] uppercase tracking-[0.35em] text-muted sm:text-xs">
              {wedding.date}
            </p>
          </motion.div>

          {/* Bottom cover */}
          <div
            className="absolute inset-x-0 bottom-0 z-30 h-[58%] rounded-b-sm bg-cream-dark"
            style={{
              clipPath: "polygon(0 18%, 50% 0, 100% 18%, 100% 100%, 0 100%)",
              borderTop: "1px solid #d4cfc4",
            }}
          />

          {/* Top flap */}
          <motion.div
            className="absolute inset-x-0 top-0 z-40 h-1/2 origin-top bg-white"
            style={{
              transformStyle: "preserve-3d",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              borderBottom: "1px solid #d4cfc4",
            }}
            initial={{ rotateX: 0 }}
            animate={opened ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          >
            <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2">
              <FloralDivider className="h-10 w-10 opacity-90 sm:h-12 sm:w-12" />
            </div>
          </motion.div>

          {/* Seal */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-50 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-cream-dark shadow-md"
            animate={opened ? { opacity: 0, scale: 0.4 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-script text-lg text-foreground">
              {wedding.bride[0]}&{wedding.groom[0]}
            </span>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {!opened && (
            <motion.p
              className="mt-10 text-xs uppercase tracking-[0.3em] text-muted sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
            >
              Açmak için dokunun
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
