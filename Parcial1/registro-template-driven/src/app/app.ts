import { Component } from '@angular/core';
import { Registro } from './registro';

@Component({
  imports: [Registro],
  selector: 'app-root',
  template: '<app-registro />'
})
export class App {}
