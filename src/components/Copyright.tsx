import React from 'react';
import { BilingualText } from './BilingualText';

const Copyright: React.FC = () => {
  return (
    <div className="fixed bottom-1 right-2 text-xs text-slate-600 z-50 text-right print:hidden">
      <p>
        &copy; {new Date().getFullYear()} Milena Polifrone. 
        <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-slate-400">
          CC BY-NC-ND 4.0
        </a>
      </p>
      <BilingualText as="p" text={{en: "All rights reserved.", es: "Todos los derechos reservados."}}/>
    </div>
  );
};

export default Copyright;
