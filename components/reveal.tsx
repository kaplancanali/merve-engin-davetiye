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
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-12 text-center sm:mb-14">
      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.45em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl font-medium text-foreground sm:text-5xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl font-serif text-base text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-6 h-px w-32 gold-line" />
    </div>
  )
}
