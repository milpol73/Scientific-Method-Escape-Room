import React, { createContext } from 'react';
import { createStore, useStore } from 'zustand';
import { GameState, Team, Player, Avatar } from '../types';
import { gameService } from '../services/gameService';
import { useGameStore } from '../stores/useGameStore';

// This file sets up the context provider, but the actual state logic
// has been moved to a Zustand store in `src/stores/useGameStore.ts`
// for better modularity and to avoid context provider hell.

type GameStore = ReturnType<typeof useGameStore.getState>;

export const GameContext = createContext<GameStore | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // The Zustand store is self-contained and doesn't need a provider,
  // but we keep this structure in case we want to inject other dependencies
  // via context in the future. For now, it just renders its children.
  // All state access will be through the `useGameStore` hook.
  return <>{children}</>;
};
