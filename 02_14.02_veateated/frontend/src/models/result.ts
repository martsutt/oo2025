import { Athlete } from "./athlete";
import { Event } from "./event";

export interface Result {
  id: number;
  event: Event;
  athlete: Athlete;
  score: number;
}
