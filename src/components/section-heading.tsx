import { cn } from "@/lib/utils";

export default function SectionHeading({
  index,
  label,
  title,
  description,
  className,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("reveal mb-12 max-w-2xl md:mb-16", className)}>
      <p className="text-brand mb-3 flex items-center gap-3 font-mono text-xs font-medium tracking-widest uppercase">
        <span>{index}</span>
        <span aria-hidden className="bg-brand/40 h-px w-8" />
        <span>{label}</span>
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mt-4 text-lg">{description}</p>
      )}
    </header>
  );
}
