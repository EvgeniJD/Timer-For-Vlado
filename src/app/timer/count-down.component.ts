import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit, OnDestroy {

  constructor() { }

  private subscription: Subscription;

  @Input() public dDay: Date;
  @Input() triggers: Date[] = [];
  @Output() newStringEvent = new EventEmitter<string>();
  eventCounter = 1;


  public dateNow = new Date();
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;



  private getTimeDifference() {
    const currentTime = new Date();

    for (let i = 0; i < this.triggers.length; i++) {

      if (
        this.triggers[i].toString() === currentTime.toString()
      ) {
        this.newStringEvent.emit(`Time marker ${this.eventCounter} is reached!`);
        this.eventCounter++;
      }
    }

    this.timeDifference = this.dDay.getTime() - currentTime.getTime();

    if (this.dDay.toString() === currentTime.toString()) {
      this.newStringEvent.emit('End Reached');
      this.subscription.unsubscribe();
      return;
    }

    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

  ngOnInit() {
    if(this.dateNow < this.dDay) {
      this.subscription = interval(1000)
        .subscribe(x => { this.getTimeDifference(); });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
