import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

    /**
   * Extracts an id from a Link after last occurence of slash
   *
   * @param {string} link
   * @returns {string}
   * @memberof HomeComponent
   */
  getLastOccurrence(link: string): number {
    return parseInt( link.substring(link.lastIndexOf('/') + 1) , 10) ;
  }

}
