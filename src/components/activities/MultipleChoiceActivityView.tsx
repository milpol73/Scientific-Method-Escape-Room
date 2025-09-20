import React, { useState } from 'react';
import { MultipleChoiceActivity } from '../../types';
import { BilingualText } from '../BilingualText';
import { CheckIcon } from '../icons/CheckIcon';
import { XIcon } from '../icons/XIcon';
import { useGameStore } from '../../stores/useGameStore';

enum AnswerState {
  Unanswered,
  Correct,
  Incorrect,
}

interface Props {
  activity: MultipleChoiceActivity;
  onSolve: (points: number, coins: number) => void;
}

const MultipleChoiceActivityView: React.FC<Props> = ({ activity, onSolve }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.Unanswered);
  const [attempts, setAttempts] = useState(0);
  const { deductCoins, triggerGameOver } = useGameStore(state => state.actions);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const isCorrect = activity.options[selectedOption].isCorrect;

    if (isCorrect) {
      setAnswerState(AnswerState.Correct);
      // Calculate score: 150 base - 10 per wrong attempt
      const points = Math.max(0, 150 - (attempts * 10));
      setTimeout(() => onSolve(points, 150), 1500);
    } else {
      setAnswerState(AnswerState.Incorrect);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 5) {
        // After 5 total failed attempts, game over.
        setTimeout(() => triggerGameOver(), 1500);
      } else {
        // For incorrect attempts 1-4, deduct 10 coins.
        // The store action will trigger game over if coins run out.
        deductCoins(10);
      }
    }
  };
  
  const getOptionClasses = (index: number) => {
    const base = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-4 disabled:cursor-not-allowed";
    if (answerState === AnswerState.Unanswered) {
      return `${base} ${selectedOption === index ? 'bg-cyan-900/50 border-cyan-500' : 'bg-slate-800/80 border-slate-700 hover:border-cyan-600'}`;
    }
    
    const isCorrect = activity.options[index].isCorrect;
    const isSelected = index === selectedOption;
    
    if (isCorrect) return `${base} bg-emerald-900/80 border-emerald-500 text-white`;
    if (isSelected && !isCorrect) return `${base} bg-red-900/80 border-red-500 text-white`;
    return `${base} bg-slate-800 border-slate-700 text-slate-400 disabled:opacity-50`;
  };

  return (
    <div>
      <BilingualText as="h3" text={activity.question} className="text-xl font-semibold text-white mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activity.options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
                if(answerState === AnswerState.Unanswered) setSelectedOption(index);
            }}
            disabled={answerState !== AnswerState.Unanswered}
            className={getOptionClasses(index)}
          >
            <span className="font-mono text-cyan-400 text-lg">{String.fromCharCode(65 + index)}</span>
            <BilingualText text={option.text} as="span" className="flex-1" />
          </button>
        ))}
      </div>

       <div className="mt-6 flex justify-end items-center gap-4">
            {answerState !== AnswerState.Unanswered && (
                 <div className={`p-2 rounded-lg flex items-center gap-2 text-sm ${answerState === AnswerState.Correct ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                    {answerState === AnswerState.Correct ? <CheckIcon/> : <XIcon/>}
                    <BilingualText text={answerState === AnswerState.Correct ? activity.feedback.correct : activity.feedback.incorrect} as="p" />
                 </div>
            )}
            {answerState !== AnswerState.Correct && (
                 <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null || answerState === AnswerState.Incorrect}
                    className="bg-cyan-600 text-white font-bold py-2 px-8 rounded-lg text-lg hover:bg-cyan-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    {answerState === AnswerState.Incorrect ? 'Retry' : 'Submit'}
                </button>
            )}
       </div>
    </div>
  );
};

export default MultipleChoiceActivityView;