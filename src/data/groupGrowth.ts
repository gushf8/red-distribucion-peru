export interface GroupGrowthItem {
  id: string;
  rank: number;
  group: string;
  fullName: string;
  growth: number; // percentage
  region: string;
  status: 'superior' | 'promedio' | 'en_desarrollo';
  color: string;
  details: string;
  clients?: number;
}

export const GROUP_GROWTH_DATA: GroupGrowthItem[] = [
  {
    id: 'apu',
    rank: 1,
    group: 'APU',
    fullName: 'Corporación Apu',
    growth: 28,
    region: 'Cusco y Sur Andino (Sicuani)',
    status: 'superior',
    color: '#059669', // Emerald Leader
    details: 'Líder destacado (+28%). Principal motor de volumen y expansión comercial.',
    clients: 5605,
  },
  {
    id: 'csm',
    rank: 2,
    group: 'CSM',
    fullName: 'Consorcio Selva (CSM)',
    growth: 10,
    region: 'Loreto y Ucayali (Iquitos / Pucallpa)',
    status: 'superior',
    color: '#0d9488', // Teal
    details: 'Crecimiento de doble dígito sostenido en la macroregión oriente.',
    clients: 7246,
  },
  {
    id: 'potosi',
    rank: 3,
    group: 'POTOSI',
    fullName: 'Distribuciones Potosí',
    growth: 9,
    region: 'Madre de Dios (Puerto Maldonado)',
    status: 'superior',
    color: '#10b981', // Emerald
    details: 'Desempeño superior sobre el promedio nacional (+9% vs. 8%).',
    clients: 1980,
  },
  {
    id: 'dismar',
    rank: 4,
    group: 'DISMAR',
    fullName: 'Dismar Distribuidora',
    growth: 8,
    region: 'Huánuco y Pasco (Tingo María / Pasco)',
    status: 'promedio',
    color: '#16a34a', // Green
    details: 'Rendimiento sólido y alineado con la meta nacional ponderada.',
    clients: 4893,
  },
  {
    id: 'genovesa',
    rank: 5,
    group: 'LA GENOVESA',
    fullName: 'Distribuidora Genovesa',
    growth: 8,
    region: 'Tacna, Moquegua y Costa Sur',
    status: 'promedio',
    color: '#16a34a',
    details: 'Consolidación de liderazgo en plaza fronteriza sur y puertos comerciales.',
    clients: 9037,
  },
  {
    id: 'sto_dgo',
    rank: 6,
    group: 'REP STO DGO',
    fullName: 'Representaciones Santo Domingo',
    growth: 8,
    region: 'Quillabamba (La Convención - Cusco)',
    status: 'promedio',
    color: '#16a34a',
    details: 'Desempeño constante en ceja de selva cusqueña y valles agrícolas.',
    clients: 1810,
  },
  {
    id: 'peramas',
    rank: 7,
    group: 'PERAMAS',
    fullName: 'Peramas / Despensa Peruana',
    growth: 7,
    region: 'Cajamarca y Áncash (Huaraz)',
    status: 'promedio',
    color: '#22c55e',
    details: 'Desempeño estable en valles interandinos norte (+7%).',
    clients: 5468,
  },
  {
    id: 'beraun',
    rank: 8,
    group: 'BERAUN',
    fullName: 'Distribuidora Beraún',
    growth: 3,
    region: 'Selva Central (Oxapampa / Satipo / La Merced)',
    status: 'en_desarrollo',
    color: '#4ade80',
    details: 'Zona de alta capilaridad con plan de aceleración en segundo semestre.',
    clients: 8540,
  },
  {
    id: 'emcosur',
    rank: 9,
    group: 'EMCOSUR',
    fullName: 'Emcosur Andina',
    growth: 2,
    region: 'Ayacucho y Apurímac (Abancay)',
    status: 'en_desarrollo',
    color: '#86efac',
    details: 'Oportunidad de refuerzo logístico y penetración en puntos de venta.',
    clients: 5840,
  },
];

export const TOTAL_GROUP_DATA = {
  group: 'Total',
  fullName: 'Total Red Nacional Distribuidores',
  growth: 8, // Formula exact 7.8396% rounded to 8%
  region: 'Consolidado Nacional 9 Grupos',
  details: 'Promedio ponderado oficial de la red nacional (+8% YTD vs. periodo anterior)',
};

export const TOTAL_GROUPS_COUNT = GROUP_GROWTH_DATA.length; // 9
export const ABOVE_OR_EQUAL_AVG_COUNT = GROUP_GROWTH_DATA.filter((g) => g.growth >= 8).length; // 6
export const BELOW_AVG_COUNT = GROUP_GROWTH_DATA.filter((g) => g.growth < 8).length; // 3
export const LEADER_GROUP = GROUP_GROWTH_DATA[0]; // APU (+28%)
