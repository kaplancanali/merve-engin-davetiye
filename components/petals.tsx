"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"

type PetalsProps = {
  count?: number
  className?: string
}

export function Petals({ count = 12, className = "" }: PetalsProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 8 + Math.random() * 14
        return {
          id: i,
          left: Math.random() * 100,
          size,
          delay: Math.random() * 10,
          duration: 14 + Math.random() * 14,
          drift: (Math.random() - 0.5) * 120,
          rotate: Math.random() * 360,
          opacity: 0.2 + Math.random() * 0.35,
        }
      }),
    [count],
  )

  if (!mounted) return null

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-8%] block rounded-[60%_40%_55%_45%/55%_45%_60%_40%]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            background:
              "linear-gradient(135deg, #f5e6d0, #e8c9a0)",
            opacity: p.opacity,
          }}
          initial={{ y: "-10vh", rotate: p.rotate }}
          animate={{
            y: "115vh",
            x: [0, p.drift, 0],
            rotate: p.rotate + 280,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
