import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'timer';

  endDate = new Date('Dec 22 2020 20:39:00');
  timeTriggers = [new Date('Dec 22 2020 20:38:30'), new Date('Dec 22 2020 20:38:35')];

  logInfo(text) {
    console.log(text);
  }
}
