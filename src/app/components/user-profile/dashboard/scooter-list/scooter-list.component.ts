import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditScooterComponent } from './edit-scooter/edit-scooter.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AddScooterComponent } from './add-scooter/add-scooter.component';
import { ScooterService } from 'src/app/shared/services/scooters.service';
import { ConfirmationDialog } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-scooter-list',
  templateUrl: './scooter-list.component.html',
  styleUrls: ['./scooter-list.component.scss'],
})
export class ScooterListComponent implements OnInit {

  displayedColumns: string[] = ['action','brand', 'licensePlate','description','year', 'price'];
  dataSource = new MatTableDataSource();
  confirmDialog: MatDialogRef<ConfirmationDialog>;
  constructor(private db: ScooterService, public dialog: MatDialog, public snackbar: SnackbarService, public dialogRef: MatDialogRef < EditScooterComponent > ) { }

  ngOnInit() {
    this.retrieveList();
  }

  retrieveList(): void {
    this.db.getScooters().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  add() {
    const dialogRef = this.dialog.open(AddScooterComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.snackbar.add(`Added scooter: ${data.name}`, '');
      }
      this.retrieveList();
    });
  }

  edit(data: any) {
    const dialogRef = this.dialog.open(EditScooterComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.update(`Updated scooter: ${data.name}`, '');
      }
      this.retrieveList();
    });
  }

  confirm(data: any) {
    this.confirmDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.confirmDialog.componentInstance.confirmMessage = "Are you sure you want to delete "+data.licensePlate+"?"

    this.confirmDialog.afterClosed().subscribe(result => {
      if(result) {
        this.delete(data);
      }
      this.confirmDialog = null;
    });
  }

  private delete(data: any) {
    if (data.licensePlate) {
      this.db.deleteScooter(data.licensePlate)
        // .then(() => {
        //   this.snackbar.delete(`Deleted scooter with licenseplate: ${data.licensePlate}`, '');
        // })
        // .catch(err => console.log(err));
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
