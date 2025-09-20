import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/useGameStore';
import { ROOMS_DATA } from '../gameData/rooms';
import { BilingualText } from './BilingualText';
import { XIcon } from './icons/XIcon';
import { Activity, ActivityType } from '../types';
import MultipleChoiceActivityView from './activities/MultipleChoiceActivityView';
import MatchingActivityView from './activities/MatchingActivityView';
import OrderingActivityView from './activities/OrderingActivityView';

interface ActivityModalProps {
  activityId: number;
  roomId: number;
  onClose: () => void;
}

const ActivityRenderer: React.FC<{ activity: Activity, onSolve: (points: number, coins: number) => void }> = ({ activity, onSolve }) => {
    switch (activity.type) {
        case ActivityType.MultipleChoice:
            return <MultipleChoiceActivityView activity={activity} onSolve={onSolve} />;
        case ActivityType.Matching:
            return <MatchingActivityView activity={activity} onSolve={onSolve} />;
        case ActivityType.Ordering:
            return <OrderingActivityView activity={activity} onSolve={onSolve} />;
        default:
            return <div>Activity type not implemented yet.</div>;
    }
}

const ActivityModal: React.FC<ActivityModalProps> = ({ activityId, roomId, onClose }) => {
  const { completeActivity } = useGameStore((state) => state.actions);

  const room = ROOMS_DATA.find(r => r.id === roomId);
  const activity = room?.activities.find(a => a.id === activityId);

  if (!activity) {
    return null; // Or some error state
  }
  
  const handleSolve = (points: number, coins: number) => {
    completeActivity(activityId, points, coins);
    // onClose will be called from the store action after state update
  };

  return (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-3xl w-full"
      >
        <div className="flex justify-between items-start mb-4">
            <div>
                <BilingualText as="h2" text={activity.title} className="text-2xl font-bold text-cyan-300" />
                <BilingualText as="p" text={activity.instruction} className="text-slate-400 mt-1" />
            </div>
             <button onClick={onClose} className="text-slate-400 hover:text-white">
                <XIcon className="w-7 h-7" />
            </button>
        </div>
        
        <div className="mt-6">
            <ActivityRenderer activity={activity} onSolve={handleSolve} />
        </div>

      </motion.div>
    </motion.div>
  );
};

export default ActivityModal;
