import { Timestamp } from "@angular/fire/firestore";

export class Service {
  start!: Timestamp;
  end!: Timestamp;
  reason!: string;
  photo!: string;
  email?: string;
}