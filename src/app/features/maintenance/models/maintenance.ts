export interface Maintenance {
  _id: string;
  carId: string;
  type: string;
  date: string;
  cost: number;
}

export interface CreateMaintenanceDto {
  carId: string;
  type: string;
  date: string;
  cost: number;
}

export interface UpdateMaintenanceDto {
  carId: string;
  type: string;
  date: string;
  cost: number;
}