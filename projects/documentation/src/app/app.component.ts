import { Component } from '@angular/core';
import { MatThemingService } from '@hysalim/theming';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'documentation';

  constructor(public theme: MatThemingService) {}
}
