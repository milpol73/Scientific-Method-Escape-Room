import React, { useState, useEffect } from 'react';
import { MatchingActivity } from '../../types';
import { BilingualText } from '../BilingualText';
import { motion } from 'framer-motion';

interface Props {
  activity: MatchingActivity;
  onSolve: (points: number, coins: number) => void;
}

const MatchingActivityView: React.FC<Props> = ({ activity, onSolve }) => {
  const [terms, setTerms] = useState(() => [...activity.pairs].sort(() => Math.random() - 0.5));
  const [definitions, setDefinitions] = useState(() => [...activity.pairs].sort(() => Math.random() - 0.5));
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (Object.keys(matchedPairs).length === activity.pairs.length) {
      // All pairs matched
      setTimeout(() => onSolve(150, 150), 1000);
    }
  }, [matchedPairs, activity.pairs.length, onSolve]);

  const handleSelectTerm = (termId: string) => {
    setSelectedTermId(termId);
  };

  const handleSelectDefinition = (defId: string) => {
    if (selectedTermId) {
      if (selectedTermId === defId) {
        setMatchedPairs(prev => ({ ...prev, [selectedTermId]: defId }));
      } else {
        // Incorrect match visual feedback (e.g., shake) can be added here
      }
      setSelectedTermId(null);
    }
  };
  
  const getButtonClass = (id: string, isSelected: boolean, isMatched: boolean) => {
     if (isMatched) return 'bg-emerald-700 border-emerald-500 opacity-50 cursor-not-allowed';
     if (isSelected) return 'bg-cyan-800 border-cyan-500 ring-2 ring-cyan-400';
     return 'bg-slate-700 border-slate-600 hover:bg-slate-600';
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6">
      {/* Terms Column */}
      <div className="flex-1 space-y-3">
        {terms.map(pair => (
          <button
            key={pair.id}
            onClick={() => handleSelectTerm(pair.id)}
            disabled={!!matchedPairs[pair.id]}
            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${getButtonClass(pair.id, selectedTermId === pair.id, !!matchedPairs[pair.id])}`}
          >
            <BilingualText text={pair.term} as="span" />
          </button>
        ))}
      </div>
      
       {/* Definitions Column */}
      <div className="flex-1 space-y-3">
         {definitions.map(pair => (
          <button
            key={pair.id}
            onClick={() => handleSelectDefinition(pair.id)}
            disabled={!!matchedPairs[pair.id]}
            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${getButtonClass(pair.id, false, !!matchedPairs[pair.id])}`}
          >
            <BilingualText text={pair.definition} as="span" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default MatchingActivityView;
