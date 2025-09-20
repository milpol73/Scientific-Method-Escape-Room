import React, { useState, useRef, useEffect } from 'react';
import { BilingualString } from '../types';
import { TranslateIcon } from './icons/TranslateIcon';
import { motion, AnimatePresence } from 'framer-motion';

interface BilingualTextProps {
  text: BilingualString;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div';
  className?: string;
}

export const BilingualText: React.FC<BilingualTextProps> = ({ text, as = 'p', className = '' }) => {
  const [showSpanish, setShowSpanish] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const Tag = as;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSpanish(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Basic check for empty strings
  if (!text || (!text.en && !text.es)) {
    return null;
  }
  
  const hasTranslation = text.es && text.es.trim() !== '';

  return (
    <Tag className={`${className} inline-flex items-center gap-2 relative`} ref={wrapperRef}>
      <span>{text.en}</span>
      {hasTranslation && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowSpanish(prev => !prev);
          }}
          className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full"
          aria-label="Translate to Spanish"
          aria-expanded={showSpanish}
        >
          <TranslateIcon className="w-5 h-5" />
        </button>
      )}
      <AnimatePresence>
        {showSpanish && hasTranslation && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs sm:max-w-md bg-slate-800 text-white p-3 rounded-lg shadow-lg z-50 border border-slate-700"
          >
            <p className="text-sm text-slate-200">{text.es}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </Tag>
  );
};
