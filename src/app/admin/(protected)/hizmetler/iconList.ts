// Curated list of lucide-react icons available in the admin picker.
// Keep in sync with src/lib/icons.tsx so public pages can resolve them.
export const LUCIDE_ICON_NAMES = [
  "Megaphone",
  "Lightbulb",
  "PenTool",
  "BarChart3",
  "Clapperboard",
  "Video",
  "Plane",
  "Radio",
  "FileText",
  "Camera",
  "Mic",
  "Music",
  "Palette",
  "Rocket",
  "Sparkles",
  "Star",
  "Target",
  "TrendingUp",
  "Users",
  "Globe",
  "MessageSquare",
  "Image",
  "Film",
  "Tv",
  "Headphones",
] as const;

export type IconName = (typeof LUCIDE_ICON_NAMES)[number];
