import React from 'react';
import { useGameStore } from './stores/useGameStore';
import { GameState } from './types';
import WelcomeScreen from './screens/WelcomeScreen';
import TeamSelectionScreen from './screens/TeamSelectionScreen';
import MissionHubScreen from './screens/MissionHubScreen';
import RoomScreen from './screens/RoomScreen';
import FinalCongressScreen from './screens/FinalCongressScreen';
import SummaryScreen from './screens/SummaryScreen';
import GameOverScreen from './screens/GameOverScreen';
import { AnimatePresence, motion } from 'framer-motion';
import Hud from './components/Hud';
import InstructionsModal from './components/InstructionsModal';
import Copyright from './components/Copyright';

function App() {
  const gameState = useGameStore((state) => state.gameState);
  const showInstructions = useGameStore((state) => state.showInstructions);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Welcome:
        return <WelcomeScreen key="welcome" />;
      case GameState.TeamSelection:
        return <TeamSelectionScreen key="team-selection" />;
      case GameState.MissionHub:
        return <MissionHubScreen key="mission-hub" />;
      case GameState.Playing:
        return <RoomScreen key="playing" />;
      case GameState.Congress:
        return <FinalCongressScreen key="congress" />;
      case GameState.Summary:
        return <SummaryScreen key="summary" />;
      case GameState.GameOver:
        return <GameOverScreen key="game-over" />;
      default:
        return <WelcomeScreen key="default-welcome" />;
    }
  };

  const isHudVisible = [
    GameState.MissionHub,
    GameState.Playing,
    GameState.Congress,
  ].includes(gameState);

  return (
    <main className="bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
      
      {isHudVisible && <Hud />}
      
      <AnimatePresence>
        {showInstructions && <InstructionsModal />}
      </AnimatePresence>

      <Copyright />
    </main>
  );
}

export default App;