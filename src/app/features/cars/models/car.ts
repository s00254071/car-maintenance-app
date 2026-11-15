export interface Car {
  _id: string;
  make: string;
  model: string;
  year?: number;
  mileage?: number;
}

export interface CreateCarDto {
  make: string;
  model: string;
  year?: number;
}