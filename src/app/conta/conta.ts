import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Conta as ContaModel, ContaFormValue } from './model/conta.model';
import { ContaService } from './services/conta.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-conta',
  styleUrl: './conta.css',
  templateUrl: './conta.html',
})
export class Conta implements OnInit {
  private readonly contaService = inject(ContaService);

  readonly contas = signal<ContaModel[]>([]);
  readonly contaSelecionada = signal<ContaModel | null>(null);
  readonly modoDetalhe = signal(false);
  readonly totalContas = computed(() => this.contas().length);

  readonly form = new FormGroup({
    id: new FormControl<number | null>(null),
    descricao: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
  });

  ngOnInit(): void {
    this.carregarContas();
  }

  carregarContas(): void {
    this.contaService.listar().subscribe({
      next: (contas) => {
        this.contas.set(contas);
      },
      error: () => {
        this.contas.set([]);
      },
    });
  }

  selecionarConta(conta: ContaModel): void {
    this.contaSelecionada.set(conta);
    this.modoDetalhe.set(true);
    this.form.reset({
      id: conta.id ?? null,
      descricao: conta.descricao ?? '',
    });
  }

  novaConta(): void {
    this.contaSelecionada.set(null);
    this.modoDetalhe.set(true);
    this.form.reset({
      id: null,
      descricao: '',
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as ContaFormValue;
    const conta: ContaModel = {
      id: payload.id ?? undefined,
      descricao: payload.descricao.trim(),
    };

    this.contaService.salvar(conta).subscribe({
      next: (contaSalva) => {
        const contasAtualizadas = [...this.contas()];
        const indice = contasAtualizadas.findIndex((item) => item.id === contaSalva.id);

        if (indice >= 0) {
          contasAtualizadas[indice] = contaSalva;
        } else {
          contasAtualizadas.push(contaSalva);
        }

        this.contas.set(contasAtualizadas);
        this.contaSelecionada.set(contaSalva);
        this.modoDetalhe.set(true);
        this.form.reset({
          id: contaSalva.id ?? null,
          descricao: contaSalva.descricao,
        });
      },
    });
  }

  excluir(): void {
    const contaSelecionada = this.contaSelecionada();
    const contaId = contaSelecionada?.id;

    if (!contaId) {
      return;
    }

    this.contaService.excluir(contaId).subscribe({
      next: () => {
        this.contas.set(this.contas().filter((conta) => conta.id !== contaId));
        this.contaSelecionada.set(null);
        this.modoDetalhe.set(false);
        this.form.reset({
          id: null,
          descricao: '',
        });
      },
    });
  }

  cancelar(): void {
    const contaAtual = this.contaSelecionada();

    if (contaAtual) {
      this.selecionarConta(contaAtual);
      return;
    }

    this.modoDetalhe.set(false);
    this.form.reset({
      id: null,
      descricao: '',
    });
  }
}
