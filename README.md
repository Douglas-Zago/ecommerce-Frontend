**E‑Commerce — Front-end**

Descrição:
Este repositório contém o front-end da aplicação de e‑commerce, desenvolvido com React, TypeScript e Vite. A UI é modular, responsiva e preparada para integração com uma API REST.

**Principais funcionalidades**
- Visualização e listagem de produtos
- Carrinho com gerenciamento de itens e quantidades
- Fluxo básico de checkout (simulação)
- Páginas de administração para CRUD de produtos (pronto para integração)

**Tecnologias**
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

**Estrutura (resumo)**
- `src/components/` — componentes e UI reutilizáveis
- `src/contexts/` — Context API (ex.: `CartContext`)
- `src/pages/` — páginas da aplicação
- `src/services/` — chamadas à API / mocks

**Como executar (PowerShell)**

Pré-requisitos
- Node.js 18+ recomendado

Instalar dependências

```powershell npm install ```

Executar em modo desenvolvimento

```powershell  npm run dev ```

Gerar build de produção

```powershell npm run build ```

Visualizar build (preview)

```powershell npm run preview```

**Variáveis de ambiente**
Crie um arquivo `.env` na raiz com a URL da API (exemplo):

```VITE_API_URL=http://localhost:8080```

No código, use `import.meta.env.VITE_API_URL` para acessar a variável.

**Endpoints (esperados — integração backend)**
- `GET /products` — listar produtos
- `GET /products/:id` — obter detalhes
- `POST /login` — autenticação
- `POST /orders` — criar pedido
- `POST|PUT|DELETE /admin/products` — operações de admin

Licença
- Uso acadêmico / demonstrativo.

Contato
- Douglas Zago — veja o repositório: `https://github.com/Douglas-Zago`
