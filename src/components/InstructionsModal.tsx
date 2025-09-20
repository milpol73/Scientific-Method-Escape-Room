import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/useGameStore';
import { BilingualText } from './BilingualText';
import { XIcon } from './icons/XIcon';

const InstructionsModal: React.FC = () => {
  const { toggleInstructions } = useGameStore((state) => state.actions);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={() => toggleInstructions(false)}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
            <BilingualText as="h2" text={{ en: "How to Play", es: "Cómo Jugar" }} className="text-2xl font-bold text-cyan-300" />
             <button onClick={() => toggleInstructions(false)} className="text-slate-400 hover:text-white">
                <XIcon className="w-6 h-6" />
            </button>
        </div>
        <div className="space-y-3 text-slate-300">
            <p>1. <strong>Explore:</strong> In each room, click around the scene to find hidden interactive 'hotspots'.</p>
            <p>2. <strong>Solve:</strong> Each hotspot contains an activity. Solve it to earn rewards and unlock the next step.</p>
            <p>3. <strong>Unlock:</strong> Completing an activity gives you a letter (to unlock the next activity), a number (for the safe), and a word (for the final phrase).</p>
            <p>4. <strong>Collaborate:</strong> Your team shares coins. Help each other out! At the end, you'll need to combine your collected words.</p>
            <p>5. <strong>Advance:</strong> Once all 7 activities in a room are solved, use the 7 numbers to unlock the safe and get the key to the next room.</p>
            <p>6. <strong>Win:</strong> Complete all 5 rooms and solve the final phrase puzzle to help your scientist reveal their discovery!</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InstructionsModal;
