import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/useGameStore';
import { TEAMS, AVATARS } from '../gameData/teams';
import { BilingualText } from '../components/BilingualText';
import { Avatar, BilingualString } from '../types';

interface PlayerSetup {
  name: string;
  avatar: Avatar;
}

const TeamSelectionScreen: React.FC = () => {
  const { selectTeam } = useGameStore((state) => state.actions);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [players, setPlayers] = useState<PlayerSetup[]>([]);
  const [error, setError] = useState('');

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeamId(teamId);
    setPlayers([{ name: '', avatar: AVATARS[0] }, { name: '', avatar: AVATARS[1] }]);
    setError('');
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index].name = name;
    setPlayers(newPlayers);
  };
  
  const handlePlayerAvatarChange = (playerIndex: number, avatar: Avatar) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].avatar = avatar;
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    if (players.length < 4) {
      const nextAvatarIndex = players.length % AVATARS.length;
      setPlayers([...players, { name: '', avatar: AVATARS[nextAvatarIndex] }]);
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    if (!selectedTeamId) {
      setError('Please select a team.');
      return;
    }
    if (players.some(p => p.name.trim() === '')) {
      setError('All player names must be filled.');
      return;
    }
    selectTeam(selectedTeamId, players);
  };
  
  const selectedTeamName = useMemo(() => {
    return TEAMS.find(t => t.id === selectedTeamId)?.name || {en: 'Select a Team', es: 'Selecciona un Equipo'};
  }, [selectedTeamId]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-5xl p-4 sm:p-8 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700"
    >
      <BilingualText as="h1" text={{ en: "Assemble Your Research Team", es: "Reúne a tu Equipo de Investigación" }} className="text-3xl sm:text-4xl font-bold text-center text-cyan-300 mb-6" />

      {!selectedTeamId ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TEAMS.map(team => (
            <motion.button
              key={team.id}
              onClick={() => handleTeamSelect(team.id)}
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-slate-700 rounded-lg border border-slate-600 hover:bg-cyan-800 hover:border-cyan-500 transition-colors"
            >
              <BilingualText text={team.name} as="span" className="text-lg font-semibold text-white" />
            </motion.button>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-center mb-4">
            <BilingualText as="span" text={{en: "Team:", es: "Equipo:"}} />{' '}
            <BilingualText as="span" text={selectedTeamName} className="text-cyan-400" />
          </h2>

          <div className="space-y-4">
            {players.map((player, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-4 bg-slate-700 p-3 rounded-lg">
                <div className="flex-grow w-full">
                  <input
                    type="text"
                    placeholder={`Player ${index + 1} Name`}
                    value={player.name}
                    onChange={e => handlePlayerNameChange(index, e.target.value)}
                    className="w-full p-2 bg-slate-800 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                 <div className="flex items-center gap-2">
                    <BilingualText as="span" text={{en: "Avatar:", es:"Avatar:"}}/>
                    <div className="flex gap-1 bg-slate-800 p-1 rounded-md">
                        {AVATARS.map(avatar => (
                            <button key={avatar.id} onClick={() => handlePlayerAvatarChange(index, avatar)} className={`w-10 h-10 rounded ${player.avatar.id === avatar.id ? 'ring-2 ring-cyan-400' : ''}`}>
                                <img src={avatar.url} alt={`Avatar ${avatar.id}`} className="w-full h-full rounded" />
                            </button>
                        ))}
                    </div>
                </div>
                {players.length > 2 && (
                  <button onClick={() => removePlayer(index)} className="text-red-400 hover:text-red-300">Remove</button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button onClick={addPlayer} disabled={players.length >= 4} className="text-cyan-400 hover:text-cyan-300 disabled:opacity-50">
              + Add Player
            </button>
            <button
              onClick={handleSubmit}
              className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-emerald-600 transition-colors"
            >
              Join Mission
            </button>
          </div>
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </div>
      )}
    </motion.div>
  );
};

export default TeamSelectionScreen;
