import {Injectable} from '@angular/core';
import {LoggerServices} from './logger.services';

@Injectable()
export class StorageServices {
  constructor(private logger: LoggerServices) {}

  writeItem = (name: string, data: any) => {
    localStorage.setItem(name, JSON.stringify(data));
  };

  readItem = (name: string) => {
    const data = localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      this.logger.log('Item was not found at storage');
      return null;
    }
  };
}
