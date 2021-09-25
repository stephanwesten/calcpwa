import { Component } from '@angular/core';
import { BuildTimeFile } from "../environments/buildtime-file";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent {
  title = 'calc-pwa';
  readonly buildtimestamp = BuildTimeFile.buildtime
}

