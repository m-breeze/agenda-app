import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
})
export class EventComponent {
  @Input() value: any;
  @Output() deleteEventInstanceEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() editEventInstanceEvent: EventEmitter<Event> = new EventEmitter<Event>();

  handleDeleteClick() {
    this.deleteEventInstanceEvent.emit(this.value);
  }

  handleEditClick() {
    console.log("hi")
    this.editEventInstanceEvent.emit(this.value);
  }
}