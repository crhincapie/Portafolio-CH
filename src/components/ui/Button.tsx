import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants: Record<"primary" | "outline" | "ghost", string> = {
  primary:
    "bg-[#00feff] text-zinc-950 shadow-[0_0_40px_rgba(0,254,255,0.25)] hover:bg-[#7afcff]",
  outline:
    "border border-white/15 bg-transparent text-white hover:border-[#00feff]/60 hover:text-[#00feff]",
  ghost: "text-zinc-300 hover:text-white",
};

type Props = {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: keyof typeof variants;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function Button({
  children,
  href,
  external,
  variant = "primary",
  className,
  type = "button",
  ...rest
}: Props) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00feff]",
    variants[variant],
    className,
  );

  if (href?.startsWith("#")) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  if (href?.startsWith("mailto:") || href?.startsWith("tel:")) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  if (href && external) {
    return (
      <a href={href} className={styles} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  if (href) {
    return <Link href={href} className={styles}>{children}</Link>;
  }

  return (
    <button type={type} className={styles} {...rest}>
      {children}
    </button>
  );
}
