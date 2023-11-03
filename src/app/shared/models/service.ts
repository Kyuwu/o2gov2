import { Timestamp } from "@angular/fire/firestore";

export class Service {
  start!: Timestamp;
  end!: Timestamp;
  price!: number;
  reason!: String;
  photo!: File;
}