import { category } from "./category";

export type product = {
  id: number;
  name: string;
  price: number;
  image: string;
  active: boolean;
  category: category;
};
