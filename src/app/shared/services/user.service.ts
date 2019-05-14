import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {User} from "../models/user.model";
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(
        map((response: any) => response)
      )
      .pipe(
        map((user: User[]) => user[0] ? user[0] : undefined)
      );
  }

  public createNewUser(user: User): Observable<User> {
    return this.http.post(`http://localhost:3000/users`, user)
      .pipe(
        map((response: any) => response)
      )
  }
}
