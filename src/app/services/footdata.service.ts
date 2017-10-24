import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FootdataService {

  private authToken = '29132a8e28df4ef784a8d0e853aeadee';
  private api_url = 'http://api.football-data.org/v1/';

  private headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});

  constructor(public http: Http) {
    this.headers.append('X-auth-token', this.authToken);
  }

  getLeagueTable() {
    const options: RequestOptions = new RequestOptions({ headers: this.headers });

    return this.http.get(this.api_url + 'competitions/457/leagueTable', options)
    .map(res => res.json());
  }

  getMatches(matchday: number)  {
    const options: RequestOptions = new RequestOptions({ headers: this.headers });

    return this.http.get(this.api_url + 'competitions/457/fixtures?matchday=' + matchday, options) // ?matchday=
    .map(res => res.json());
  }

  getLeagueInfo()  {
    const options: RequestOptions = new RequestOptions({ headers: this.headers });

    return this.http.get(this.api_url + 'competitions/457', options)
    .map(res => res.json());
  }



}
