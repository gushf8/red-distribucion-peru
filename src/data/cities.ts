import { CityNode } from '../types/presentation';

export const CITIES: CityNode[] = [
  // CSM (Consorcio Selva)
  { name: 'Iquitos', x: 330, y: 155, distributorId: 'csm' },
  { name: 'Pucallpa', x: 335, y: 395, distributorId: 'csm' },

  // Almacenes de la Selva
  { name: 'Jaén', x: 135, y: 225, distributorId: 'almacenes_selva' },
  { name: 'Moyobamba', x: 195, y: 250, distributorId: 'almacenes_selva' },
  { name: 'Tarapoto', x: 228, y: 275, distributorId: 'almacenes_selva' },

  // Despensa Peruana
  { name: 'Cajamarca', x: 138, y: 295, distributorId: 'despensa_peruana' },
  { name: 'Huaraz', x: 182, y: 440, distributorId: 'despensa_peruana' },

  // Dismar
  { name: 'Tingo María', x: 268, y: 418, distributorId: 'dismar' },
  { name: 'Huánuco', x: 252, y: 448, distributorId: 'dismar' },
  { name: 'Cerro de Pasco', x: 255, y: 485, distributorId: 'dismar' },

  // Distribuidora Beraún
  { name: 'Pozuzo', x: 278, y: 465, distributorId: 'beraun' },
  { name: 'Constitución', x: 308, y: 472, distributorId: 'beraun' },
  { name: 'Oxapampa', x: 288, y: 485, distributorId: 'beraun' },
  { name: 'La Merced', x: 298, y: 512, distributorId: 'beraun' },
  { name: 'Satipo', x: 332, y: 520, distributorId: 'beraun' },
  { name: 'Tocache', x: 242, y: 365, distributorId: 'beraun' },

  // Distribuciones Potosí
  { name: 'P. Maldonado', x: 505, y: 520, distributorId: 'potosi' },

  // Excomsur
  { name: 'Ayacucho', x: 325, y: 585, distributorId: 'excomsur' },
  { name: 'Andahuaylas', x: 358, y: 620, distributorId: 'excomsur' },
  { name: 'Abancay', x: 382, y: 625, distributorId: 'excomsur' },

  // Santo Domingo
  { name: 'Quillabamba', x: 395, y: 545, distributorId: 'santo_domingo' },

  // Corporación Apu
  { name: 'Sicuani', x: 442, y: 645, distributorId: 'apu' },

  // Distribuidora Genovesa
  { name: 'Mollendo', x: 435, y: 748, distributorId: 'genovesa' },
  { name: 'Moquegua', x: 490, y: 760, distributorId: 'genovesa' },
  { name: 'Ilo', x: 468, y: 785, distributorId: 'genovesa' },
  { name: 'Tacna', x: 512, y: 792, distributorId: 'genovesa' },
];
