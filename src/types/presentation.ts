export interface DistributorTrajectory {
  cierre25: number;
  q3_25: number;
  q3_26: number;
  delta_tons: number;
  delta_pct: number;
  oct26: number;
  nov26: number;
  cierre26: number;
}

export interface Distributor {
  id: string;
  name: string;
  shortName: string;
  color: string;
  region: string;
  depts: string[];
  cities: string[];
  year: number;
  sellers: number;
  trucks: number;
  clients: number;
  desc?: string;
  trajectory: DistributorTrajectory;
}

export interface CityRecord {
  city: string;
  dist_id: string;
  dist: string;
  dept: string;
  x: number;
  y: number;
  clients: number;
  is_hub: boolean;
  dx?: number;
  dy?: number;
  anchor?: 'start' | 'end' | 'middle';
}

export interface DepartmentRecord {
  name: string;
  d: string;
}

export interface CityNode {
  name: string;
  x: number;
  y: number;
  distributorId: string;
}
