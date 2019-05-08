import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserBtEmail(email: string): Observable<User> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
        .map((response: HttpResponse) => response.json());
  }
}
