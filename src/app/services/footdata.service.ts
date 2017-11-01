import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FootdataService {

  private authToken = '29132a8e28df4ef784a8d0e853aeadee';
  private api_url = 'http://api.football-data.org/v1/';

  private headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });

  constructor(public http: Http) {
    this.headers.append('X-auth-token', this.authToken);
  }

  /**
   * Gets current league table from API and returns an observable
   *
   * @returns {Observable<any>}
   * @memberof FootdataService
   */
  getLeagueTable(): Observable<any> {
    const options: RequestOptions = new RequestOptions({ headers: this.headers });

    return this.http.get(this.api_url + 'competitions/457/leagueTable', options)
      .map(res => res.json())
      .catch(this.catchError);
  }

  getPreviousLeagueTable(matchday: number): Observable<any> {
    const options: RequestOptions = new RequestOptions({ headers: this.headers });

    return this.http.get(this.api_url + 'competitions/457/leagueTable?matchday=' + matchday, options)
      .map(res => res.json())
      .catch(this.catchError);
  }

  /**
   * Gets current league matchday games from API and returns an observable
   *
   * @param {number} matchday
   * @returns {Observable<any>}
   * @memberof FootdataService
   */
  getMatches(matchday: number): Observable<any> {
    const options: RequestOptions = new RequestOptions({ headers: this.headers });

    return this.http.get(this.api_url + 'competitions/457/fixtures?matchday=' + matchday, options) // ?matchday=
      .map(res => res.json())
      .catch(this.catchError);
  }

  /**
   * Gets current league info from API and returns an observable
   *
   * @returns {Observable<any>}
   * @memberof FootdataService
   */
  getLeagueInfo(): Observable<any> {
    const options: RequestOptions = new RequestOptions({ headers: this.headers });

    return this.http.get(this.api_url + 'competitions/457', options)
      .map(res => res.json())
      .catch(this.catchError);
  }
  /**
   * Gets head2head info based on id and returns and observable
   *
   * @param {number} head2headId
   * @returns {Observable<any>}
   * @memberof FootdataService
   */
  getHead2Head(head2headId: number): Observable<any> {
    const options: RequestOptions = new RequestOptions({ headers: this.headers });

    return this.http.get(this.api_url + 'fixtures/' + head2headId, options)
      .map(res => res.json())
      .catch(this.catchError);
  }

  /**
   * Gets team info based on ID and returns an observable
   *
   * @param {number} teamId
   * @returns {Observable<any>}
   * @memberof FootdataService
   */
  getTeamInfo(teamId: number): Observable<any> {
    const options: RequestOptions = new RequestOptions({ headers: this.headers });

    return this.http.get(this.api_url + 'teams/' + teamId, options)
      .map(res => res.json())
      .catch(this.catchError);
  }

  /**
   * Catch errors that are thrown by the observables
   *
   * @private
   * @param {(Response | any)} error
   * @returns
   * @memberof FootdataService
   */
  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
