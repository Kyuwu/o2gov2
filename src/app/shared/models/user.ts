import { Contract } from "./contract";
import {
  Scooter
} from "./scooter";
import { Service } from "./service";

export class User {
  id?: string;
  email!: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  housenumber?: string;
  postalCode?: string;
  city?: string;
  admin?: boolean;
  scooter?: Scooter;
  service?: Service;
  contract?: Contract;
}
