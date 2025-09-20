import React from 'react';
import { useGameStore } from '../stores/useGameStore';
import { SCIENTISTS } from '../gameData/teams';
import { BilingualText } from './BilingualText';
import { motion } from 'framer-motion';

const Hud: React.FC = () => {
  const { team, coins, gameState } = useGameStore();
  const { toggleInstructions } = useGameStore((state) => state.actions);
  const scientist = SCIENTISTS.find(s => s.id === team?.scientistId);

  if (!team || !scientist) return null;

  return (
    <>
      {/* Top Bar - Team Info & Coins */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-slate-900/50 backdrop-blur-sm p-2 px-4 flex justify-between items-center z-40 border-b border-slate-700"
      >
        <div>
          <BilingualText text={team.name} as="h3" className="font-bold text-lg text-cyan-300" />
          <div className="flex items-center gap-2">
            {team.players.map(p => (
              <div key={p.id} className="flex items-center gap-1" title={p.name}>
                <img src={p.avatar.url} alt={p.name} className="w-6 h-6 rounded-full" />
                <span className="text-sm text-slate-300 hidden sm:inline">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-right">
            <span className="text-yellow-400 font-bold text-2xl">{coins}</span>
            <p className="text-xs text-yellow-500">COINS</p>
        </div>
      </motion.div>

      {/* Bottom Bar - Scientist & Instructions */}
       <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-slate-900/50 backdrop-blur-sm p-2 px-4 flex justify-between items-center z-40 border-t border-slate-700"
      >
        <div className="flex items-center gap-3">
            <img src={scientist.imageUrl} alt={scientist.name} className="w-12 h-12 rounded-full border-2 border-cyan-400"/>
            <div>
                <p className="font-bold text-white">{scientist.name}</p>
                <button className="text-sm text-cyan-400 hover:underline">Ask for a hint (-40 coins)</button>
            </div>
        </div>
         <button
          onClick={() => toggleInstructions(true)}
          className="bg-slate-700/50 text-emerald-200 font-bold py-2 px-4 rounded-lg text-sm hover:bg-slate-700 transition-all duration-300 border border-slate-600"
        >
          Instructions
        </button>
      </motion.div>
    </>
  );
};

export default Hud;
