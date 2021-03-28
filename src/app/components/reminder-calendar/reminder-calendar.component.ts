import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  idArray: null;
  idDate: null;
  dayDate: null;
  textReminder: null;
  city: null;
  hourReminder: null;
  colorReminder: null;
}

@Component({
  selector: 'app-reminder-calendar',
  templateUrl: './reminder-calendar.component.html',
  styleUrls: ['./reminder-calendar.component.scss'],
})
export class ReminderCalendarComponent {
  arrayColors = [
    { id: 'Pink', value: '#FFC0CB' },
    { id: 'Purple', value: '#DA70D6' },
    { id: 'Red', value: '#FF0000' },
    { id: 'Orange', value: '#FF8C00' },
    { id: 'Yellow', value: '#FFFF00' },
    { id: 'Green', value: '#32CD32' },
    { id: 'Cyan', value: '#00FFFF' },
    { id: 'Blue', value: '#4169E1' },
    { id: 'Brown', value: '#CD853F' },
    { id: 'Black', value: '#000000' },
    { id: 'Grey', value: '#D3D3D3' },
  ];

  constructor(
    public dialogRef: MatDialogRef<ReminderCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log('maped data>>', data);
  }
}
