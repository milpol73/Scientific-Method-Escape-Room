import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/useGameStore';
import { BilingualText } from '../components/BilingualText';

const GameOverScreen: React.FC = () => {
  const { restartGame } = useGameStore((state) => state.actions);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="text-center p-8 max-w-lg mx-auto bg-red-900/30 border-2 border-red-500 rounded-2xl flex flex-col items-center justify-center"
    >
      <h1 className="text-5xl font-bold text-red-400 mb-4">
        <BilingualText text={{ en: "Mission Failed", es: "Misión Fallida" }} />
      </h1>
      <p className="text-lg text-red-200 mb-8">
        <BilingualText text={{ en: "Your research funds have run out, or a critical error has compromised the experiment. The discovery remains hidden... for now.", es: "Tus fondos de investigación se han agotado o un error crítico ha comprometido el experimento. El descubrimiento permanece oculto... por ahora." }} />
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          onClick={restartGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-600 transition-colors"
        >
          <BilingualText text={{ en: "Try Again", es: "Intentar de Nuevo" }} as="span" />
        </motion.button>
        <motion.button
          onClick={restartGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border-2 border-slate-600 text-slate-200 font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-800 transition-colors"
        >
          <BilingualText text={{ en: "Main Menu", es: "Menú Principal" }} as="span" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GameOverScreen;
