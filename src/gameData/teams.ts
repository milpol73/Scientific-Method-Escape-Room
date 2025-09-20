import { Team, Scientist, Avatar, BilingualString } from '../types';

// --- AVAILABLE AVATARS ---
// In a real app, these would be paths to image assets
export const AVATARS: Avatar[] = [
  { id: 'avatar1', url: '/avatars/avatar1.svg' },
  { id: 'avatar2', url: '/avatars/avatar2.svg' },
  { id: 'avatar3', url: '/avatars/avatar3.svg' },
  { id: 'avatar4', url: '/avatars/avatar4.svg' },
  { id: 'avatar5', url: '/avatars/avatar5.svg' },
  { id: 'avatar6', url: '/avatars/avatar6.svg' },
  { id: 'avatar7', url: '/avatars/avatar7.svg' },
  { id: 'avatar8', url: '/avatars/avatar8.svg' },
];

// --- SCIENTISTS DATA ---
// NOTE: These are placeholder scientists based on the request to include Canarian women scientists.
// The data should be replaced with real information from projects like "Mujeres Científicas Canarias".
export const SCIENTISTS: Scientist[] = [
  {
    id: 1,
    name: "Dra. Elara Vargas",
    field: { en: "Marine Biologist", es: "Bióloga Marina" },
    institution: "PLOCAN",
    imageUrl: "/scientists/elara-vargas.png",
    bio: [
        { en: "Dr. Vargas has dedicated her life to the unexplored depths of the Atlantic Ocean surrounding the Canary Islands.", es: "La Dra. Vargas ha dedicado su vida a las profundidades inexploradas del Océano Atlántico que rodean las Islas Canarias." },
        { en: "Her passion began as a child, exploring the tide pools of Gran Canaria, sparking a lifelong curiosity about what lies beneath the waves.", es: "Su pasión comenzó de niña, explorando las pozas de marea de Gran Canaria, lo que despertó una curiosidad de por vida sobre lo que yace bajo las olas." },
    ],
    discovery: { en: "A new species of bioluminescent coral that thrives near volcanic vents, potentially holding the key to new biofuels.", es: "Una nueva especie de coral bioluminiscente que prospera cerca de las fumarolas volcánicas, que podría tener la clave para nuevos biocombustibles." },
    discoveryImage: "/discoveries/bioluminescent-coral.jpg",
    narrative: {
        welcome: { en: "Welcome, team! I'm Dr. Vargas. I've stumbled upon something incredible in the deep sea, but my research is scattered. I need your sharp minds to piece it together before a rival expedition claims my discovery!", es: "¡Bienvenidos, equipo! Soy la Dra. Vargas. He tropezado con algo increíble en las profundidades marinas, pero mi investigación está dispersa. ¡Necesito vuestras mentes agudas para reconstruirla antes de que una expedición rival reclame mi descubrimiento!" },
        missionHub: { en: "This is my research hub. Each room contains a piece of my journey. Follow the steps of the scientific method, and you'll uncover my findings. Let's start where all science begins: with observation.", es: "Este es mi centro de investigación. Cada sala contiene una parte de mi viaje. Seguid los pasos del método científico y descubriréis mis hallazgos. Empecemos por donde toda ciencia comienza: con la observación." },
        roomIntro: {
            1: { en: "My field notes are a mess! Look through my desk. The first clue is hidden within my initial observations of the strange glow I saw on a deep-sea dive.", es: "¡Mis notas de campo son un desastre! Buscad en mi escritorio. La primera pista está escondida en mis observaciones iniciales del extraño brillo que vi en una inmersión en aguas profundas." },
            2: { en: "Excellent work! Now, to the lab. We need to formalize these observations. Help me sort through my lab equipment to set up the experiment correctly.", es: "¡Excelente trabajo! Ahora, al laboratorio. Necesitamos formalizar estas observaciones. Ayudadme a clasificar mi equipo de laboratorio para montar el experimento correctamente." },
            3: {en: "Time for field work! We are on the research vessel over a deep sea vent. The conditions are tough. Let's gather data carefully.", es: "¡Hora del trabajo de campo! Estamos en el buque de investigación sobre una fumarola de aguas profundas. Las condiciones son duras. Recopilemos datos con cuidado."},
            4: {en: "Back to the study to analyze the data. We need to find reliable sources to compare our findings. Be careful with fake news!", es: "De vuelta al estudio para analizar los datos. Necesitamos encontrar fuentes fiables para comparar nuestros hallazgos. ¡Cuidado con las noticias falsas!"},
            5: {en: "The results are conclusive! Now we must prepare the report to present at the International Marine Biology Congress. Every detail counts!", es: "¡Los resultados son concluyentes! Ahora debemos preparar el informe para presentarlo en el Congreso Internacional de Biología Marina. ¡Cada detalle cuenta!"}
        },
        hints: { 1: { 1: { en: "Look for the notebook with a coffee stain. My first thoughts are usually messy!", es: "¡Busca el cuaderno con una mancha de café. Mis primeras ideas suelen ser desordenadas!" } } }
    },
  },
   // ... More scientists would be added here for other teams
  {
    id: 2,
    name: "Dra. Inés Cabrera",
    field: { en: "Volcanologist & Geologist", es: "Vulcanóloga y Geóloga" },
    institution: "Instituto Vulcanológico de Canarias (INVOLCAN)",
    imageUrl: "/scientists/ines-cabrera.png",
    bio: [
        { en: "Dr. Cabrera studies the heartbeat of the Canary Islands—its volcanoes.", es: "La Dra. Cabrera estudia el latido del corazón de las Islas Canarias: sus volcanes." },
        { en: "She combines geology and data science to predict volcanic activity.", es: "Combina la geología y la ciencia de datos para predecir la actividad volcánica." },
    ],
    discovery: { en: "A unique seismic pattern that can predict small-scale eruptions with 95% accuracy, allowing for better-prepared evacuations.", es: "Un patrón sísmico único que puede predecir erupciones a pequeña escala con un 95% de precisión, permitiendo evacuaciones mejor preparadas." },
    discoveryImage: "/discoveries/seismic-pattern.jpg",
    narrative: {
         welcome: { en: "Hello! Dr. Cabrera here. The earth is speaking, and I've just started to understand its language. My data is locked away by a system malfunction. Can you help me retrace my scientific steps to unlock it?", es: "¡Hola! Soy la Dra. Cabrera. La tierra está hablando, y acabo de empezar a entender su lenguaje. Mis datos están bloqueados por un fallo del sistema. ¿Podéis ayudarme a seguir mis pasos científicos para desbloquearlos?" },
        missionHub: { en: "My entire process is mapped out here. Each room represents a critical phase of my research, from initial field observations to the final report.", es: "Todo mi proceso está mapeado aquí. Cada sala representa una fase crítica de mi investigación, desde las observaciones iniciales de campo hasta el informe final." },
        roomIntro: { 1: { en: "It all started with an unusual tremor. My seismograph printouts are somewhere in this chaotic office. Find the one that doesn't fit the pattern.", es: "Todo comenzó con un temblor inusual. Las impresiones de mi sismógrafo están en algún lugar de esta caótica oficina. Encontrad la que no encaja en el patrón." } },
        hints: { 1: { 1: { en: "The important printout is the one I circled in red pen.", es: "La impresión importante es la que rodeé con bolígrafo rojo." } } }
    },
  },
];

// --- TEAM TEMPLATES ---
export const TEAMS: Omit<Team, 'players'>[] = [
  { id: 'team1', name: { en: "The Blue Blazers", es: "Los Bólidos Azules" }, scientistId: 1 },
  { id: 'team2', name: { en: "The Golden Sparks", es: "Las Chispas Doradas" }, scientistId: 2 },
  { id: 'team3', name: { en: "The Green Guardians", es: "Los Guardianes Verdes" }, scientistId: 1 }, // Placeholder
  { id: 'team4', name: { en: "The Red Rockets", es: "Los Cohetes Rojos" }, scientistId: 2 }, // Placeholder
  { id: 'team5', name: { en: "The Silver Stars", es: "Las Estrellas Plateadas" }, scientistId: 1 }, // Placeholder
  { id: 'team6', name: { en: "Brave Lions", es: "Leones Valientes" }, scientistId: 2 }, // Placeholder
  // ... More teams would be added here
];
