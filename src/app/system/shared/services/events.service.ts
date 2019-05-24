import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {BaseApi} from "../../../shared/core/base-api";
import {Observable} from "rxjs/Rx";
import {APPEvent} from "../models/event.model";

@Injectable()
export class EventsService extends BaseApi {

  constructor(public http:HttpClient) {
    super(http);
  }

  addEvent(event: APPEvent): Observable<APPEvent> {
    return this.post('events', event);
  }
}