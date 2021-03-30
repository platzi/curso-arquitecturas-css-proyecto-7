import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

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
          idArray: uuidv4(),
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
    let data;
    let newRegister = false;
    let bkDateDay;
    //create a structure for send the data to the modal
    if (dateReminder.idArray) {
      //Create the data for edited a reminder
      data = {
        idArray: dateReminder.idArray,
        dayDate: dateReminder.dayReminder,
        idDate: dateReminder.idDate,
        textReminder: dateReminder.textReminder,
        city: dateReminder.city,
        hourReminder: dateReminder.hourReminder,
        colorReminder: dateReminder.colorReminder,
      };
      bkDateDay = dateReminder.dayReminder;
    } else {
      //Enter a new reminder
      data = {
        dayDate: dateReminder.dayDate,
        idDate: dateReminder.id,
      };
      newRegister = true;
      bkDateDay = dateReminder.dayDate;
    }

    const dialogRef = this.dialog.open(ReminderCalendarComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //Don't exist the register
        if (newRegister) {
          if (bkDateDay == result.dayDate) {
            this.enterReminderInDay(result);
          } else {
            result.idDate = this.createIdDay(result.dayDate);
            this.enterReminderInDay(result);
          }
        } else {
          if (bkDateDay == result.dayDate) {
            this.modifyReminder(result);
          } else {
            result.idDate = this.createIdDay(bkDateDay);
            this.deleteReminder(result);
            result.idDate = this.createIdDay(result.dayDate);
            this.enterReminderInDay(result);
          }
        }
      }
    });
  }

  setMonth(inc) {
    const [year, month] = [this.date.getFullYear(), this.date.getMonth()];
    this.date = new Date(year, month + inc, 1);
    this.buildCalendar();
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

  deleteReminder(reminderDelete) {
    if (reminderDelete.idArray) {
      this.remindersCalendar.map((x) => {
        if (x.id === reminderDelete.idDate) {
          let arrayModified = x.dayReminders.filter(
            (y) => y.idArray !== reminderDelete.idArray
          );
          x.dayReminders = arrayModified;
        }
        return x;
      });
    } else {
      this.remindersCalendar.map((x) => {
        if (x.id === reminderDelete.id) {
          x.dayReminders = [];
        }
        return x;
      });
    }
  }
}
