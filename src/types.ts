export interface TravelNode {
  id: string;
  order: number;
  province: string;
  location: string;
  historicalContext: string;
  description: string;
  coordinates: { x: number; y: number }; // Percentage relative to the map scroll
  timeline?: string[];
  adventure?: string;
  stayDuration?: string;
  observations?: string[];
  modernGuide?: {
    highlights: string[];
    tips: string;
    bestTime: string;
  };
}

export interface EchoEntry {
  id: string;
  content: string;
  timestamp: number;
}

export interface AppState {
  currentStep: number;
  isPanelOpen: boolean;
  unlockedCount: number;
}