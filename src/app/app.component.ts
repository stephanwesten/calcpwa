import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BuildTimeFile } from "../environments/buildtime-file";
import { ShareFormComponent } from './share-form/share-form.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'calcgems';
  readonly buildtimestamp = BuildTimeFile.buildtime

  constructor(private router: Router, public dialog: MatDialog) {}

  share(): void {
    const dialogRef = this.dialog.open(ShareFormComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      // nothing to do
    });
  }

}

