import { Car } from "./types";

export const carsListData: Car[] = [
  {
    stockNumber: 68830,
    manufacturerName: "Tesla",
    modelName: "Model X",
    color: "black",
    mileage: { number: 132739, unit: "km" },
    fuelType: "Petrol",
    pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg",
  },
  {
    stockNumber: 10027,
    manufacturerName: "BMW",
    modelName: "8er",
    color: "green",
    mileage: { number: 104285, unit: "km" },
    fuelType: "Diesel",
    pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg",
  },
];

export const colorsResponse = [
  { title: "Red", value: "Red" },
  { title: "Blue", value: "Blue" },
  { title: "Yellow", value: "Yellow" },
];

export const manifacturerResponse = [
  { title: "Audi", value: "Audi" },
  { title: "BMW", value: "BMW" },
  { title: "Chrysler", value: "Chrysler" },
  { title: "Dodge", value: "Dodge" },
  { title: "Fiat", value: "Fiat" },
  { title: "Mercedes-Benz", value: "Mercedes-Benz" },
  { title: "Porsche", value: "Porsche" },
  { title: "Skoda", value: "Skoda" },
  { title: "Tesla", value: "Tesla" },
  { title: "Volkswagen", value: "Volkswagen" },
];

export const menuOptionsData = [
  { title: "All Manifacturer", value: "all" },
  { title: "Audi", value: "Audi" },
  { title: "BMW", value: "BMW" },
  { title: "Chrysler", value: "Chrysler" },
  { title: "Dodge", value: "Dodge" },
  { title: "Fiat", value: "Fiat" },
  { title: "Mercedes-Benz", value: "Mercedes-Benz" },
  { title: "Porsche", value: "Porsche" },
  { title: "Skoda", value: "Skoda" },
  { title: "Tesla", value: "Tesla" },
  { title: "Volkswagen", value: "Volkswagen" },
];

export const carsResponse = {
  cars: carsListData,
  totalPageCount: 2,
  totalCarsCount: 19,
};
