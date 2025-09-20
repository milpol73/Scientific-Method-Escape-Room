import React from 'react';
import { LockIcon } from './icons/LockIcon';
import { UnlockIcon } from './icons/UnlockIcon';
import { CheckIcon } from './icons/CheckIcon';
import { motion } from 'framer-motion';

interface RoomIndicatorProps {
  room: { id: number; title: { en: string } };
  status: 'locked' | 'active' | 'completed';
  onClick: () => void;
}

const statusConfig = {
  locked: {
    bgColor: 'bg-slate-700',
    borderColor: 'border-slate-600',
    textColor: 'text-slate-400',
    icon: <LockIcon className="w-8 h-8" />,
  },
  active: {
    bgColor: 'bg-cyan-600',
    borderColor: 'border-cyan-400',
    textColor: 'text-cyan-300',
    icon: null,
  },
  completed: {
    bgColor: 'bg-emerald-600',
    borderColor: 'border-emerald-400',
    textColor: 'text-emerald-300',
    icon: <CheckIcon className="w-8 h-8" />,
  },
};

export const RoomIndicator: React.FC<RoomIndicatorProps> = ({ room, status, onClick }) => {
  const config = statusConfig[status];
  const isClickable = status !== 'locked';

  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={isClickable ? { scale: 1.05 } : {}}
      whileTap={isClickable ? { scale: 0.95 } : {}}
    >
      <button
        onClick={onClick}
        disabled={!isClickable}
        className={`relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border-4 transition-all duration-300 ${config.bgColor} ${config.borderColor} ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'} shadow-lg`}
        aria-label={`Room ${room.id}: ${room.title.en} (${status})`}
      >
        {status === 'active' && <div className="absolute inset-0 rounded-full bg-cyan-500/50 animate-ping"></div>}
        <div className="z-10 text-white">
          {config.icon || <span className="text-4xl font-bold">{room.id}</span>}
        </div>
      </button>
      <span className={`mt-3 text-sm md:text-base font-medium text-center ${config.textColor}`}>
        {room.title.en}
      </span>
    </motion.div>
  );
};
