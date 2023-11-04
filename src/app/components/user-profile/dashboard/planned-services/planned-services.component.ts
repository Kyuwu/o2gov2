import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ServicesService } from 'src/app/shared/services/services.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Service } from '../../../../shared/models/service';

@Component({
  selector: 'app-planned-services',
  templateUrl: './planned-services.component.html',
  styleUrls: ['./planned-services.component.scss'],
})
export class PlannedServicesComponent implements OnInit {
  displayedColumns: string[] = ['action','brand', 'licensePlate','description','year', 'price'];
  services: Service[];
  confirmDialog: MatDialogRef<ConfirmationDialog>;
  constructor(private db: ServicesService, public dialog: MatDialog, public snackbar: SnackbarService) { }

  ngOnInit() {
    this.retrieveList();
  }

  retrieveList(): void {
    this.db.getServices().subscribe(data => {
      console.log(data)
      this.services = data;
    });
  }

  confirm(data: any) {
    this.confirmDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.confirmDialog.componentInstance.confirmMessage = "Are you sure you want to delete "+data.licensePlate+"?"

    this.confirmDialog.afterClosed().subscribe(result => {
      if(result) {
        this.resolve(data);
      }
      this.confirmDialog = null;
    });
  }

  private resolve(data: any) {
    if (data.email) {
        // .then(() => {
        //   this.snackbar.delete(`Deleted scooter with licenseplate: ${data.licensePlate}`, '');
        // })
        // .catch(err => console.log(err));
    }
  }

}
