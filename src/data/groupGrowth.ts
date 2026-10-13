export interface GroupGrowthItem {
  id: string;
  rank: number;
  group: string;
  fullName: string;
  growth: number; // percentage in chart
  region: string;
  status: 'superior' | 'promedio' | 'en_desarrollo';
  color: string;
}

// Chart data sorted by growth (Image 3)
export const GROUP_GROWTH_DATA: GroupGrowthItem[] = [
  {
    id: 'apu',
    rank: 1,
    group: 'APU',
    fullName: 'Corporación Apu',
    growth: 28,
    region: 'Cusco y Sur Andino',
    status: 'superior',
    color: '#059669',
  },
  {
    id: 'csm',
    rank: 2,
    group: 'CSM',
    fullName: 'Consorcio Selva (CSM)',
    growth: 10,
    region: 'Loreto y Ucayali',
    status: 'superior',
    color: '#0d9488',
  },
  {
    id: 'potosi',
    rank: 3,
    group: 'POTOSI',
    fullName: 'Distribuciones Potosí',
    growth: 9,
    region: 'Madre de Dios',
    status: 'superior',
    color: '#10b981',
  },
  {
    id: 'dismar',
    rank: 4,
    group: 'DISMAR',
    fullName: 'Dismar Distribuidora',
    growth: 8,
    region: 'Huánuco y Pasco',
    status: 'promedio',
    color: '#16a34a',
  },
  {
    id: 'genovesa',
    rank: 5,
    group: 'LA GENOVESA',
    fullName: 'Distribuidora Genovesa',
    growth: 8,
    region: 'Tacna y Moquegua',
    status: 'promedio',
    color: '#16a34a',
  },
  {
    id: 'sto_dgo',
    rank: 6,
    group: 'REP STO DGO',
    fullName: 'Representaciones Santo Domingo',
    growth: 8,
    region: 'Quillabamba - Cusco',
    status: 'promedio',
    color: '#16a34a',
  },
  {
    id: 'peramas',
    rank: 7,
    group: 'PERAMAS',
    fullName: 'Peramas / Despensa Peruana',
    growth: 7,
    region: 'Cajamarca y Áncash',
    status: 'promedio',
    color: '#22c55e',
  },
  {
    id: 'beraun',
    rank: 8,
    group: 'BERAUN',
    fullName: 'Distribuidora Beraún',
    growth: 3,
    region: 'Selva Central',
    status: 'en_desarrollo',
    color: '#4ade80',
  },
  {
    id: 'emcosur',
    rank: 9,
    group: 'EMCOSUR',
    fullName: 'Emcosur Andina',
    growth: 2,
    region: 'Ayacucho y Apurímac',
    status: 'en_desarrollo',
    color: '#86efac',
  },
];

export const TOTAL_GROUP_DATA = {
  group: 'Total',
  fullName: 'Total Red Nacional Distribuidores',
  growth: 8, // Formula exact 7.8396% rounded to 8%
  details: 'Promedio ponderado oficial de la red nacional (+8% YTD vs. periodo anterior)',
};

// Exact Excel Table Data (Image 1 requested by user for the right side)
export interface ExcelTableRow {
  id: string;
  group: string;
  growth: number;
  isTotal?: boolean;
}

export const EXCEL_TABLE_DATA: ExcelTableRow[] = [
  { id: 'csm', group: 'CSM', growth: 10 },
  { id: 'peramas', group: 'PERAMAS', growth: 7 },
  { id: 'dismar', group: 'DISMAR', growth: 8 },
  { id: 'emcosur', group: 'EMCOSUR', growth: 2 },
  { id: 'beraun', group: 'BERAUN', growth: 3 },
  { id: 'potosi', group: 'POTOSI', growth: 9 },
  { id: 'genovesa', group: 'LA GENOVESA', growth: 9 },
  { id: 'apu', group: 'APU', growth: 8 },
  { id: 'sto_dgo', group: 'REP STO DGO', growth: 28 },
  { id: 'total', group: 'Total', growth: 8, isTotal: true },
];

export const TOTAL_GROUPS_COUNT = GROUP_GROWTH_DATA.length; // 9
export const LEADER_GROUP = GROUP_GROWTH_DATA[0]; // APU (+28%)
