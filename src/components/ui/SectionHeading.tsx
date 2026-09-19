import { cn } from "@/lib/utils";

type Props = {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div className={cn("max-w-3xl space-y-4", align === "center" && "mx-auto text-center", className)}>
      {kicker ? (
        <p className="accent-chip text-xs font-semibold uppercase tracking-[0.35em]">{kicker}</p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-pretty text-base leading-relaxed text-muted md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
