import { FloralDivider } from "@/components/floral-divider"

export function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 px-6 py-10">
      <div className="h-px flex-1 max-w-[120px] gold-line" />
      <FloralDivider className="h-8 w-8 opacity-80" />
      <div className="h-px flex-1 max-w-[120px] gold-line" />
    </div>
  )
}
