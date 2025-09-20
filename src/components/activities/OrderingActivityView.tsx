import React, { useState } from 'react';
import { OrderingActivity, OrderingItem } from '../../types';
import { BilingualText } from '../BilingualText';
import { motion, Reorder } from 'framer-motion';

interface Props {
  activity: OrderingActivity;
  onSolve: (points: number, coins: number) => void;
}

const OrderingActivityView: React.FC<Props> = ({ activity, onSolve }) => {
  const [items, setItems] = useState<OrderingItem[]>(() =>
    [...activity.items].sort(() => Math.random() - 0.5)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const checkOrder = () => {
    setIsSubmitted(true);
    const isCorrect = items.every((item, index) => item.correctOrder === index + 1);
    if (isCorrect) {
      setTimeout(() => onSolve(150, 150), 1000);
    }
  };

  return (
    <div>
      <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-3">
        {items.map((item, index) => (
          <Reorder.Item key={item.id} value={item}>
            <div
              className={`flex items-center gap-4 p-3 rounded-lg border-2 cursor-grab active:cursor-grabbing
                ${!isSubmitted ? 'bg-slate-700 border-slate-600' :
                 item.correctOrder === index + 1 ? 'bg-emerald-800 border-emerald-600' : 'bg-red-800 border-red-600'}`}
            >
              <span className="font-bold text-cyan-300">{index + 1}</span>
              <BilingualText text={item.text} as="span" />
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      
      <div className="mt-6 flex justify-end">
        {!isSubmitted && (
            <button
                onClick={checkOrder}
                className="bg-cyan-600 text-white font-bold py-2 px-8 rounded-lg text-lg hover:bg-cyan-700 transition-colors"
            >
                Check Order
            </button>
        )}
      </div>
    </div>
  );
};

export default OrderingActivityView;
