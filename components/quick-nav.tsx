const links = [
  { href: "#dugun-akisi", label: "Düğün Akışı" },
  { href: "#geri-sayim", label: "Geri Sayım" },
  { href: "#katilim", label: "Katılım" },
  { href: "#konum", label: "Konum" },
]

export function QuickNav() {
  return (
    <nav
      aria-label="Sayfa bölümleri"
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="rounded-full border border-border bg-white/80 px-4 py-2 font-serif text-xs tracking-wide text-foreground backdrop-blur-sm transition hover:border-accent hover:bg-white sm:px-5 sm:text-sm"
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
