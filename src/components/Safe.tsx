import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/useGameStore';
import { BilingualText } from './BilingualText';
import { UnlockIcon } from './icons/UnlockIcon';

interface SafeProps {
  roomId: number;
}

const Safe: React.FC<SafeProps> = ({ roomId }) => {
  const [inputCode, setInputCode] = useState<string[]>(Array(7).fill(''));
  const [error, setError] = useState(false);
  const { roomProgress } = useGameStore();
  const { unlockSafe } = useGameStore((state) => state.actions);
  
  const correctCode = roomProgress[roomId].safeCode;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
        const newCode = [...inputCode];
        newCode[index] = value;
        setInputCode(newCode);

        // Move to next input
        if (value !== '' && index < 6) {
            const nextInput = document.getElementById(`safe-input-${index + 1}`);
            nextInput?.focus();
        }
    }
  };

  const handleSubmit = () => {
    const isCorrect = inputCode.join('') === correctCode.join('');
    if (isCorrect) {
      setError(false);
      unlockSafe(roomId);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center z-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-800 p-8 rounded-2xl border border-slate-600 shadow-2xl text-center"
      >
        <UnlockIcon className="w-16 h-16 mx-auto text-cyan-400 mb-4" />
        <BilingualText as="h2" text={{ en: "Unlock the Safe", es: "Desbloquea la Caja Fuerte" }} className="text-3xl font-bold mb-2" />
        <BilingualText as="p" text={{ en: "Enter the 7-digit code you collected.", es: "Introduce el código de 7 dígitos que has recogido." }} className="text-slate-400 mb-6" />
        
        <div className={`flex justify-center gap-2 mb-6 ${error ? 'animate-shake' : ''}`}>
          {inputCode.map((digit, index) => (
            <input
              key={index}
              id={`safe-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className={`w-12 h-14 text-center text-3xl font-bold bg-slate-700 rounded-lg border-2 ${error ? 'border-red-500' : 'border-slate-600'} focus:outline-none focus:ring-2 focus:ring-cyan-500`}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-emerald-500 text-white font-bold py-3 px-10 rounded-lg text-lg hover:bg-emerald-600 transition-colors"
        >
          Open
        </button>
      </motion.div>
    </div>
  );
};

export default Safe;
