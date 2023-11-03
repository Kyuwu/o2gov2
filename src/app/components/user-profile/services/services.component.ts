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
  confirmDialog: MatDialogRef<ConfirmationDialog>;
  constructor(public fb: FormBuilder, public auth: AuthService, public dialog: MatDialog, public router: Router, public db: ServicesService, public activatedRoute: ActivatedRoute ,public photoService: PhotoService) {
    this.serviceForm = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }

  home() {
    this.router.navigate([`/user-profile/${this.currentUser.id}`])
  }

  plan() {
    this.db.createService(this.serviceForm.value, this.currentUser);
  }

  addPhotoToGallery() {
    // add picture to the form
    this.serviceForm.addControl('photo', new FormControl(this.photoService.photos[0]));
    this.photoService.addNewToGallery();
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
        this.startDate = this.currentUser.service.start.toDate().toDateString()
        this.endDate = this.currentUser.service.end.toDate().toDateString()
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
