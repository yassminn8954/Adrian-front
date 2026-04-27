### 1. Funcionalidades principais

1. Gerenciar a biblioteca de livros
   - Visualizar livros em cards com título, autor, categoria e avaliação.
   - Acessar detalhes completos de cada livro pela rota `/book/:id`.

2. Pesquisar e adicionar livros à biblioteca
   - Pesquisar livros por título ou autor para encontrar e adicionar à biblioteca pessoal.
   - Ao adicionar, o usuário atribui indicações pessoais: categoria, avaliação (0-5 estrelas) e resenha opcional.
   - Editar as indicações do livro na tela de detalhes e excluir livros da biblioteca.

3. Filtrar, buscar e organizar livros
   - Buscar livros por título ou autor em tempo real.
   - Filtrar livros por categoria.
   - Mover livros entre categorias usando drag and drop.

### 2. Regras de negócio

- Os livros são armazenados em banco para persistência entre sessões.
- A pesquisa de livros permite encontrar títulos existentes para adicionar à biblioteca própria.
- Ao adicionar um livro, o usuário deve atribuir:
  - categoria (obrigatória)
  - avaliação (opcional, 0-5 estrelas)
  - resenha (opcional)
- Os dados básicos do livro (título, autor, capa, sinopse) vêm da pesquisa e não são editáveis pelo usuário.
- A busca local é case-insensitive e filtra por título ou autor dentro da biblioteca.
- A mudança de categoria por drag and drop atualiza imediatamente o estado e o `localStorage`.
- A exclusão de livro exige confirmação do usuário.

### 3. Camadas do sistema

- Model
  - `src/app/types/book.ts`: definição do tipo `Book` e categorias.
  - `src/app/lib/mockBooks.ts`: dados iniciais de livros.

- Service / Persistência
  - `localStorage` usado em `src/app/pages/Home.tsx` e `src/app/pages/BookDetails.tsx` para carregar e salvar livros.
  - Lógica de filtros, estatísticas e atualização de categorias no `Home`.

- Controller / Lógica de interação
  - `src/app/pages/Home.tsx`: handlers para adicionar livro, buscar, filtrar e mover livros.
  - `src/app/pages/BookDetails.tsx`: handlers para editar, salvar e excluir livro.
  - `src/app/components/AddBookModal.tsx`: formulário de cadastro de livro.

- Route
  - `src/app/routes.tsx`: rotas da aplicação.
    - `/` → `Home`
    - `/book/:id` → `BookDetails`

## 4. Funcionalidades e Testes

- Funcionalidade 1: Visualizar e gerenciar livros
Descrição: Permite ao usuário visualizar livros em cards e acessar detalhes completos de cada livro.

Regras de negócio:
- Livros são exibidos em grid com título, autor, categoria e avaliação.
- Acesso a detalhes via rota `/book/:id`.
- Dados básicos (título, autor, capa, sinopse) são somente leitura.
- Indicações pessoais (categoria, avaliação, resenha) podem ser editadas.

Casos de teste:
1. Teste positivo (Unitário): Verificar se o componente `BookCard` renderiza corretamente um livro com todos os campos preenchidos.
2. Teste negativo (Integração): Tentar acessar detalhes de um livro inexistente deve redirecionar ou mostrar mensagem de erro.

- Funcionalidade 2: Adicionar livros à biblioteca
Descrição: Permite pesquisar livros e adicioná-los à biblioteca com indicações pessoais.

Regras de negócio:
- Pesquisa por título ou autor para encontrar livros.
- Ao adicionar, categoria é obrigatória; avaliação e resenha são opcionais.
- Dados básicos vêm da pesquisa e não são editáveis.
- Livro é salvo com datas de: inserção, edição, exclusão.

Casos de teste:
1. Teste positivo (Integração): Adicionar um livro válido com categoria obrigatória deve salvar e atualizar a lista.
2. Teste negativo (Unitário): Tentar adicionar livro sem categoria deve falhar na validação do formulário.

- Funcionalidade 3: Buscar, filtrar e organizar livros
Descrição: Permite buscar livros na biblioteca, filtrar por categoria e mover entre categorias via drag and drop.

Regras de negócio:
- Busca é case-insensitive por título ou autor.
- Filtros por categoria (lidos, comprados, etc.).
- Drag and drop atualiza categoria imediatamente e salva no `localStorage`.
- Estatísticas são calculadas dinamicamente (total, lidos, etc.).

Casos de teste:
1. Teste positivo (E2E): Buscar por título existente deve filtrar corretamente a lista de livros exibidos.
2. Teste negativo (Integração): Arrastar livro para categoria inválida deve reverter a mudança ou mostrar erro.


