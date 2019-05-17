import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {User} from "../models/user.model";
import {map} from 'rxjs/operators';
import {BaseApi} from "../core/base-api";


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApi{

  constructor(public http: HttpClient) {
    super(http);
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


  // getUserByEmail(email: string): Observable<User> {
  //   return this.get(`users?email=${email}`);
  // }


  public createNewUser(user: User): Observable<User> {
    return this.http.post(`http://localhost:3000/users`, user)
      .pipe(
        map((response: any) => response)
      )
  }

  // createNewUser(user: User): Observable<User> {
  //   return this.post('users', user)
  // }



}
