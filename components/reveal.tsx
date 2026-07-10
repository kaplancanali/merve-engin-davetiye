"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow?: string
  title: string
}) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl font-medium text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      <div className="mx-auto mt-5 h-px w-24 gold-line" />
    </div>
  )
}
