import { Provider } from '@angular/core';
import { provideAngularSvgIcon } from 'angular-svg-icon';

export function provideNgxECom(): Provider {
  return [provideAngularSvgIcon()];
}
