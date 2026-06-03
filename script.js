/* =========================================================
   RoboGreen — script.js
   Funcionalidades:
   - Menu hambúrguer
   - Dark/Light mode com localStorage
   - Render dinâmico do Feed de Notícias
   - Animações de scroll reveal
   - Smooth scroll (CSS) + back-to-top
   - Contadores animados de estatísticas
   - Quiz interativo
   ========================================================= */

(() => {
  'use strict';

  /* ---------- 1. ELEMENTOS PRINCIPAIS ---------- */
  const header        = document.getElementById('header');
  const hamburger     = document.getElementById('hamburger');
  const nav           = document.getElementById('nav');
  const themeToggle   = document.getElementById('themeToggle');
  const backToTop     = document.getElementById('backToTop');
  const newsGrid      = document.getElementById('newsGrid');
  const yearEl        = document.getElementById('year');

  /* Ano dinâmico no footer */
  yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. MENU HAMBÚRGUER ---------- */
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  /* Fecha o menu ao clicar em um link (mobile) */
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 3. DARK / LIGHT MODE ---------- */
  const THEME_KEY = 'robogreen-theme';
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem(THEME_KEY, 'light');
    }
  });

  /* ---------- 4. HEADER SCROLL & BACK-TO-TOP ---------- */
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 30);
    backToTop.classList.toggle('visible', y > 500);
    updateActiveNav();
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Destaque do link de navegação ativo */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  function updateActiveNav() {
    const pos = window.scrollY + 120;
    sections.forEach(sec => {
      if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id));
      }
    });
  }

  /* ---------- 5. SCROLL REVEAL (IntersectionObserver) ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- 6. CONTADORES ANIMADOS ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // easing easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- 7. FEED DE NOTÍCIAS (Mock Data) ---------- */
  const newsData = [
{
  tag: "Agricultura",
  date: "2026",
  title: "Drones agrícolas ajudam a economizar água e reduzir emissões",
  excerpt: "Relatórios internacionais mostram que drones agrícolas estão contribuindo para maior eficiência hídrica e redução da pegada de carbono."
},

{
  tag: "Reciclagem",
  date: "2025",
  title: "Robôs com IA melhoram a separação de resíduos recicláveis",
  excerpt: "Sistemas de visão computacional aumentam a eficiência da reciclagem e reduzem perdas de materiais."
},

{
  tag: "Sustentabilidade",
  date: "2025",
  title: "Automação industrial reduz desperdícios de energia",
  excerpt: "Sensores inteligentes permitem monitoramento contínuo do consumo energético em fábricas."
},

{
  tag: "Agricultura",
  date: "2025",
  title: "Robôs agrícolas reduzem uso de defensivos",
  excerpt: "Equipamentos identificam ervas daninhas e aplicam defensivos apenas onde necessário."
},

{
  tag: "Monitoramento",
  date: "2025",
  title: "Sensores inteligentes ajudam a monitorar rios e florestas",
  excerpt: "Tecnologias IoT fornecem dados ambientais em tempo real para pesquisadores."
},

{
  tag: "Pesquisa",
  date: "2025",
  title: "IA auxilia projetos de reciclagem e economia circular",
  excerpt: "Novas pesquisas mostram ganhos na recuperação de materiais através de inteligência artificial."
}
];

  /* Ícones SVG para cada categoria */
  const icons = {
    drop:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.5l5 7a6 6 0 1 1-10 0l5-7z"/></svg>',
    drone:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>',
    recycle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 19h10M5 12l3-5M19 12l-3-5M9 19l-4-7M15 19l4-7"/></svg>',
    sensor:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12a10 10 0 0 1 20 0M6 12a6 6 0 0 1 12 0M10 12a2 2 0 1 1 4 0"/></svg>',
    energy:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>',
    ocean:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/></svg>',
    fire:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2s4 4 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3s0 2 2 2c0-3-3-4-3-8 2 0 4 0 4 0z"/></svg>',
    plant:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22V12M12 12c0-4 4-6 8-6 0 4-2 8-8 8zM12 12c0-3-3-5-7-5 0 4 2 7 7 7z"/></svg>'
  };

  /* Renderiza os cartões */
  function renderNews() {
    const html = newsData.map(n => `
      <article class="news-card reveal">
        <div class="news-card__img">${icons[n.icon] || icons.sensor}</div>
        <div class="news-card__body">
          <div class="news-card__meta">
            <span class="news-card__tag">${n.tag}</span>
            <span class="news-card__date">${n.date}</span>
          </div>
          <h3 class="news-card__title">${n.title}</h3>
          <p class="news-card__excerpt">${n.excerpt}</p>
        </div>
      </article>
    `).join('');
    newsGrid.innerHTML = html;

    /* Observa os cards recém-criados para o reveal */
    newsGrid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }
  renderNews();

  /* ---------- 8. QUIZ INTERATIVO ---------- */
  const quizData = [
    {
      q: 'Qual é a principal vantagem da agricultura de precisão?',
      options: [
        'Aumentar o uso de agrotóxicos',
        'Aplicar recursos apenas onde são realmente necessários',
        'Plantar mais sem monitoramento',
        'Usar tratores maiores e mais pesados'
      ],
      correct: 1,
      explain: 'A agricultura de precisão usa sensores e dados para aplicar água, nutrientes e defensivos somente nos pontos necessários, reduzindo desperdício.'
    },
    {
      q: 'Como os drones contribuem para a preservação ambiental?',
      options: [
        'Substituindo trabalhadores rurais',
        'Sobrevoando áreas para identificar queimadas e desmatamento',
        'Plantando árvores manualmente',
        'Aumentando o consumo de combustível'
      ],
      correct: 1,
      explain: 'Drones com câmeras de alta resolução cobrem grandes áreas rapidamente, identificando queimadas, desmatamento ilegal e degradação ambiental.'
    },
    {
      q: 'Qual recurso natural pode ser economizado com sistemas automatizados de irrigação?',
      options: ['Petróleo', 'Água', 'Carvão', 'Areia'],
      correct: 1,
      explain: 'Sensores de umidade e temperatura controlam a irrigação automaticamente, evitando desperdício de água nas lavouras.'
    },
    {
      q: 'Na indústria, qual é uma aplicação importante dos robôs para o meio ambiente?',
      options: [
        'Aumentar a produção de plástico',
        'Auxiliar na separação e reciclagem de resíduos',
        'Substituir todas as fontes de energia',
        'Eliminar todo o trabalho humano'
      ],
      correct: 1,
      explain: 'Robôs aumentam a eficiência da reciclagem e reduzem a quantidade de lixo enviada para aterros sanitários.'
    },
    {
      q: 'Qual é um dos principais desafios da expansão dessas tecnologias?',
      options: [
        'Excesso de mão de obra',
        'Alto custo inicial dos equipamentos',
        'Falta de aplicações úteis',
        'Incompatibilidade com energia elétrica'
      ],
      correct: 1,
      explain: 'O custo elevado dos equipamentos dificulta o acesso, especialmente para pequenos produtores e empresas.'
    },
    {
      q: 'O que sensores instalados em rios e florestas conseguem fazer?',
      options: [
        'Plantar árvores automaticamente',
        'Coletar dados contínuos sobre temperatura, umidade e poluentes',
        'Capturar peixes e animais',
        'Substituir guardas florestais'
      ],
      correct: 1,
      explain: 'Eles coletam dados continuamente que ajudam pesquisadores e órgãos ambientais a tomar decisões rápidas e eficientes.'
    },
    {
      q: 'Como robôs podem reduzir o uso de agrotóxicos?',
      options: [
        'Aplicando mais defensivos em toda a lavoura',
        'Identificando ervas daninhas e aplicando defensivos apenas nos locais necessários',
        'Substituindo defensivos por adubos químicos',
        'Removendo todas as plantas da lavoura'
      ],
      correct: 1,
      explain: 'Robôs identificam pragas e aplicam defensivos pontualmente, reduzindo a contaminação do solo, da água e dos alimentos.'
    },
    {
      q: 'Como será o futuro da robótica aplicada à sustentabilidade?',
      options: [
        'Fim das tecnologias automatizadas',
        'Fazendas automatizadas, drones de reflorestamento e fábricas com emissão quase zero',
        'Apenas substituição de pessoas',
        'Maior consumo de recursos naturais'
      ],
      correct: 1,
      explain: 'Espera-se um modelo que concilie crescimento econômico e preservação ambiental, com automação cada vez mais sustentável.'
    }
  ];

  const quizBody     = document.getElementById('quizBody');
  const quizProgress = document.getElementById('quizProgress');
  let currentQ = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    answered = false;
    const data = quizData[currentQ];
    quizProgress.style.width = `${(currentQ / quizData.length) * 100}%`;

    quizBody.innerHTML = `
      <div class="quiz__q-num">Pergunta ${currentQ + 1} de ${quizData.length}</div>
      <h3 class="quiz__question">${data.q}</h3>
      <div class="quiz__options">
        ${data.options.map((opt, i) => `
          <button class="quiz__option" data-index="${i}">${opt}</button>
        `).join('')}
      </div>
      <div id="quizFeedback"></div>
    `;

    quizBody.querySelectorAll('.quiz__option').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(btn));
    });
  }

  function handleAnswer(btn) {
    if (answered) return;
    answered = true;

    const idx = parseInt(btn.dataset.index, 10);
    const data = quizData[currentQ];
    const buttons = quizBody.querySelectorAll('.quiz__option');

    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === data.correct) b.classList.add('correct');
      else if (i === idx) b.classList.add('wrong');
    });

    if (idx === data.correct) score++;

    const feedback = document.getElementById('quizFeedback');
    feedback.innerHTML = `
      <div class="quiz__feedback">${data.explain}</div>
      <button class="quiz__next" id="nextBtn">
        ${currentQ === quizData.length - 1 ? 'Ver Resultado' : 'Próxima Pergunta →'}
      </button>
    `;
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
  }

  function nextQuestion() {
    currentQ++;
    if (currentQ >= quizData.length) showResult();
    else renderQuestion();
  }

  function showResult() {
    quizProgress.style.width = '100%';
    const pct = Math.round((score / quizData.length) * 100);
    let msg = '';
    if (pct === 100) msg = '🏆 Perfeito! Você é um expert em robótica sustentável.';
    else if (pct >= 75) msg = '🚀 Excelente! Você domina o tema com maestria.';
    else if (pct >= 50) msg = '🌱 Bom trabalho! Continue explorando o conteúdo.';
    else msg = '💡 Que tal revisar as seções e tentar novamente?';

    quizBody.innerHTML = `
      <div class="quiz__result">
        <div class="quiz__q-num">Resultado Final</div>
        <div class="quiz__score">${score}/${quizData.length}</div>
        <p class="quiz__message">${msg}</p>
        <button class="quiz__next" id="restartBtn">Refazer Quiz</button>
      </div>
    `;
    document.getElementById('restartBtn').addEventListener('click', () => {
      currentQ = 0; score = 0;
      renderQuestion();
    });
  }

  renderQuestion();
})();
