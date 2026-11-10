# Ferramentas

Conjunto de ferramentas de topografia e georreferenciamento, publicado como um único site no GitHub Pages.

| Pasta | O que é | Onde ficam os dados |
|---|---|---|
| `projetos/` | Controle de projetos e clientes, com ID e nome de pasta automáticos | Planilha Google (via Apps Script) |
| `ppp/` | Ajuste PPP: corrige pontos NTRIP com a coordenada PPP-IBGE da base | Só no navegador |
| `areas/` | Cálculo de áreas: matrícula x parcelas certificadas | Só no navegador |

## Estrutura

```
index.html            índice geral (um cartão por ferramenta)
assets/
  comum.css           cores, fontes, cabeçalho e botões de TODAS as ferramentas
  comum.js            botão de tema claro/escuro
  favicon.svg
projetos/index.html
ppp/index.html
areas/index.html
_modelo/index.html    ponto de partida para ferramentas novas (não é publicado)
```

Cada ferramenta é **um arquivo único** dentro da sua pasta e carrega o `assets/comum.css`.
Para mudar uma cor, a fonte ou o cabeçalho em todas de uma vez, edite só o `assets/comum.css`.

## Publicar no GitHub Pages

1. Em https://github.com/new crie um repositório (por exemplo `ferramentas`).
2. Na página do repositório: **Add file > Upload files** e arraste **o conteúdo** desta pasta
   (as pastas `assets`, `projetos`, `ppp`, `areas`, `_modelo` e o `index.html`). Clique em **Commit changes**.
   - Se o navegador não aceitar arrastar pastas, use o GitHub Desktop ou `git`:
     ```
     git init && git add . && git commit -m "Ferramentas"
     git branch -M main
     git remote add origin https://github.com/USUARIO/ferramentas.git
     git push -u origin main
     ```
3. **Settings > Pages > Build and deployment**: *Source* = **Deploy from a branch**, branch **main**, pasta **/ (root)**. Salve.
4. Em um ou dois minutos o site abre em `https://USUARIO.github.io/ferramentas/`.

Os links entre as páginas são relativos, então funcionam igual em `usuario.github.io/ferramentas/`
e em um domínio próprio, se você configurar um depois.

### Se os três arquivos já estavam publicados em outros repositórios

Os endereços antigos continuam funcionando enquanto os repositórios antigos existirem. Para
redirecionar quem já tem o link salvo, troque o `index.html` do repositório antigo por:

```html
<meta http-equiv="refresh" content="0; url=https://USUARIO.github.io/ferramentas/projetos/">
```

## Adicionar uma ferramenta nova

1. Copie a pasta `_modelo` e renomeie (ex.: `coordenadas`).
2. Edite `coordenadas/index.html`: título, descrição e o conteúdo. Mantenha o cabeçalho e os links
   `../assets/...`. Use as variáveis de `comum.css` (`var(--surface)`, `var(--ink)`, `var(--accent)`...)
   e **nunca cores fixas** (`#fff`, `#333`), senão o tema escuro quebra.
3. No `index.html` da raiz, copie um bloco `<li class="card">...</li>`, troque o link para `coordenadas/`,
   o título, o resumo e os chips.
4. Faça o commit. Pronto.

## Atenção: segurança do Controle de projetos

A URL do Apps Script (`API_URL`, no início do script de `projetos/index.html`) fica visível no código
da página. Se a implantação estiver como **"Qualquer pessoa"**, quem tiver essa URL consegue **ler e
alterar** a planilha (nomes de clientes, imóveis, matrículas). Se o repositório for público, na prática
a planilha é pública. Opções, da mais simples à mais forte:

- **Não colocar dados sensíveis** na planilha (usar só códigos, sem nome completo de cliente).
- **Gerar uma nova implantação** do Apps Script (a URL muda) se a antiga já foi exposta, e não publicar a nova em repositório público.
- **Hospedar atrás de login**: repositório privado com GitHub Pages (exige plano pago), ou Cloudflare Access / Netlify com senha.
- **Restringir o Apps Script** a contas Google da sua organização e fazer o login no site (exige mudança no `Code.gs` e na página).
