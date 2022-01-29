import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hash'
})
export class HashPipe implements PipeTransform {

  transform(value: string): string {
    const element = value.split('#');
    return element ? element[1] : value;
  }

}
