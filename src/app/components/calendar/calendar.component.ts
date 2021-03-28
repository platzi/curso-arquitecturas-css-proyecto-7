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
    this.dates = this.getCalendarDays(this.date);
    this.buildArrayReminder(this.dates);
    console.log('reminderArray', this.remindersCalendar);
  }

  createIdDay(dateDay) {
    return `${dateDay.getDate()}${dateDay.getMonth() + 1}${dateDay.getYear()}`;
  }

  buildArrayReminder(daysMonth) {
    daysMonth.forEach((day) => {
      this.remindersCalendar.push({
        id: this.createIdDay(day),
        dayDate: day,
        //Test date generated
        dayReminders: new Array(),
        //   {
        //   idDate: this.createIdDay(day),
        //   id: 1,
        //   dayDate: day,
        //   city: 'Loja',
        //   textReminder: 'textReminder',
        //   hourReminder: 'hourReminder',
        //   colorReminder: '#000000',
        // }),
      });
    });
  }

  //Add whithin of the Array of Reminders for date a new entry
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
      }
    });
  }

  modifyReminder(reminderModified) {
    this.remindersCalendar.map((x) => {
      if (x.id === reminderModified.idDate) {
        //console.log('x element of Array Reminder', x);
        x.dayReminders.map((y) => {
          if (y.idArray == reminderModified.idArray) {
            y.textReminder = reminderModified.textReminder;
            y.city = reminderModified.city;
            y.hourReminder = reminderModified.hourReminder;
            y.colorReminder = reminderModified.colorReminder;
          }
          return y;
        });
      }
    });
  }

  openDialog(dateReminder) {
    console.log('dateReminder>>>', dateReminder);
    let data;
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
      //create a structure for send the data to the modal
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
          this.modifyReminder(result);
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
    this.dates = this.getCalendarDays(this.date);
  }

  isSameMonth(date) {
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
