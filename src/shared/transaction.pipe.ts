import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'splitAddress'})
export class TransactionPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return `
        ${value.charAt(0)}${value.charAt(1)}${value.charAt(2)}${value.charAt(3)}
        ...
        ${value.charAt(value.length - 4)}${value.charAt(value.length - 3)}${value.charAt(value.length - 2)}${value.charAt(value.length - 1)}
        `;
    } else {
      return ''
    }
  }
}
