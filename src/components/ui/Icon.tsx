import {
  Globe,
  Trophy,
  Users,
  Landmark,
  Network,
  CircleDot,
  Building2,
  Star,
  type LucideIcon,
} from "lucide-react"

// Maps the former Material Symbols names to lucide icons so no icon webfont has to load.
const ICONS: Record<string, LucideIcon> = {
  public: Globe,
  sports_soccer: CircleDot,
  groups: Users,
  stadium: Landmark,
  location_city: Building2,
  account_tree: Network,
  emoji_events: Trophy,
  trophy: Trophy,
  star: Star,
}

interface IconProps {
  name: string
  size?: number
  className?: string
}

export default function Icon({ name, size = 24, className }: IconProps) {
  const Component = ICONS[name] ?? Star
  return <Component size={size} className={className} aria-hidden="true" strokeWidth={1.5} />
}
