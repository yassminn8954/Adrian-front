export type BookCategory = 
  | 'lidos'
  | 'comprados'
  | 'querendo-ler'
  | 'interessantes'
  | 'nao-gostei'
  | 'biblioteca-particular';

export interface Book {
  id: string;
  titulo: string;
  autor: string;
  capa: string;
  sinopse: string;
  categoria: BookCategory;
  minhaAvaliacao?: number; // 0-5 estrelas
  minhaResenha?: string;
  dataAdicao: string;
}
