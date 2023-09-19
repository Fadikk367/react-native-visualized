export interface HealthData {
  heartRate: PointData[];
  activity: RingData[];
  sleep: BarData[];
}

export interface PointData {
  x: number;
  y: number;
}

export interface RingData {
  color: string;
  label: string;
  value: number;
  full: number;
  extras?: {
    value: number;
    full: number;
  };
}

export interface BarData {
  label: string;
  value: number;
}
