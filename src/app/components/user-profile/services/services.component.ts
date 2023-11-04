import {
  Component,
  Injectable,
  OnInit
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDateRangeSelectionStrategy, DateRange, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  User} from 'src/app/shared/models/user';
import { PhotoService } from '../../services/photo.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ServicesService } from 'src/app/shared/services.service';
import { Service } from 'src/app/shared/models/service';


@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -2);
      const end = this._dateAdapter.addCalendarDays(date, 2);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ],
})
export class ServicesComponent implements OnInit {

  currentUser: User
  serviceForm: FormGroup;
  endDate: string;
  startDate: string;
  first: boolean = true;
  sub1: Subscription;
  sub2: Subscription;
  service: Service;
  confirmDialog: MatDialogRef<ConfirmationDialog>;
  constructor(public fb: FormBuilder, public auth: AuthService, public dialog: MatDialog, public router: Router, public db: ServicesService, public activatedRoute: ActivatedRoute ,public photoService: PhotoService) {
    this.currentUser = JSON.parse(sessionStorage.getItem("user"));
    this.serviceForm = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      reason: ['', Validators.required],
      photo: ['', Validators.required]
    });
  }

  home() {
    this.router.navigate([`/user-profile/${this.currentUser.id}`])
  }

  plan() {
    // create a new checkup with the given form and user
    this.confirmDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.confirmDialog.componentInstance.confirmMessage = "Are you sure you want to apply a new checkup? (will overwrite your current one if you have one already)";
    this.confirmDialog.afterClosed().subscribe(result => {
      if(result) {
        this.db.createService(this.serviceForm.value, this.currentUser);
        this.serviceForm.reset();
      }
      this.confirmDialog = null;
    });
  }

  addPhotoToGallery() {
    // add picture to the form
    this.photoService.getImage().finally(() => {
      // only uploading 1 image for db quota
      this.serviceForm.controls['photo'].setValue(this.photoService.photos[0]?.data);
    });;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.auth.getUserById(id)
    .subscribe(userfetch => {
      // if the user doesn't exists, return to login page
      if (!userfetch) {
        this.router.navigate(['/log-in']);
      } else {
        this.currentUser = userfetch;
        localStorage.setItem('user', JSON.stringify(userfetch));
        this.sub2 = this.db.getServiceById(userfetch)
        .subscribe(servicefetch => {
          // if the user doesn't exists, return to login page
            this.service = servicefetch;
            this.startDate = servicefetch?.start?.toDate().toDateString()
            this.endDate = servicefetch?.end?.toDate().toDateString()
            localStorage.setItem('service', JSON.stringify(servicefetch));
        });
      }
    });

  }


  remove() {
    this.db.deleteService(this.currentUser);
  }

  confirm() {
    this.confirmDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.confirmDialog.componentInstance.confirmMessage = "Are you sure you want to cancel your checkup?";
    this.confirmDialog.afterClosed().subscribe(result => {
      if(result) {
        this.remove();
      }
      this.confirmDialog = null;
    });
  }

}
