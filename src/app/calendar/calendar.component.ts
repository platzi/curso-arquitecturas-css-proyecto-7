import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { ReminderCalendarComponent } from '../reminder/reminder-calendar/reminder-calendar.component';
import { MatDialog } from '@angular/material/dialog';

const DAY_MS = 60 * 60 * 24 * 1000;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  dates: Array<Date>;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  date = new Date();
  selectedDate = new Date();

  @Output() selected = new EventEmitter();

  constructor(public dialog: MatDialog) {
    this.dates = this.getCalendarDays(this.date);
  }

  openDialog(date) {
    const dialogRef = this.dialog.open(ReminderCalendarComponent, {
      data: { date: date, city: '', hourReminder: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(
        `Dialog result: ${result.city} ${result.date} ${result.hourReminder}`
      ); // Pizza!
    });
  }

  setMonth(inc) {
    const [year, month] = [this.date.getFullYear(), this.date.getMonth()];
    this.date = new Date(year, month + inc, 1);
    this.dates = this.getCalendarDays(this.date);
  }

  isSameMonth(date) {
    return date.getMonth() === this.date.getMonth();
  }

  private getCalendarDays(date = new Date()) {
    const calendarStartTime = this.getCalendarStartDay(date).getTime();

    return this.range(0, 41).map((num) => {
      console.log('days calendar', new Date(calendarStartTime + DAY_MS * num));
      return new Date(calendarStartTime + DAY_MS * num);
    });
  }

  private getCalendarStartDay(date = new Date()) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(1, 7)
      .map((num) => new Date(firstDayOfMonth - DAY_MS * num))
      .find((dt) => dt.getDay() === 0);
  }

  private range(start, end, length = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i);
  }
}
