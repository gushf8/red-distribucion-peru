export interface DetailedCityNode {
  id: string;
  name: string;
  distributor: string;
  distributorId: string;
  dept: string;
  clients: number;
  isHub: boolean;
  x: number;
  y: number;
  dotRadius: number;
  labelDx: number;
  labelDy: number;
  textAnchor: string;
}

export const DETAILED_CITIES: DetailedCityNode[] = [
  { id: "city-iquitos", name: "Iquitos", distributor: "CSM", distributorId: "csm", dept: "LORETO", clients: 4233, isHub: true, x: 375.4, y: 187.1, dotRadius: 7.0, labelDx: 12.0, labelDy: 4.0, textAnchor: "start" },
  { id: "city-pucallpa", name: "Pucallpa", distributor: "CSM", distributorId: "csm", dept: "UCAYALI", clients: 3013, isHub: true, x: 318.98, y: 389.37, dotRadius: 7.0, labelDx: 12.0, labelDy: 4.0, textAnchor: "start" },
  { id: "city-jaen", name: "Jaén", distributor: "Almacenes de la Selva", distributorId: "almacenes_selva", dept: "CAJAMARCA", clients: 1820, isHub: false, x: 134.37, y: 272.69, dotRadius: 4.2, labelDx: -10.0, labelDy: 3.0, textAnchor: "end" },
  { id: "city-tarapoto", name: "Tarapoto", distributor: "Almacenes de la Selva", distributorId: "almacenes_selva", dept: "SAN MARTIN", clients: 2948, isHub: true, x: 240.23, y: 306.64, dotRadius: 7.0, labelDx: 10.0, labelDy: 5.0, textAnchor: "start" },
  { id: "city-moyobamba", name: "Moyobamba", distributor: "Almacenes de la Selva", distributorId: "almacenes_selva", dept: "SAN MARTIN", clients: 1650, isHub: false, x: 213.94, y: 286.93, dotRadius: 4.2, labelDx: -10.0, labelDy: -4.0, textAnchor: "end" },
  { id: "city-cajamarca", name: "Cajamarca", distributor: "Despensa Peruana", distributorId: "despensa_peruana", dept: "CAJAMARCA", clients: 3278, isHub: true, x: 147.72, y: 336.27, dotRadius: 7.0, labelDx: -11.0, labelDy: 4.0, textAnchor: "end" },
  { id: "city-huaraz", name: "Huaraz", distributor: "Despensa Peruana", distributorId: "despensa_peruana", dept: "ANCASH", clients: 2190, isHub: false, x: 189.88, y: 439.47, dotRadius: 4.2, labelDx: -10.0, labelDy: 4.0, textAnchor: "end" },
  { id: "city-huanuco", name: "Huánuco", distributor: "Dismar", distributorId: "dismar", dept: "HUANUCO", clients: 2410, isHub: false, x: 245.71, y: 457.15, dotRadius: 4.2, labelDx: -11.0, labelDy: 2.0, textAnchor: "end" },
  { id: "city-tingo_maria", name: "Tingo María", distributor: "Dismar", distributorId: "dismar", dept: "HUANUCO", clients: 1890, isHub: false, x: 256.36, y: 429.4, dotRadius: 4.2, labelDx: 10.0, labelDy: -3.0, textAnchor: "start" },
  { id: "city-cerro_de_pasco", name: "Cerro de Pasco", distributor: "Dismar", distributorId: "dismar", dept: "PASCO", clients: 593, isHub: false, x: 245.08, y: 489.34, dotRadius: 4.2, labelDx: -11.0, labelDy: 9.0, textAnchor: "end" },
  { id: "city-oxapampa", name: "Oxapampa", distributor: "Distribuidora Beraún", distributorId: "beraun", dept: "PASCO", clients: 1420, isHub: false, x: 282.19, y: 485.32, dotRadius: 4.2, labelDx: 10.0, labelDy: 2.0, textAnchor: "start" },
  { id: "city-pozuzo", name: "Pozuzo", distributor: "Distribuidora Beraún", distributorId: "beraun", dept: "PASCO", clients: 890, isHub: false, x: 275.67, y: 463.3, dotRadius: 4.2, labelDx: -10.0, labelDy: -3.0, textAnchor: "end" },
  { id: "city-la_merced", name: "La Merced", distributor: "Distribuidora Beraún", distributorId: "beraun", dept: "JUNIN", clients: 2150, isHub: false, x: 285.37, y: 506.24, dotRadius: 4.2, labelDx: -10.0, labelDy: 8.0, textAnchor: "end" },
  { id: "city-satipo", name: "Satipo", distributor: "Distribuidora Beraún", distributorId: "beraun", dept: "JUNIN", clients: 1940, isHub: false, x: 315.31, y: 514.88, dotRadius: 4.2, labelDx: 10.0, labelDy: 9.0, textAnchor: "start" },
  { id: "city-tocache", name: "Tocache", distributor: "Distribuidora Beraún", distributorId: "beraun", dept: "SAN MARTIN", clients: 1380, isHub: false, x: 234.01, y: 381.03, dotRadius: 4.2, labelDx: 10.0, labelDy: 3.0, textAnchor: "start" },
  { id: "city-constitucion", name: "Constitución", distributor: "Distribuidora Beraún", distributorId: "beraun", dept: "PASCO", clients: 760, isHub: false, x: 298.9, y: 453.44, dotRadius: 4.2, labelDx: 10.0, labelDy: -4.0, textAnchor: "start" },
  { id: "city-puerto_maldonado", name: "Puerto Maldonado", distributor: "Distribuciones Potosí", distributorId: "potosi", dept: "MADRE DE DIOS", clients: 1980, isHub: false, x: 551.8, y: 573.47, dotRadius: 4.2, labelDx: 10.0, labelDy: 3.0, textAnchor: "start" },
  { id: "city-ayacucho", name: "Ayacucho", distributor: "Excomsur", distributorId: "excomsur", dept: "AYACUCHO", clients: 2680, isHub: true, x: 333.3, y: 598.17, dotRadius: 7.0, labelDx: -10.0, labelDy: -2.0, textAnchor: "end" },
  { id: "city-abancay", name: "Abancay", distributor: "Excomsur", distributorId: "excomsur", dept: "APURIMAC", clients: 1540, isHub: false, x: 391.56, y: 618.93, dotRadius: 4.2, labelDx: 10.0, labelDy: -3.0, textAnchor: "start" },
  { id: "city-andahuaylas", name: "Andahuaylas", distributor: "Excomsur", distributorId: "excomsur", dept: "APURIMAC", clients: 1620, isHub: false, x: 369.61, y: 619.88, dotRadius: 4.2, labelDx: -10.0, labelDy: 7.0, textAnchor: "end" },
  { id: "city-tacna", name: "Tacna", distributor: "Distribuidora Genovesa", distributorId: "genovesa", dept: "TACNA", clients: 4522, isHub: true, x: 505.92, y: 809.96, dotRadius: 7.0, labelDx: -11.0, labelDy: 4.0, textAnchor: "end" },
  { id: "city-ilo", name: "Ilo", distributor: "Distribuidora Genovesa", distributorId: "genovesa", dept: "MOQUEGUA", clients: 1780, isHub: false, x: 458.56, y: 793.92, dotRadius: 4.2, labelDx: -10.0, labelDy: 8.0, textAnchor: "end" },
  { id: "city-moquegua", name: "Moquegua", distributor: "Distribuidora Genovesa", distributorId: "genovesa", dept: "MOQUEGUA", clients: 1495, isHub: false, x: 476.0, y: 774.65, dotRadius: 4.2, labelDx: 10.0, labelDy: -2.0, textAnchor: "start" },
  { id: "city-mollendo", name: "Mollendo", distributor: "Distribuidora Genovesa", distributorId: "genovesa", dept: "AREQUIPA", clients: 1240, isHub: false, x: 429.18, y: 766.99, dotRadius: 4.2, labelDx: -10.0, labelDy: -2.0, textAnchor: "end" },
  { id: "city-quillabamba", name: "Quillabamba", distributor: "Santo Domingo", distributorId: "santo_domingo", dept: "CUSCO", clients: 1810, isHub: false, x: 399.71, y: 585.48, dotRadius: 4.2, labelDx: 10.0, labelDy: 3.0, textAnchor: "start" },
  { id: "city-sicuani", name: "Sicuani", distributor: "Corporación Apu", distributorId: "apu", dept: "CUSCO", clients: 5605, isHub: true, x: 463.4, y: 646.69, dotRadius: 7.0, labelDx: 12.0, labelDy: 4.0, textAnchor: "start" },
];
