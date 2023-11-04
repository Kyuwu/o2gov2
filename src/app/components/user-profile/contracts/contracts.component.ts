import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { ConfirmationDialog } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ContractService } from 'src/app/shared/contract.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit {

  currentUser: User
  endDate: string;
  startDate: string;
  sub1: Subscription;
  confirmDialog: MatDialogRef<ConfirmationDialog>;

  constructor(public router: Router, public db: ContractService, public auth: AuthService, public activatedRoute: ActivatedRoute, public dialog: MatDialog) { 
    this.currentUser = JSON.parse(sessionStorage.getItem("user"));
  }
  home() {
    this.router.navigate([`/user-profile/${this.currentUser.id}`])
  }

  remove() {
    this.db.deleteContract(this.currentUser);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.sub1 = this.auth.getUserById(id)
    .subscribe(userfetch => {
      // if the user doesn't exists, return to login page
      if (!userfetch) {
        this.router.navigate(['/log-in']);
      } else {
        this.currentUser = userfetch;
        localStorage.setItem('user', JSON.stringify(userfetch));
        this.startDate = this.currentUser?.contract?.start.toDate().toDateString()
        this.endDate = this.currentUser?.contract?.end.toDate().toDateString()
      }
    });
  }
  
  confirm() {
    this.confirmDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.confirmDialog.componentInstance.confirmMessage = "Are you sure you want to stop your contract?";

    this.confirmDialog.afterClosed().subscribe(result => {
      if(result) {
        this.remove();
      }
      this.confirmDialog = null;
    });
  }
}
