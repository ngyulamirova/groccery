import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nonEmptyElementsLength'
})
export class NonEmptyElementsLengthPipe implements PipeTransform {

  transform(value: any[], params: number): number {
    return value.filter(el => el.title && el.title.split('#')[1]).length;
  }
}
