import { create } from 'zustand';
import { GameState, Team, Player, Avatar, BilingualString } from '../types';
import { gameService } from '../services/gameService';
import { SCIENTISTS, TEAMS } from '../gameData/teams';
import { ROOMS_DATA } from '../gameData/rooms';

interface GameStore {
  gameState: GameState;
  team: Team | null;
  currentRoomId: number;
  activeActivityId: number | null;
  coins: number;
  roomProgress: Record<number, {
    unlockedActivities: number[];
    safeCode: (number | null)[];
    isSafeUnlocked: boolean;
  }>;
  finalPhraseWords: Record<string, BilingualString>;
  showInstructions: boolean;

  // Actions
  actions: {
    init: () => void;
    startGame: () => void;
    selectTeam: (teamId: string, players: { name: string, avatar: Avatar }[]) => void;
    goToMissionHub: () => void;
    enterRoom: (roomId: number) => void;
    startActivity: (activityId: number) => void;
    closeActivity: () => void;
    completeActivity: (activityId: number, points: number, coins: number) => void;
    useHint: (cost: number) => boolean;
    unlockSafe: (roomId: number) => void;
    collectPhraseWord: (playerId: string, word: BilingualString) => void;
    completeGame: () => void;
    goToSummary: () => void;
    restartGame: () => void;
    toggleInstructions: (show?: boolean) => void;
    deductCoins: (amount: number) => boolean;
    triggerGameOver: () => void;
    // FIX: Add saveState to the actions interface to match the implementation.
    saveState: () => void;
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: GameState.Welcome,
  team: null,
  currentRoomId: 1,
  activeActivityId: null,
  coins: 100,
  roomProgress: {},
  finalPhraseWords: {},
  showInstructions: false,

  actions: {
    init: () => {
      const savedState = gameService.loadGame();
      if (savedState) {
        set(savedState);
      } else {
        // Initialize for a new game
        const initialRoomProgress = ROOMS_DATA.reduce((acc, room) => {
          acc[room.id] = {
            unlockedActivities: [room.activities[0].id],
            safeCode: Array(room.activities.length).fill(null),
            isSafeUnlocked: false,
          };
          return acc;
        }, {} as GameStore['roomProgress']);
        set({ roomProgress: initialRoomProgress });
      }
    },
    startGame: () => set({ gameState: GameState.TeamSelection }),
    selectTeam: (teamId, playersData) => {
      const teamTemplate = TEAMS.find(t => t.id === teamId);
      if (!teamTemplate) return;

      const newPlayers: Player[] = playersData.map((p, i) => ({
        id: `player-${i + 1}`,
        name: p.name,
        avatar: p.avatar,
        score: 0,
        completedActivities: {},
      }));

      const newTeam: Team = {
        ...teamTemplate,
        players: newPlayers,
      };
      
      set({ team: newTeam, gameState: GameState.MissionHub });
      get().actions.saveState();
    },
    goToMissionHub: () => set({ gameState: GameState.MissionHub, activeActivityId: null }),
    enterRoom: (roomId) => {
      if (roomId > get().currentRoomId) return; // Prevent entering locked rooms
      set({ gameState: GameState.Playing, currentRoomId: roomId, activeActivityId: null });
    },
    startActivity: (activityId) => set({ activeActivityId: activityId }),
    closeActivity: () => set({ activeActivityId: null }),
    completeActivity: (activityId, points, newCoins) => {
      const { team, currentRoomId } = get();
      if (!team) return;
      
      const roomData = ROOMS_DATA.find(r => r.id === currentRoomId);
      const activity = roomData?.activities.find(a => a.id === activityId);
      if (!activity) return;

      const nextActivityId = activityId + 1;
      const nextActivityExists = roomData?.activities.some(a => a.id === nextActivityId);

      set(state => {
        const newProgress = { ...state.roomProgress };
        const currentRoomProgress = { ...newProgress[currentRoomId] };

        // Unlock next activity
        if (nextActivityExists && !currentRoomProgress.unlockedActivities.includes(nextActivityId)) {
          currentRoomProgress.unlockedActivities = [...currentRoomProgress.unlockedActivities, nextActivityId];
        }

        // Add number to safe code
        const activityIndex = roomData.activities.findIndex(a => a.id === activityId);
        if(activityIndex !== -1) {
            currentRoomProgress.safeCode[activityIndex] = activity.unlocksNumber;
        }

        newProgress[currentRoomId] = currentRoomProgress;

        return {
          roomProgress: newProgress,
          coins: state.coins + newCoins,
          activeActivityId: null,
          // TODO: Add points to player score
        };
      });
      get().actions.saveState();
    },
    useHint: (cost) => {
        if (get().coins >= cost) {
            set(state => ({ coins: state.coins - cost }));
            get().actions.saveState();
            return true;
        }
        return false;
    },
    unlockSafe: (roomId) => {
        set(state => {
            const newProgress = { ...state.roomProgress };
            newProgress[roomId] = { ...newProgress[roomId], isSafeUnlocked: true };
            // Unlock next room
            const nextRoomId = roomId + 1;
            const nextRoomExists = ROOMS_DATA.some(r => r.id === nextRoomId);
            if(nextRoomExists) {
                return { roomProgress: newProgress, currentRoomId: nextRoomId, gameState: GameState.MissionHub };
            } else {
                return { roomProgress: newProgress, gameState: GameState.Congress };
            }
        });
        get().actions.saveState();
    },
    collectPhraseWord: (playerId, word) => {
        set(state => ({
            finalPhraseWords: { ...state.finalPhraseWords, [playerId]: word }
        }));
        get().actions.saveState();
    },
    completeGame: () => set({ gameState: GameState.Congress }),
    goToSummary: () => set({ gameState: GameState.Summary }),
    restartGame: () => {
        gameService.clearGame();
        const initialRoomProgress = ROOMS_DATA.reduce((acc, room) => {
          acc[room.id] = {
            unlockedActivities: [room.activities[0].id],
            safeCode: Array(room.activities.length).fill(null),
            isSafeUnlocked: false,
          };
          return acc;
        }, {} as GameStore['roomProgress']);
      
        set({
            gameState: GameState.Welcome,
            team: null,
            currentRoomId: 1,
            activeActivityId: null,
            coins: 100,
            roomProgress: initialRoomProgress,
            finalPhraseWords: {},
        });
    },
    toggleInstructions: (show) => set(state => ({ showInstructions: show !== undefined ? show : !state.showInstructions })),

    deductCoins: (amount) => {
      if (get().coins >= amount) {
        set(state => ({ coins: state.coins - amount }));
        get().actions.saveState();
        return true;
      }
      // Not enough coins, trigger game over
      get().actions.triggerGameOver();
      return false;
    },

    triggerGameOver: () => {
      set({ gameState: GameState.GameOver });
    },

    // Helper to save state
    saveState: () => {
        const { gameState, team, currentRoomId, coins, roomProgress, finalPhraseWords } = get();
        gameService.saveGame({ gameState, team, currentRoomId, coins, roomProgress, finalPhraseWords });
    }
  },
}));

// Initialize store on load
useGameStore.getState().actions.init();