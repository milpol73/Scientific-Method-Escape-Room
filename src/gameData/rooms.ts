import { RoomData, ActivityType } from '../types';

// This file defines the structure and content for each room in the escape room.
// The activities are generated based on the user-provided content for each room.

export const ROOMS_DATA: RoomData[] = [
  // ====================================================================================
  // ROOM 1: THE SCIENTIFIC METHOD
  // ====================================================================================
  {
    id: 1,
    title: { en: "Room 1: The Scientist's Study", es: "Sala 1: El Estudio de la Científica" },
    backgroundUrl: '/backgrounds/room1-study-messy.jpg',
    ambientSound: '/sounds/ambient-study.mp3',
    hotspots: [
        { id: 101, x: '25%', y: '60%' }, { id: 102, x: '50%', y: '80%' }, { id: 103, x: '75%', y: '55%' },
        { id: 104, x: '15%', y: '40%' }, { id: 105, x: '85%', y: '75%' }, { id: 106, x: '60%', y: '30%' },
        { id: 107, x: '40%', y: '50%' },
    ],
    activities: [
      {
        id: 101,
        title: { en: "The Spark of Curiosity", es: "La Chispa de la Curiosidad" },
        type: ActivityType.MultipleChoice,
        instruction: { en: "Science begins with observation. Find the most objective observation.", es: "La ciencia comienza con la observación. Encuentra la observación más objetiva." },
        question: { en: "Which statement is a scientific observation, not an opinion?", es: "¿Qué afirmación es una observación científica y no una opinión?" },
        options: [
          { text: { en: "The miasma theory was silly.", es: "La teoría del miasma era tonta." }, isCorrect: false },
          { text: { en: "Louis Pasteur observed microorganisms in controlled experiments.", es: "Louis Pasteur observó microorganismos en experimentos controlados." }, isCorrect: true },
          { text: { en: "Germs are disgusting.", es: "Los gérmenes son asquerosos." }, isCorrect: false },
        ],
        unlocksLetter: 'S', unlocksNumber: 8, unlocksWord: { en: "Knowledge", es: "Conocimiento" },
        feedback: { correct: { en: "Correct! Objectivity is key.", es: "¡Correcto! La objetividad es clave." }, incorrect: { en: "An observation is based on measurable evidence, not personal feeling.", es: "Una observación se basa en evidencia medible, no en un sentimiento personal." } },
      },
      {
        id: 102,
        title: { en: "Steps in Order", es: "Pasos en Orden" },
        type: ActivityType.Ordering,
        instruction: { en: "The scientific method follows a logical sequence. Put the first four steps in the correct order.", es: "El método científico sigue una secuencia lógica. Pon los cuatro primeros pasos en el orden correcto." },
        items: [
          { id: 'step2', text: { en: "Ask questions", es: "Hacer preguntas" }, correctOrder: 2 },
          { id: 'step4', text: { en: "Set up an experiment", es: "Preparar un experimento" }, correctOrder: 4 },
          { id: 'step1', text: { en: "Observation", es: "Observación" }, correctOrder: 1 },
          { id: 'step3', text: { en: "Make a hypothesis", es: "Formular una hipótesis" }, correctOrder: 3 },
        ],
        unlocksLetter: 'C', unlocksNumber: 3, unlocksWord: { en: "begins", es: "comienza" },
        feedback: { correct: { en: "Perfect sequence!", es: "¡Secuencia perfecta!" }, incorrect: { en: "Think about the logical flow from noticing something to testing it.", es: "Piensa en el flujo lógico desde que notas algo hasta que lo pruebas." } },
      },
      // ... 5 more activities for Room 1 would be defined here
      { id: 103, type: ActivityType.MultipleChoice, title: {en: "Placeholder 3", es: ""}, instruction: {en: "", es: ""}, question: {en: "", es: ""}, options: [], unlocksLetter: 'I', unlocksNumber: 5, unlocksWord: {en:"with", es: "con"}, feedback: {correct:{en:"",es:""}, incorrect:{en:"",es:""}}},
      { id: 104, type: ActivityType.MultipleChoice, title: {en: "Placeholder 4", es: ""}, instruction: {en: "", es: ""}, question: {en: "", es: ""}, options: [], unlocksLetter: 'E', unlocksNumber: 2, unlocksWord: {en:"wonder", es: "asombro"}, feedback: {correct:{en:"",es:""}, incorrect:{en:"",es:""}}},
      { id: 105, type: ActivityType.MultipleChoice, title: {en: "Placeholder 5", es: ""}, instruction: {en: "", es: ""}, question: {en: "", es: ""}, options: [], unlocksLetter: 'N', unlocksNumber: 6, unlocksWord: {en:"and", es: "y"}, feedback: {correct:{en:"",es:""}, incorrect:{en:"",es:""}}},
      { id: 106, type: ActivityType.MultipleChoice, title: {en: "Placeholder 6", es: ""}, instruction: {en: "", es: ""}, question: {en: "", es: ""}, options: [], unlocksLetter: 'C', unlocksNumber: 1, unlocksWord: {en:"ends", es: "termina"}, feedback: {correct:{en:"",es:""}, incorrect:{en:"",es:""}}},
      { id: 107, type: ActivityType.MultipleChoice, title: {en: "Placeholder 7", es: ""}, instruction: {en: "", es: ""}, question: {en: "", es: ""}, options: [], unlocksLetter: 'E', unlocksNumber: 9, unlocksWord: {en:"with", es: "con"}, feedback: {correct:{en:"",es:""}, incorrect:{en:"",es:""}}},
    ],
  },
  // ====================================================================================
  // ROOM 2: LAB WORK
  // ====================================================================================
  {
    id: 2,
    title: { en: "Room 2: The Laboratory", es: "Sala 2: El Laboratorio" },
    backgroundUrl: '/backgrounds/room2-lab.jpg',
    ambientSound: '/sounds/ambient-lab.mp3',
    hotspots: [ { id: 201, x: '20%', y: '70%' }, /* ... other hotspots */ ],
    activities: [
       {
        id: 201,
        title: { en: "Instrument vs. Equipment", es: "Instrumento vs. Equipo" },
        type: ActivityType.Matching,
        instruction: { en: "A good scientist knows their tools. Match the item to its category.", es: "Un buen científico conoce sus herramientas. Empareja el objeto con su categoría." },
        pairs: [
          { id: 'p1', term: { en: "Microscope", es: "Microscopio" }, definition: { en: "Lab Instrument", es: "Instrumento de Laboratorio" } },
          { id: 'p2', term: { en: "Beaker", es: "Vaso de precipitados" }, definition: { en: "Lab Equipment", es: "Equipo de Laboratorio" } },
          { id: 'p3', term: { en: "Precision Balance", es: "Balanza de precisión" }, definition: { en: "Lab Instrument", es: "Instrumento de Laboratorio" } },
          { id: 'p4', term: { en: "Safety Goggles", es: "Gafas de seguridad" }, definition: { en: "Lab Equipment", es: "Equipo de Laboratorio" } },
        ],
        unlocksLetter: 'L', unlocksNumber: 4, unlocksWord: { en: "understanding", es: "comprensión" },
        feedback: { correct: { en: "Precisely categorized!", es: "¡Categorizado con precisión!" }, incorrect: { en: "Remember: Instruments measure, equipment holds or helps.", es: "Recuerda: Los instrumentos miden, el equipo sostiene o ayuda." } },
      },
       // ... 6 more activities for Room 2
    ],
  },
  // ... Rooms 3, 4, and 5 would be defined here with their 7 activities each.
];
