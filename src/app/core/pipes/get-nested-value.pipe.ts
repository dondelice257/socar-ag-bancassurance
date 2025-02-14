import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getNestedValue',
  standalone:true
})
export class GetNestedValuePipe implements PipeTransform {
  transform(object: any, path: string): any {
    if (!object || !path) return null;

    return path.split('.').reduce((acc, key) => acc?.[key], object);
  }
}
