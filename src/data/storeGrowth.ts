export interface StoreGrowthItem {
  id: string;
  store: string;
  growth: number; // Percentage
  distributor: string;
  region: string;
}

export const STORE_GROWTH_DATA: StoreGrowthItem[] = [
  { id: '1', store: 'DISMAR Pasco', growth: 15, distributor: 'Dismar', region: 'Pasco' },
  { id: '2', store: 'POTOSI', growth: 14, distributor: 'Potosí', region: 'Madre de Dios' },
  { id: '3', store: 'CSM Iquitos', growth: 14, distributor: 'CSM', region: 'Loreto' },
  { id: '4', store: 'Apu Disti', growth: 11, distributor: 'Apu', region: 'Cusco/Puno' },
  { id: '5', store: 'EMCOSUR ANDINA', growth: 11, distributor: 'Excomsur', region: 'Ayacucho/Apurímac' },
  { id: '6', store: 'CSM Pucallpa', growth: 10, distributor: 'CSM', region: 'Ucayali' },
  { id: '7', store: 'LA GENOVESA MOQUEGUA', growth: 9, distributor: 'Genovesa', region: 'Moquegua' },
  { id: '8', store: 'Crec / DISMAR', growth: 9, distributor: 'Dismar', region: 'Huánuco' },
  { id: '9', store: 'Crec', growth: 8, distributor: 'General', region: 'Nacional' },
  { id: '10', store: 'Crec / Almacenes de la Selva', growth: 4, distributor: 'Almacenes Selva', region: 'San Martín' },
  { id: '11', store: 'Despensa / Huaraz', growth: 0, distributor: 'Despensa Peruana', region: 'Áncash' },
  { id: '12', store: 'Beraun', growth: -1, distributor: 'Beraún', region: 'Selva Central' },
  { id: '13', store: 'Despensa Cajamarca', growth: -5, distributor: 'Despensa Peruana', region: 'Cajamarca' },
  { id: '14', store: 'LA GENOVESA ILO', growth: -22, distributor: 'Genovesa', region: 'Moquegua/Costa Sur' },
];

export const TOTAL_STORES = STORE_GROWTH_DATA.length;
export const POSITIVE_STORES = STORE_GROWTH_DATA.filter((s) => s.growth > 0).length;
export const NEUTRAL_STORES = STORE_GROWTH_DATA.filter((s) => s.growth === 0).length;
export const NEGATIVE_STORES = STORE_GROWTH_DATA.filter((s) => s.growth < 0).length;
export const AVG_GROWTH = Math.round((STORE_GROWTH_DATA.reduce((acc, s) => acc + s.growth, 0) / TOTAL_STORES) * 10) / 10;
