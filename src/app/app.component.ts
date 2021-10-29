import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BuildTimeFile } from "../environments/buildtime-file";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'calcgems';
  readonly buildtimestamp = BuildTimeFile.buildtime

  constructor(private router: Router) {
  }

}

