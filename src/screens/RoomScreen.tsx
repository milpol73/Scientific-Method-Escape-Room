import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../stores/useGameStore';
import { ROOMS_DATA } from '../gameData/rooms';
import ActivityModal from '../components/ActivityModal';
import Safe from '../components/Safe';

const Hotspot: React.FC<{
  id: number;
  x: string;
  y: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
}> = ({ id, x, y, isUnlocked, isCompleted, onClick }) => {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isUnlocked && !isCompleted) {
      // After a delay, start showing a hint pulse if not found
      timer = setTimeout(() => {
        setShowHint(true);
      }, 15000); // 15 seconds
    }
    return () => clearTimeout(timer);
  }, [isUnlocked, isCompleted]);

  if (isCompleted) {
    // Optionally render something to show completion
    return null;
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={!isUnlocked}
      className="absolute w-12 h-12 rounded-full"
      style={{ left: `calc(${x} - 24px)`, top: `calc(${y} - 24px)` }}
      whileHover={isUnlocked ? { scale: 1.5 } : {}}
      aria-label={`Activity ${id}`}
    >
      {isUnlocked && (
        <div className={`w-full h-full rounded-full transition-opacity duration-500 ${showHint ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-cyan-400/80 rounded-full animate-ping"></div>
          <div className="absolute inset-0 bg-cyan-400/50 rounded-full"></div>
        </div>
      )}
    </motion.button>
  );
};


const RoomScreen: React.FC = () => {
  const currentRoomId = useGameStore((state) => state.currentRoomId);
  const activeActivityId = useGameStore((state) => state.activeActivityId);
  const roomProgress = useGameStore((state) => state.roomProgress);
  const { startActivity, closeActivity } = useGameStore((state) => state.actions);

  const roomData = ROOMS_DATA.find(r => r.id === currentRoomId);
  
  if (!roomData) return <div>Error: Room not found.</div>;
  
  const currentProgress = roomProgress[currentRoomId];
  const allActivitiesCompleted = currentProgress.safeCode.every(code => code !== null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full max-w-7xl mx-auto aspect-video relative rounded-lg shadow-2xl"
      style={{ 
        backgroundImage: `url(${roomData.backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Hotspots for activities */}
      {!allActivitiesCompleted && roomData.hotspots.map(hotspot => (
        <Hotspot
          key={hotspot.id}
          id={hotspot.id}
          x={hotspot.x}
          y={hotspot.y}
          isUnlocked={currentProgress.unlockedActivities.includes(hotspot.id)}
          isCompleted={false} // This would need more complex logic to track per-player
          onClick={() => startActivity(hotspot.id)}
        />
      ))}
      
      {/* Safe appears when all activities are done */}
      {allActivitiesCompleted && !currentProgress.isSafeUnlocked && <Safe roomId={roomData.id} />}

      {/* Activity Modal */}
      <AnimatePresence>
        {activeActivityId && (
          <ActivityModal
            activityId={activeActivityId}
            roomId={currentRoomId}
            onClose={closeActivity}
          />
        )}
      </AnimatePresence>

       {/* Audio player for ambient sound */}
      <audio src={roomData.ambientSound} autoPlay loop controls={false} />
    </motion.div>
  );
};

export default RoomScreen;
