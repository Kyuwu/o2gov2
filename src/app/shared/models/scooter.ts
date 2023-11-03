import { Contract } from "./contract";
import { Service } from "./service";

export class Scooter {
    licensePlate!: string;
    maxKmh!: number;
    brand!: string;
    year!: number;
    description!: string;
    price!: number;
    photo?: string;

    setPic(photo: any) {
      this.photo = photo
    }
  }

