import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pagina1 } from './pagina1/pagina1';
import { Conta } from './conta/conta';

@Component({
  imports: [RouterOutlet, Pagina1, Conta],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('aula1');
}
