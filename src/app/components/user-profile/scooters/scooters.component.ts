import {
  Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ContractService } from 'src/app/shared/contract.service';
import {
  Scooter
} from 'src/app/shared/models/scooter';
import { User } from 'src/app/shared/models/user';
import { ScooterService } from 'src/app/shared/scooters.service';


@Component({
  selector: 'app-scooters',
  templateUrl: './scooters.component.html',
  styleUrls: ['./scooters.component.scss'],
})
export class ScootersComponent implements OnInit {
  scooters: Scooter[]
  index = 0;
  scooterSelection: FormGroup;
  contractSelection: FormGroup;
  chosenScooter: Scooter;
  user: User;

  constructor(
    public fb: FormBuilder,
    public scooter: ScooterService,
    public router: Router,
    public auth: AuthService,
    public db: ContractService
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.scooterSelection = this.fb.group({
      price: ['', ],
      maxKmh: ['', ],
      brand: ['', ],
      description: ['', ],
      year: ['', ],
      photo: ['', ],
      licensePlate: ['', ],
    });
    this.contractSelection = this.fb.group({
      price: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.scooter.getScooters().subscribe(data => {
      this.scooters = data;
    });
  }

  submitScooter(number: number, scooter: Scooter) {
    this.index = number
    this.scooterSelection.setValue({
      price: scooter.price,
      maxKmh: scooter.maxKmh,
      brand: scooter.brand,
      description: scooter.description,
      year: scooter.year,
      photo: scooter.photo,
      licensePlate: scooter.licensePlate
    })
    this.contractSelection.setControl('price', new FormControl(this.scooterSelection.controls['price'].value, Validators.required));
  }

  finish() {
    this.db.createContract(this.scooterSelection.value, this.contractSelection.value, this.user);
    this.router.navigate([`/user-profile/${this.user.id}`])
  }
}
