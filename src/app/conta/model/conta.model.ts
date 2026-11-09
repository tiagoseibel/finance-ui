export interface Conta {
  id?: number;
  descricao: string;
}

export type ContaFormValue = {
  id: number | null;
  descricao: string;
};
