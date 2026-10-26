import { Routes } from '@angular/router';
import { Pagina1 } from './pagina1/pagina1';
import { Conta } from './conta/conta';

export const routes: Routes = [
    {
        path: 'pagina1',
        component: Pagina1
    },
    {
        path: 'conta',
        component: Conta
    }
];
