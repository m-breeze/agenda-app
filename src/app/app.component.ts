import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ModalDirective) modal: ModalDirective;  
  timeInput = new FormControl();
  subjectInput = new FormControl();
  locationInput = new FormControl();
  descriptionInput = new FormControl();

  events: Array<any> = [
    {time: '08:00', subject: 'Завтрак с Анной', location: 'Lounge Caffe', description: 'Обсудить презентацию'},
    {time: '08:30', subject: 'Daily Meeting', location: 'Офис'},
    {time: '09:00', subject: 'Созвониться с менеджером по продажам'},
    {time: '12:00', subject: 'Обед с Тимофеем', location: 'Pizza Bar', description: 'Обсуждение критических моментов, которые произошли на вчерашней встрече с китайцами.'},
  ]

  
  deleteEvent(event: any) {
    const itemIndex = this.events.findIndex(el => el === event);
    this.events.splice(itemIndex, 1);
  }

  addNewEvent() {
    const newEvent: any= {
      time: this.timeInput.value,
      subject: this.subjectInput.value,
      location: this.locationInput.value,
      description: this.descriptionInput.value
    };

    //Add the new object to the events array
    this.events.push(newEvent);

    //Clear the form's inputs
    this.timeInput.setValue('');
    this.subjectInput.setValue('');
    this.locationInput.setValue('');
    this.descriptionInput.setValue('');

    this.modal.hide();
  }

}
