import Image from "next/image"

interface LogoProps {
  variant?: "dark" | "white"
  className?: string
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  return (
    <Image
      src={variant === "dark" ? "/logo-dark.svg" : "/logo-white.svg"}
      alt="Committed Citizens"
      width={200}
      height={94}
      className={className}
      priority
    />
  )
}
