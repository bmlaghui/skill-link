import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpecialCharacters',
  standalone: true
})
export class RemoveSpecialCharactersPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value; // If the input value is null, undefined, or empty, return it as it is
    value = value.replace(/[-_]/g, ' '); // Replace hyphens and underscores with spaces
    //Upercase the first letter of each word
    return value.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

}
