import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  date: '';
  city: '';
  hourReminder: '';
}

@Component({
  selector: 'app-reminder-calendar',
  templateUrl: './reminder-calendar.component.html',
  styleUrls: ['./reminder-calendar.component.scss'],
})
export class ReminderCalendarComponent {
  constructor(
    public dialogRef: MatDialogRef<ReminderCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
