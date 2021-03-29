import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderCalendarComponent } from './reminder-calendar.component';

describe('ReminderCalendarComponent', () => {
  let component: ReminderCalendarComponent;
  let fixture: ComponentFixture<ReminderCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
