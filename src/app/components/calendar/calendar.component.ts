import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { ReminderCalendarComponent } from '../reminder-calendar/reminder-calendar.component';
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
  remindersCalendar = [];
  panelOpenState = false;

  @Output() selected = new EventEmitter();

  constructor(public dialog: MatDialog) {
    this.buildCalendar();
  }

  buildCalendar() {
    this.dates = this.getCalendarDays(this.date);
    this.buildArrayReminder(this.dates);
    console.log('reminderArray', this.remindersCalendar);
  }

  createIdDay(dateDay) {
    return `${dateDay.getDate()}${dateDay.getMonth() + 1}${dateDay.getYear()}`;
  }

  buildArrayReminder(daysMonth) {
    this.remindersCalendar = [];
    daysMonth.forEach((day) => {
      this.remindersCalendar.push({
        id: this.createIdDay(day),
        dayDate: day,
        dayReminders: new Array(),
      });
    });
  }

  //Add a new entry whithin of the Array of Reminders
  enterReminderInDay(resultReminder) {
    this.remindersCalendar.map((x) => {
      if (x.id === resultReminder.idDate) {
        x.dayReminders.push({
          idArray: x.dayReminders.length + 1,
          idDate: resultReminder.idDate,
          dayReminder: resultReminder.dayDate,
          city: resultReminder.city,
          textReminder: resultReminder.textReminder,
          hourReminder: resultReminder.hourReminder,
          colorReminder: resultReminder.colorReminder,
        });
        x.dayReminders.sort((a, b) =>
          a.hourReminder > b.hourReminder
            ? 1
            : b.hourReminder > a.hourReminder
            ? -1
            : 0
        );
      }
      return x;
    });
  }

  //Search the index of the reminder and update the data
  modifyReminder(reminderModified) {
    this.remindersCalendar.map((x) => {
      if (x.id === reminderModified.idDate) {
        x.dayReminders.map((y) => {
          if (y.idArray == reminderModified.idArray) {
            y.textReminder = reminderModified.textReminder;
            y.city = reminderModified.city;
            y.hourReminder = reminderModified.hourReminder;
            y.colorReminder = reminderModified.colorReminder;
          }
          return y;
        });
        x.dayReminders.sort((a, b) =>
          a.hourReminder > b.hourReminder
            ? 1
            : b.hourReminder > a.hourReminder
            ? -1
            : 0
        );
      }
      return x;
    });
  }

  openDialog(dateReminder) {
    console.log('dateReminder>>>', dateReminder);
    let data;
    //create a structure for send the data to the modal
    if (dateReminder.idArray) {
      console.log('element of array');
      data = {
        idArray: dateReminder.idArray,
        dayDate: dateReminder.dayReminder,
        idDate: dateReminder.idDate,
        textReminder: dateReminder.textReminder,
        city: dateReminder.city,
        hourReminder: dateReminder.hourReminder,
        colorReminder: dateReminder.colorReminder,
      };
    } else {
      console.log('no hay registro');
      data = {
        dayDate: dateReminder.dayDate,
        idDate: dateReminder.id,
      };
    }
    const dialogRef = this.dialog.open(ReminderCalendarComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result);
      if (result) {
        let arrayCheck = this.remindersCalendar.filter(
          (x) => x.id == result.idDate
        );

        console.log('arrayCheck', arrayCheck);
        if (arrayCheck[0]['dayReminders'].length > 0) {
          let indexReminder = arrayCheck[0]['dayReminders'].filter(
            (y) => y.idArray == result.idArray
          );
          if (indexReminder.length > 0) {
            this.modifyReminder(result);
          } else {
            this.enterReminderInDay(result);
          }
        } else {
          this.enterReminderInDay(result);
        }
        console.log(
          'filterArray',
          this.remindersCalendar.filter((x) => x.id == result.idDate)
        );
      }
    });
  }

  setMonth(inc) {
    const [year, month] = [this.date.getFullYear(), this.date.getMonth()];
    this.date = new Date(year, month + inc, 1);
    this.buildCalendar();
  }

  isSameMonth(date) {
    //    console.log('date current>>', date, ' vs ', this.date);
    return date.getMonth() === this.date.getMonth();
  }

  private getCalendarDays(date = new Date()) {
    const calendarStartTime = this.getCalendarStartDay(date).getTime();

    return this.range(0, 41).map((num) => {
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
