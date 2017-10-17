import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FootdataService {

  private authToken = '29132a8e28df4ef784a8d0e853aeadee';
  private api_url = 'http://api.football-data.org/v1/competitions/457/leagueTable';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(public http: Http) {
    this.headers.append('charset', 'UTF-8');
    this.headers.append('X-auth-token', this.authToken);
  }

  getLeagueTable()  {
    const options: RequestOptions = new RequestOptions({
      headers: this.headers
    });
    return this.http.get(this.api_url, options)
    .map(res => res.json());
  }

}
