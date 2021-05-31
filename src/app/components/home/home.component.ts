import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import {FormControl} from '@angular/forms';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Event } from 'src/app/models/event';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(ModalDirective) modal: ModalDirective;  
  timeInput = new FormControl();
  subjectInput = new FormControl();
  locationInput = new FormControl();
  descriptionInput = new FormControl();

  center: google.maps.LatLngLiteral = {lat: 50.529483, lng: 30.441065};
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  isEdit: boolean = false;

  currentEditEventIndex: number;

  currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    //map
    addMarker(event: google.maps.MapMouseEvent) {
      this.markerPositions = [event.latLng.toJSON()];
    }

    

  events: Array<Event> = [
    new Event('2021-07-12T12:07:42.511Z', 'Завтрак с Анной', {lat: 50.529483, lng: 30.441065}, 'Обсудить презентацию', 'Central Park'),
    new Event('2021-06-15T16:07:42.511Z', 'Daily Meeting', {lat: 50.6529483, lng: 30.441065}, '', ''),
    new Event('2021-03-06T19:07:42.511Z', 'Созвониться с менеджером по продажам', {lat: 50.429483, lng: 30.441065}, '', 'Lounge Cafe'),
    new Event('2021-05-04T20:09:42.511Z', 'Обед с Тимофеем', {lat: 50.329483, lng: 30.441065}, 'Обсуждение критических моментов, которые произошли на вчерашней встрече с китайцами.', 'Pizza Bar'),
  ]

  
  deleteEvent(event: Event) {
    const itemIndex = this.events.findIndex(el => el === event);
    this.events.splice(itemIndex, 1);
  }

  editEvent(event: Event) {
    this.isEdit = true;
    this.markerPositions[0] = event.location;
    this.timeInput.setValue(event.time);
    this.subjectInput.setValue(event.subject);
    this.locationInput.setValue(event.locationDesc);
    this.descriptionInput.setValue(event.description);

    const index = this.events.findIndex(el => el === event);
    this.currentEditEventIndex = index;
    this.modal.show()
  }

  editEventComplete() {
    this.events[this.currentEditEventIndex] = new Event(
      this.timeInput.value,
      this.subjectInput.value,
      { lat: this.markerPositions[0].lat, lng: this.markerPositions[0].lng },
      this.descriptionInput.value,
      this.locationInput.value,
    );

    this.modal.hide();
  }

  addNewEvent() {
    this.isEdit = false;
    this.timeInput.setValue('');
    this.subjectInput.setValue('');
    this.locationInput.setValue('');
    this.descriptionInput.setValue('');
    this.markerPositions = []
    this.modal.show()
  }

  addNewEventComplete() {
    const newEvent: Event = new Event(
      this.timeInput.value,
      this.subjectInput.value,
      { lat: this.markerPositions[0].lat, lng: this.markerPositions[0].lng },
      this.descriptionInput.value,
      this.locationInput.value,
    );

    console.log(this.timeInput.value)

    //Add the new object to the events array
    this.events.push(newEvent);

    //Clear the form's inputs
    this.timeInput.setValue('');
    this.subjectInput.setValue('');
    this.locationInput.setValue('');
    this.descriptionInput.setValue('');

    this.modal.hide();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
