import { persons } from "./person";
import { product } from "./products";

export type orders = {
  id: number;
  date: Date;
  products: product[];
  person: persons;
  totalSum: number;
};
