import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/useGameStore';
import { SCIENTISTS } from '../gameData/teams';
import { ROOMS_DATA } from '../gameData/rooms';
import { BilingualText } from '../components/BilingualText';
import { RoomIndicator } from '../components/RoomIndicator';

const MissionHubScreen: React.FC = () => {
  const team = useGameStore((state) => state.team);
  const currentRoomId = useGameStore((state) => state.currentRoomId);
  const roomProgress = useGameStore((state) => state.roomProgress);
  const { enterRoom } = useGameStore((state) => state.actions);

  const scientist = SCIENTISTS.find(s => s.id === team?.scientistId);

  if (!scientist || !team) {
    // Handle case where data is missing, perhaps redirect or show error
    return <div>Loading scientist data...</div>;
  }

  const getRoomStatus = (roomId: number) => {
    if (roomProgress[roomId]?.isSafeUnlocked) {
      return 'completed';
    }
    if (roomId === currentRoomId) {
      return 'active';
    }
    return 'locked';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-6xl p-4 sm:p-8 flex flex-col items-center"
    >
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 bg-slate-800/30 p-6 rounded-2xl border border-slate-700 w-full">
        <motion.img
          src={scientist.imageUrl}
          alt={scientist.name}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-cyan-400 object-cover"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
        <div className="text-center md:text-left">
          <BilingualText as="h1" text={{ en: `A Message from ${scientist.name}`, es: `Un Mensaje de ${scientist.name}` }} className="text-2xl md:text-3xl font-bold text-white mb-2" />
          <BilingualText as="p" text={scientist.narrative.missionHub} className="text-slate-300 text-base md:text-lg" />
        </div>
      </div>

      <div className="w-full">
         <BilingualText as="h2" text={{ en: "Mission Rooms", es: "Salas de la Misión" }} className="text-3xl font-bold text-center text-cyan-300 mb-8" />
         <div className="flex flex-wrap justify-center items-start gap-4 md:gap-8">
            {ROOMS_DATA.map((room, index) => (
                <React.Fragment key={room.id}>
                    <RoomIndicator
                        room={room}
                        status={getRoomStatus(room.id)}
                        onClick={() => enterRoom(room.id)}
                    />
                    {index < ROOMS_DATA.length - 1 && (
                        <div className={`hidden md:block self-center h-1 w-16 rounded transition-colors duration-500 ${getRoomStatus(room.id) === 'completed' ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                    )}
                </React.Fragment>
            ))}
         </div>
      </div>
    </motion.div>
  );
};

export default MissionHubScreen;
