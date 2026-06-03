# 🤖🌱 RoboGreen — Robótica e Automação na Redução do Impacto Ambiental

Projeto desenvolvido para o **Agrinho 2026**, com o objetivo de mostrar como a **robótica** e a **automação** são aliadas poderosas da **sustentabilidade ambiental** — aplicadas à agricultura de precisão, automação industrial, monitoramento ambiental e reflorestamento.

---

## 🎯 Objetivo

Apresentar, de forma moderna, didática e interativa, como tecnologias automatizadas reduzem desperdícios, economizam recursos naturais e contribuem para um modelo de desenvolvimento sustentável.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico e acessível
- **CSS3** moderno (Flexbox, CSS Grid, Variáveis CSS, Mobile First)
- **JavaScript Vanilla (ES6+)** — sem frameworks
- Fontes Google: **Orbitron** e **Rajdhani**
- Ícones em **SVG inline**

---

## 📁 Estrutura

```
robogreen/
├── index.html
├── style.css
├── script.js
└── README.md
```

Todos os arquivos estão na **raiz**, sem pastas `css/` ou `js/`.

---

## ✨ Funcionalidades Implementadas

- ✅ Header fixo com navegação desktop + **menu hambúrguer** mobile
- ✅ **Dark Mode / Light Mode** com salvamento em `localStorage`
- ✅ **Hero futurista** com orbe animado e contadores estatísticos
- ✅ **Contadores animados** (easeOutExpo) ativados via IntersectionObserver
- ✅ **Scroll Reveal** em todas as seções (fade-in + translateY)
- ✅ **Smooth scroll** entre seções
- ✅ Botão **"Voltar ao Topo"** que aparece ao rolar
- ✅ **Feed de Notícias dinâmico** — 8 cards renderizados via array de objetos
- ✅ **Quiz interativo** com 8 perguntas, feedback explicativo e resultado final
- ✅ Indicador de seção **ativa na navegação** durante o scroll
- ✅ Painel "tech" estilo dashboard com métricas animadas
- ✅ Design **totalmente responsivo** (Mobile First)
- ✅ Acessibilidade: ARIA labels, `prefers-reduced-motion`, contraste no Dark Mode

---

## 🎨 Identidade Visual

Paleta futurista e tecnológica:

| Cor             | Hex       | Uso                          |
| --------------- | --------- | ---------------------------- |
| Azul escuro     | `#060912` | Background principal         |
| Ciano neon      | `#00f0ff` | Destaques, glow, primário    |
| Verde limão     | `#aaff00` | Sustentabilidade, sucesso    |
| Cinza metálico  | `#8a99ad` | Detalhes técnicos            |
| Preto profundo  | `#000`    | Contraste                    |

Efeitos: **glow sutis**, **grid background**, **gradientes**, **animações fluidas**.

---

## 🚀 Como Usar Localmente

1. Baixe ou clone esta pasta.
2. Abra o arquivo `index.html` em qualquer navegador moderno.

Não há dependências, build ou servidor necessários.

```bash
# Opcional — servir localmente
npx serve .
# ou
python -m http.server 8000
```

---

## 🐙 Como Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `robogreen`).
2. Faça upload dos arquivos `index.html`, `style.css`, `script.js` e `README.md` na raiz.
   ```bash
   git init
   git add .
   git commit -m "RoboGreen — site Agrinho 2026"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/robogreen.git
   git push -u origin main
   ```
3. No repositório, vá em **Settings → Pages**.
4. Em **Source**, selecione a branch `main` e a pasta `/ (root)`.
5. Salve. Em alguns segundos seu site estará disponível em:
   `https://SEU-USUARIO.github.io/robogreen/`

---

## 📚 Conteúdo

Baseado no documento *Robótica e Automação na Redução do Impacto Ambiental*, contemplando:

- Introdução ao tema
- Aplicações da robótica na preservação ambiental
- Agricultura de precisão e produção sustentável
- Automação industrial e redução de desperdícios
- Benefícios, desafios e perspectivas futuras
- Feed de notícias / Inovações em tempo real
- Quiz educativo
- Conclusão

---

## 💚 Mensagem

> A tecnologia, quando guiada pela responsabilidade ambiental, deixa de ser apenas uma ferramenta de produção e se torna um caminho para garantir o futuro do planeta.

**Projeto educacional — Agrinho 2026**
