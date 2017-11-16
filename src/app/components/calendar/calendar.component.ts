import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarDateFormatter, DAYS_OF_WEEK } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';

import { FootdataService } from '../../services/footdata.service';
import { Calendar } from './calendar.interface';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {
  calendar: Calendar[];

  view = 'month';
  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];

  locale = 'pt';
  activeDayIsOpen = false;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  constructor(private modal: NgbModal, private footdata: FootdataService) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  ngOnInit() {
    this.getAllMatches();
  }
/**
 * Subscribes an observable returned from the service and sets data to type of Calendar
 *
 * @memberof CalendarComponent
 */
getAllMatches(): void {
    this.footdata.getAllMatches().subscribe(
      (data: any) => {
        this.calendar = data;

        this.calendar['fixtures'].forEach(d => {
          this.events.push(
            {
              title: d.homeTeamName + '  vs  ' + d.awayTeamName,
              start: new Date(d.date),
              color: colors.blue,
              actions: this.actions
            });
        });

        this.refresh.next(); // refresh to display new elements on the events array
      }, (err: any) => console.log(err),
      () => {
        // console.log('finished getAllMatches()');
      });

  }
}
