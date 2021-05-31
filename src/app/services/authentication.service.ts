import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<string>(`http://127.0.0.1:5000/auth/sign-in`, { email: username, password })
            .pipe(map(token => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                const user: User = new User(token);
                localStorage.setItem('currentUser', JSON.stringify({ token }));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    signUp(username: string, password: string) {
        return this.http.post<string>(`http://127.0.0.1:5000/auth/sign-up`, { email: username, password })
            .pipe(map(token => {
                const user: User = new User(token);
                localStorage.setItem('currentUser', JSON.stringify({ token }));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}