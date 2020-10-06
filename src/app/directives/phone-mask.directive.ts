import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');

    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }


    trimmed = trimmed.replace(/-/g, '');

    const numbers = [];
    numbers.push(trimmed.substr(0, 1));
    if (trimmed.substr(1, 3) !== '') {
      numbers.push(trimmed.substr(1, 3));
    }
    if (trimmed.substr(4, 3) !== '') {
      numbers.push(trimmed.substr(4, 3));
    }
    if (trimmed.substr(7, 4) !== '') {
      numbers.push(trimmed.substr(7, 4));
    }

    input.value = numbers.join('-');
  }
}
