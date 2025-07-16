import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule,RouterOutlet]
})
export class AppComponent {
  title = 'shell';
}
