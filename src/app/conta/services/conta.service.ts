import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Conta } from '../model/conta.model';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/contas';
  private readonly fallbackContas: Conta[] = [
    { id: 1, descricao: 'Conta principal' },
    { id: 2, descricao: 'Conta de energia' },
  ];

  listar(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.apiUrl).pipe(
      catchError(() => of([...this.fallbackContas])),
    );
  }

  salvar(conta: Conta): Observable<Conta> {
    const payload: Conta = {
      ...conta,
      descricao: conta.descricao.trim(),
    };

    const request$ = payload.id
      ? this.http.put<Conta>(`${this.apiUrl}/${payload.id}`, payload)
      : this.http.post<Conta>(this.apiUrl, payload);

    return request$.pipe(
      catchError(() => {
        const contas = [...this.fallbackContas];

        if (payload.id) {
          const indice = contas.findIndex((item) => item.id === payload.id);

          if (indice >= 0) {
            contas[indice] = payload;
          } else {
            contas.push(payload);
          }

          this.atualizarFallback(contas);
          return of(payload);
        }

        const novoId = Math.max(0, ...contas.map((item) => item.id ?? 0)) + 1;
        const novaConta = { ...payload, id: novoId };

        contas.push(novaConta);
        this.atualizarFallback(contas);

        return of(novaConta);
      }),
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        const contas = this.fallbackContas.filter((item) => item.id !== id);
        this.atualizarFallback(contas);
        return of(undefined);
      }),
    );
  }

  private atualizarFallback(contas: Conta[]): void {
    this.fallbackContas.splice(0, this.fallbackContas.length, ...contas);
  }
}
