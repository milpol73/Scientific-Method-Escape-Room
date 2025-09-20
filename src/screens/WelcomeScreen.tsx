import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/useGameStore';
import { BilingualText } from '../components/BilingualText';

const WelcomeScreen: React.FC = () => {
  const { startGame, toggleInstructions } = useGameStore((state) => state.actions);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center p-4 sm:p-8 max-w-4xl mx-auto flex flex-col items-center justify-center h-full bg-green-900/20 rounded-2xl"
      style={{
        backgroundImage: 'radial-gradient(circle at top, rgba(16, 185, 129, 0.1), transparent 70%)'
      }}
    >
      <motion.div variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-100 uppercase tracking-wider">
        <BilingualText as="h1" text={{ en: "Following the Scientific Method", es: "Siguiendo el Método Científico" }} />
      </motion.div>
      
      <motion.div variants={itemVariants} className="text-xl sm:text-2xl lg:text-3xl text-emerald-300 mt-2 mb-10">
        <BilingualText as="h2" text={{ en: "We learn science by doing science", es: "Aprendemos ciencia haciendo ciencia" }} />
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        <motion.button
          onClick={startGame}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(16, 185, 129, 0.7)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg text-lg sm:text-xl transition-all duration-300 shadow-lg shadow-emerald-500/30 border-2 border-emerald-400"
        >
          <BilingualText as="span" text={{ en: "Start Mission", es: "Iniciar Misión" }} />
        </motion.button>
        <motion.button
          onClick={() => toggleInstructions(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-slate-700/50 text-emerald-200 font-bold py-3 px-8 rounded-lg text-lg sm:text-xl hover:bg-slate-700 transition-all duration-300 border-2 border-slate-600"
        >
          <BilingualText as="span" text={{ en: "How to Play", es: "Cómo Jugar" }} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
