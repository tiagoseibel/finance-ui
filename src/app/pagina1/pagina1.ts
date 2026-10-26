import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-pagina1',
  styleUrl: './pagina1.css',
  templateUrl: './pagina1.html',
})
export class Pagina1 {
  nomeCategoria: string = 'Categoria 1';

  mostrar() {
    alert(this.nomeCategoria);
  }
}
