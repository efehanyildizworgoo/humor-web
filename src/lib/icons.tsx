import {
  Megaphone,
  Lightbulb,
  PenTool,
  BarChart3,
  Clapperboard,
  Video,
  Plane,
  Radio,
  FileText,
  Camera,
  Mic,
  Music,
  Palette,
  Rocket,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Globe,
  MessageSquare,
  Image as ImageIcon,
  Film,
  Tv,
  Headphones,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Megaphone,
  Lightbulb,
  PenTool,
  BarChart3,
  Clapperboard,
  Video,
  Plane,
  Radio,
  FileText,
  Camera,
  Mic,
  Music,
  Palette,
  Rocket,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Globe,
  MessageSquare,
  Image: ImageIcon,
  Film,
  Tv,
  Headphones,
};

/** Returns a Lucide component by stored name. Falls back to FileText. */
export function getIcon(name: string | null | undefined): LucideIcon {
  if (!name) return FileText;
  return ICON_MAP[name] ?? FileText;
}

/** Wrapper component that renders a Lucide icon by name. */
export function Icon({
  name,
  className,
  ...props
}: {
  name: string | null | undefined;
  className?: string;
} & React.ComponentProps<LucideIcon>) {
  const C = getIcon(name);
  return <C className={className} {...props} />;
}
