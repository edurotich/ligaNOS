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
    return parseInt(link.substring(link.lastIndexOf('/') + 1), 10);
  }
  /**
   * Extracts an id from a link between last and previous occurence of slash
   *
   * @param {string} link
   * @returns {number}
   * @memberof HelperService
   */
  getOccurrenceBetweenSlash(link: string): number {
    return parseInt(link.split('/').slice(-2)[0], 10);
  }

  /**
   * Check if a string has only numbers
   *
   * @param {string} str
   * @returns {boolean}
   * @memberof HelperService
   */
  hasOnlyNumbers(str: string): boolean {
    if (/^\d+$/.test(str)) {
      return true;
    }
    return false;
  }

}
