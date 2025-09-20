import { GameState, Team, BilingualString } from '../types';

// This service simulates a backend using localStorage.
// It can be replaced with actual backend calls (e.g., Firebase, Supabase).

const STORAGE_KEY = 'scientificMethodEscapeRoomGame';

interface StoredGameState {
  gameState: GameState;
  team: Team | null;
  currentRoomId: number;
  coins: number;
  roomProgress: Record<number, {
    unlockedActivities: number[];
    safeCode: (number | null)[];
    isSafeUnlocked: boolean;
  }>;
  finalPhraseWords: Record<string, BilingualString>;
}

const saveGame = (state: Omit<StoredGameState, 'gameState'> & { gameState: GameState }) => {
  try {
    const stateToSave: StoredGameState = {
      ...state,
      // We don't want to save the player in the middle of an activity or on a transient screen
      gameState: state.gameState === GameState.Playing ? GameState.MissionHub : state.gameState,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Failed to save game state:", error);
  }
};

const loadGame = (): StoredGameState | null => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
    return null;
  } catch (error) {
    console.error("Failed to load game state:", error);
    return null;
  }
};

const clearGame = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear game state:", error);
  }
};

export const gameService = {
  saveGame,
  loadGame,
  clearGame,
};
