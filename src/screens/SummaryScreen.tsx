import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/useGameStore';
import { BilingualText } from '../components/BilingualText';

const SummaryScreen: React.FC = () => {
  const { team, coins } = useGameStore((state) => state);
  const { restartGame } = useGameStore((state) => state.actions);

  const handlePrint = () => {
    window.print();
  };
  
  if (!team) return <div>Loading summary...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl p-8 bg-slate-800 rounded-2xl border border-slate-700"
    >
      <div id="summary-content">
        <BilingualText as="h1" text={{ en: "Mission Accomplished!", es: "¡Misión Cumplida!" }} className="text-4xl font-bold text-center text-emerald-400 mb-2" />
        <BilingualText as="h2" text={team.name} className="text-2xl font-semibold text-center text-cyan-300 mb-8" />
        
        <div className="bg-slate-900/50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Team Performance</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-slate-400">Total Score:</p>
                    <p className="text-3xl font-bold text-emerald-300">{team.players.reduce((sum, p) => sum + p.score, 0)}</p>
                </div>
                 <div>
                    <p className="text-slate-400">Coins Remaining:</p>
                    <p className="text-3xl font-bold text-yellow-300">{coins}</p>
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-white mb-4">Individual Report</h3>
            <div className="space-y-4">
                {team.players.map(player => (
                    <div key={player.id} className="flex items-center gap-4 bg-slate-700/50 p-4 rounded-lg">
                        <img src={player.avatar.url} alt={player.name} className="w-16 h-16 rounded-full" />
                        <div className="flex-grow">
                            <p className="text-xl font-bold text-white">{player.name}</p>
                            {/* In a full implementation, more stats would be displayed here */}
                            <p className="text-slate-300">Score: {player.score}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-slate-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors"
        >
          Save as PDF / Print
        </button>
        <button
          onClick={restartGame}
          className="bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Start a New Experiment
        </button>
      </div>
    </motion.div>
  );
};

export default SummaryScreen;
