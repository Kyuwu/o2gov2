import { Timestamp } from "@angular/fire/firestore";

export class Contract {
  start!: Timestamp;
  end!: Timestamp;
  price!: number;
}