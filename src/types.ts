export interface MenuOptions {
  title: string;
  value: string;
}

export interface Model {
  name: string;
}

export interface Manifacturer {
  name: string;
  models: Model[];
}

export interface Car {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  color: string;
  mileage: {
    number: number;
    unit: string;
  };
  fuelType: string;
  pictureUrl: string;
}

export interface CarsResponse {
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
}
