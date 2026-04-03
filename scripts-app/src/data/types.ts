export type AgeGroup = "0-2" | "3-5" | "6-8" | "9-12" | "13+";
export type Category =
  | "meltdowns"
  | "bedtime"
  | "screen-time"
  | "discipline"
  | "emotions"
  | "sibling-conflict"
  | "morning-routine"
  | "difficult-conversations"
  | "motivation"
  | "boundaries";

export interface Script {
  id: string;
  slug: string;
  title: string;
  summary: string;
  situation: string;
  ageGroups: AgeGroup[];
  category: Category;
  isPremium: boolean;
  tags: string[];
  previewLines: string[]; // shown to free users
  fullScript: ScriptStep[];
  whyItWorks: string;
  commonMistake: string;
  rating?: number;
  saves?: number;
}

export interface ScriptStep {
  label: string;
  say: string;
  note?: string;
}
