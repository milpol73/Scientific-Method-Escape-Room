export interface BilingualString {
  en: string;
  es: string;
}

export enum GameState {
  Welcome,
  TeamSelection,
  MissionHub,
  Playing,
  Congress,
  Summary,
  GameOver,
}

// ============== TEAM & PLAYER ==============
export interface Avatar {
  id: string;
  url: string; // path to image
}

export interface Player {
  id: string;
  name: string;
  avatar: Avatar;
  score: number;
  completedActivities: Record<number, number[]>; // { roomId: [activityId, ...] }
}

export interface Team {
  id: string;
  name: BilingualString;
  players: Player[];
  scientistId: number;
}

// ============== SCIENTIST ==============
export interface Scientist {
  id: number;
  name: string;
  field: BilingualString;
  institution: string;
  imageUrl: string; // path to image
  bio: BilingualString[];
  discovery: BilingualString;
  discoveryImage: string;
  narrative: {
    welcome: BilingualString;
    missionHub: BilingualString;
    roomIntro: Record<number, BilingualString>; // { 1: "...", 2: "..." }
    hints: Record<number, Record<number, BilingualString>>; // { roomId: { activityId: "hint" }}
  };
}


// ============== GAME CONTENT (ROOMS & ACTIVITIES) ==============

export enum ActivityType {
  MultipleChoice,
  Matching,
  Ordering,
  FindTheDifference,
  Jigsaw,
  Cipher,
  Pattern,
}

interface ActivityBase {
  id: number;
  title: BilingualString;
  type: ActivityType;
  instruction: BilingualString;
  unlocksLetter: string; // Letter to unlock next activity
  unlocksNumber: number; // Number for the safe
  unlocksWord: BilingualString; // Word for the final phrase
  feedback: {
    correct: BilingualString;
    incorrect: BilingualString;
  };
}

export interface MultipleChoiceOption {
  text: BilingualString;
  isCorrect: boolean;
}

export interface MultipleChoiceActivity extends ActivityBase {
  type: ActivityType.MultipleChoice;
  question: BilingualString;
  options: MultipleChoiceOption[];
}

export interface MatchingPair {
  id: string;
  term: BilingualString;
  definition: BilingualString;
}

export interface MatchingActivity extends ActivityBase {
  type: ActivityType.Matching;
  pairs: MatchingPair[];
}

export interface OrderingItem {
  id: string;
  text: BilingualString;
  correctOrder: number;
}

export interface OrderingActivity extends ActivityBase {
  type: ActivityType.Ordering;
  items: OrderingItem[];
}

// NOTE: Other activity types would be defined here following the same pattern.
// For brevity in this prototype, we'll focus on these three.
export type Activity = MultipleChoiceActivity | MatchingActivity | OrderingActivity;

export interface Hotspot {
  id: number; // Corresponds to activity id
  x: string; // e.g., '50%'
  y: string; // e.g., '30%'
}

export interface RoomData {
  id: number;
  title: BilingualString;
  backgroundUrl: string; // path to image
  ambientSound: string; // path to audio file
  activities: Activity[];
  hotspots: Hotspot[];
}

// ============== GAME STATE & STORE ==============
export interface GameSession {
  gameState: GameState;
  team: Team | null;
  currentRoomId: number;
  coins: number;
  roomProgress: Record<number, {
    unlockedActivities: number[];
    safeCode: (number | null)[];
    isSafeUnlocked: boolean;
  }>;
  finalPhraseWords: Record<string, BilingualString>; // { playerId: word }
}