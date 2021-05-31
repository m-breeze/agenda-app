export class Event{
    time: Date;
    subject: string;
    location: {lat: number, lng: number };
    locationDesc: string;
    description: string;

    constructor(time: string, subject: string, location: {lat: number, lng: number }, description: string, locDesc: string) {
        this.time = new Date(time);
        this.subject = subject;
        this.location = location;
        this.description = description;
        this.locationDesc = locDesc;
    }
} 