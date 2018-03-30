import {Injectable} from '@angular/core';

import {LoggerServices} from './logger.services';

@Injectable()
export class StorageServices {
  constructor(private logger: LoggerServices) {}

  // Converts data to blob and writes it to localStorage
  writeItem = (name: string, data: any) => {
    localStorage.setItem(name, btoa(JSON.stringify(data)));
  };

  // Reads data from localStorage and converts it back to JSON
  // Throws error if required data wasn't found at storage
  readItem = (name: string) => {
    const data = localStorage.getItem(name);
    if (data) {
      return JSON.parse(atob(data));
    } else {
      this.logger.log('Item was not found at storage');
      return null;
    }
  };
}
