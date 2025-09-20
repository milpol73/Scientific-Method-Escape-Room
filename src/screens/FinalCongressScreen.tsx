import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/useGameStore';
import { SCIENTISTS } from '../gameData/teams';
import { BilingualText } from '../components/BilingualText';

const FinalCongressScreen: React.FC = () => {
  const team = useGameStore((state) => state.team);
  const { goToSummary } = useGameStore((state) => state.actions);
  const [finalPhrase, setFinalPhrase] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  const scientist = SCIENTISTS.find(s => s.id === team?.scientistId);

  if (!scientist || !team) {
    return <div>Loading...</div>;
  }
  
  const handleReveal = () => {
    // In a real app, we'd validate the phrase. Here we just reveal.
    setIsRevealed(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-5xl p-8 bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700 text-center flex flex-col items-center"
      style={{ backgroundImage: "url('/backgrounds/congress-hall.jpg')", backgroundSize: 'cover' }}
    >
        <div className="bg-slate-900/70 p-6 rounded-lg">

            <BilingualText as="h1" text={{ en: "The International Science Congress", es: "El Congreso Científico Internacional" }} className="text-4xl font-bold text-cyan-300 mb-4" />
            
            {!isRevealed ? (
                <>
                    <BilingualText as="p" text={{ en: "Your final task is to combine the words you've collected to form the motivational phrase and unlock the final presentation.", es: "Vuestra tarea final es combinar las palabras que habéis recogido para formar la frase motivacional y desbloquear la presentación final." }} className="text-slate-200 text-lg mb-6" />
                    <input
                        type="text"
                        value={finalPhrase}
                        onChange={(e) => setFinalPhrase(e.target.value)}
                        placeholder="Enter the final phrase..."
                        className="w-full max-w-lg p-3 bg-slate-700 text-white rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
                    />
                    <button
                        onClick={handleReveal}
                        className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-emerald-600 transition-colors"
                    >
                        Reveal Discovery
                    </button>
                </>
            ) : (
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex flex-col items-center">
                    <BilingualText as="h2" text={{ en: "Discovery Unveiled!", es: "¡Descubrimiento Revelado!" }} className="text-3xl font-bold text-emerald-400 my-4" />
                    <img src={scientist.discoveryImage} alt={scientist.discovery.en} className="my-4 rounded-lg shadow-lg max-w-md w-full" />
                    <div className="max-w-2xl">
                         <BilingualText as="p" text={scientist.discovery} className="text-slate-100 text-xl" />
                    </div>
                    <button
                        onClick={goToSummary}
                        className="mt-8 bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-600 transition-colors"
                    >
                        View Mission Summary
                    </button>
                </motion.div>
            )}
        </div>
    </motion.div>
  );
};

export default FinalCongressScreen;
