import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material-module';
import { MatNativeDateModule } from '@angular/material/core';
import { ReminderCalendarComponent } from './components/reminder-calendar/reminder-calendar.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { WeatherService } from './services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { ConverterGradesPipe } from './utils/converter-grades.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ReminderCalendarComponent,
    ConverterGradesPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
