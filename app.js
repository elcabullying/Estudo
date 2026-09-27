// ==========================================
// PERSISTÊNCIA E ESTADO (QUÍMICA ORGÂNICA II - UFCG)
// ==========================================
const STORAGE_KEY = "quimica_organica2_ufcg_state";
const MATRIX_STORAGE_KEY = "organica2_aulas_estado";
const SIMULADOS_STORAGE_KEY = "organica2_simulados_revisao";

let userState = {
  checklistData: {},
  matrixData: {},
  cronogramaData: {},
  revisaoData: [],
  simuladosRevisao: [], 
  tempoFocoTotal: 0,
  pomodoroConfig: { foco: 25, pausa: 5 },
  sessoesDiagnostico: [],
  diagnosticoAtual: null,
  cronogramaAtual: null
};

// ==========================================
// 70 FRASES MOTIVACIONAIS DIÁRIAS
// ==========================================
const frasesMotivacionais = [
  "A química orgânica não é apenas memorização, é a compreensão das transformações moleculares.",
  "Cada mecanismo de reação compreendido é um degrau a mais rumo à aprovação e ao domínio da ciência.",
  "A persistência é o catalisador que transforma o esforço diário em resultados extraordinários.",
  "Estudar com propósito hoje garante a excelência científica de amanhã.",
  "Grandes conquistas na ciência exigem consistência, paciência e foco absoluto.",
  "Quebre problemas complexos em etapas simples, assim como uma síntese orgânica passo a passo.",
  "O conhecimento sólido é construído com dedicação constante, dia após dia.",
  "Não espere o momento perfeito; crie condições favoráveis com seu estudo diário.",
  "A disciplina diária supera em muito a inspiração ocasional.",
  "Sua dedicação acadêmica hoje é o alicerce da sua carreira profissional de amanhã.",
  "Compreender a estrutura de uma molécula é decifrar a própria linguagem da natureza.",
  "Errar faz parte do aprendizado; cada erro corrigido fortalece o raciocínio científico.",
  "Mantenha a mente aberta e os estudos em dia; os resultados virão naturalmente.",
  "O sucesso nos estudos é a soma de pequenos esforços repetidos diariamente.",
  "A cada ciclo concluído, você está mais próximo do seu objetivo acadêmico.",
  "A curiosidade científica é a centelha que acende a verdadeira inovação.",
  "Concentre-se no processo de aprendizagem e os resultados refletirão o seu esforço.",
  "A prática constante dos exercícios é a chave para fixar os conceitos mais complexos.",
  "Dormir bem, estudar com foco e revisar com estratégia formam a tríade do sucesso acadêmico.",
  "Sua capacidade de aprender e evoluir cientificamente é ilimitada quando há constância.",
  "A perseverança é o segredo de todos os grandes pesquisadores e estudantes de destaque.",
  "Encare cada desafio de química orgânica como um quebra-cabeça fascinante a ser resolvido.",
  "A clareza mental surge quando organizamos nossa rotina de estudos com carinho e método.",
  "Acredite no seu potencial analítico; você é perfeitamente capaz de dominar esta disciplina.",
  "Transforme a dificuldade de hoje no aprendizado e na vitória de amanhã.",
  "O estudo focado é o investimento mais seguro que você pode fazer no seu futuro.",
  "Valorize cada minuto dedicado aos seus livros e anotações; nada disso é em vão.",
  "A harmonia entre teoria e prática consolida o verdadeiro conhecimento científico.",
  "Mantenha o ritmo constante: nem devagar demais que estagne, nem rápido demais que comprometa a base.",
  "A excelência acadêmica não é um ato isolado, mas sim um hábito cultivado diariamente.",
  "Cada reação química estudada revela um pedacinho fascinante de como o universo funciona.",
  "O foco de hoje blinda sua autoconfiança para as avaliações do futuro.",
  "Celebre cada pequena vitória e cada conceito novo compreendido com sucesso.",
  "A dedicação silencia qualquer dúvida e abre caminho para a verdadeira realização.",
  "Seu esforço atual molda a profissional brilhante e competente que você está se tornando.",
  "A mente que se abre a uma nova ideia científica jamais retoma o seu tamanho original.",
  "Estudar ciência é um ato de coragem e curiosidade constante perante o desconhecido.",
  "Mantenha a firmeza de propósitos mesmo nos dias em que o cansaço tentar falar mais alto.",
  "O sucesso acadêmico pertence àqueles que nunca desistem de tentar compreender a fundo.",
  "A organização do tempo é o melhor aliado de quem busca excelência e tranquilidade.",
  "Respire fundo, reorganize suas metas diárias e siga em frente com coragem e foco.",
  "A teoria bem compreendida torna qualquer questão de prova simples e acessível.",
  "Valorize sua trajetória: cada hora de estudo é um tijolinho na construção dos seus sonhos.",
  "A constância nos estudos é o superpoder silencioso que garante notas excelentes.",
  "O aprendizado profundo exige pausas estratégicas e dedicação sem pressa.",
  "Sua jornada na biotecnologia e nas ciências exatas é cheia de significado e impacto.",
  "A dedicação de hoje floresce na forma de autonomia intelectual amanhã.",
  "Permita-se aprender no seu próprio ritmo, mantendo sempre o compromisso com o progresso.",
  "A clareza dos conceitos substitui a necessidade de decorar fórmulas mecanicamente.",
  "Cada folha de caderno preenchida é um passo firme rumo à sua formatura.",
  "O conhecimento liberta, capacita e transforma realidades ao nosso redor.",
  "Encontre satisfação na resolução de cada exercício difícil; é aí que o crescimento acontece.",
  "A consistência é o motor que move qualquer estudante rumo aos mais altos patamares.",
  "Seu empenho na universidade é o reflexo direto do seu comprometimento com o futuro.",
  "Mantenha o foco nos seus objetivos acadêmicos e reduza as distrações desnecessárias.",
  "A curiosidade científica transforma leituras densas em descobertas fascinantes.",
  "O planejamento semanal organizado elimina a ansiedade e otimiza o seu precioso tempo.",
  "A cada dia, uma nova oportunidade de aprender algo profundamente transformador.",
  "A persistência diante de uma matéria complexa é a marca registrada dos vencedores.",
  "Confie no seu método de estudo e continue avançando com firmeza e constância.",
  "O saber adquirido ninguém consegue tirar de você; é o seu maior patrimônio.",
  "Estudar com dedicação é uma forma de respeito e carinho consigo mesma e com seus sonhos.",
  "A ciência recompensa aqueles que cultivam a paciência e a atenção aos detalhes.",
  "Com metas claras e atitudes consistentes, não há prova impossível de ser vencida.",
  "O sucesso é construído nos bastidores, nas horas silenciosas de estudo concentrado.",
  "Aproveite cada desafio acadêmico para expandir ainda mais seus horizontes intelectuais.",
  "Sua determinação é a força motriz que dá vida a todos os seus projetos e planos.",
  "A rotina de estudos bem estruturada traz leveza e clareza para a sua semana.",
  "Aprofundar-se nos detalhes moleculares é compreender a elegância perfeita da vida.",
  "Você está exatamente onde precisa estar para construir um futuro brilhante e inspirador."
];

function obterFraseDoDia() {
  const agora = new Date();
  const inicioAno = new Date(agora.getFullYear(), 0, 0);
  const diff = agora - inicioAno;
  const umDia = 1000 * 60 * 60 * 24;
  const diaDoAno = Math.floor(diff / umDia);
  const indice = diaDoAno % frasesMotivacionais.length;
  return frasesMotivacionais[indice];
}

document.addEventListener('DOMContentLoaded', async () => {
  // Solicita ao navegador permissão de armazenamento persistente (evita limpeza automática)
  await requestPersistentStorage();

  initSidebarControls();
  loadLocalState();
  initChecklistModule();
  initMatrixModule();
  initCronometroModule();
  initCronogramaModule();
  initRevisaoModule();
  initBackupModule();
  updateDashboardUI();

  // Atualiza a frase do dia na interface caso o elemento exista
  const elFrase = document.getElementById('frase-do-dia');
  if (elFrase) {
    elFrase.textContent = obterFraseDoDia();
  }

  if (typeof renderizarTudo === 'function') {
    renderizarTudo();
  }
});

// ==========================================
// SOLICITAÇÃO DE PERSISTÊNCIA DO NAVEGADOR
// ==========================================
async function requestPersistentStorage() {
  if (navigator.storage && navigator.storage.persist) {
    const isPersisted = await navigator.storage.persisted();
    if (!isPersisted) {
      await navigator.storage.persist();
    }
  }
}

// ==========================================
// CARREGAMENTO E SALVAMENTO DE ESTADO
// ==========================================
function loadLocalState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        userState = { ...userState, ...parsed };
      }
    } catch (e) {
      console.error("Erro ao carregar o estado principal:", e);
    }
  }

  // Sincroniza dados específicos da matriz
  const savedMatrix = localStorage.getItem(MATRIX_STORAGE_KEY);
  if (savedMatrix) {
    try {
      const parsedMatrix = JSON.parse(savedMatrix);
      if (parsedMatrix && typeof parsedMatrix === 'object') {
        userState.matrixData = { ...userState.matrixData, ...parsedMatrix };
      }
    } catch (e) {
      console.error("Erro ao carregar os dados da matriz:", e);
    }
  }

  // Sincronização robusta e permanente do histórico de revisões e simulados
  try {
    const savedSimulados = localStorage.getItem(SIMULADOS_STORAGE_KEY);
    if (savedSimulados) {
      const parsedSimulados = JSON.parse(savedSimulados);
      if (Array.isArray(parsedSimulados) && parsedSimulados.length > 0) {
        userState.simuladosRevisao = parsedSimulados;
      }
    }
    
    // Se o userState possui dados que não estão no storage isolado, consolida
    if ((!userState.simuladosRevisao || userState.simuladosRevisao.length === 0) && savedSimulados) {
      userState.simuladosRevisao = JSON.parse(savedSimulados);
    } else if (userState.simuladosRevisao && userState.simuladosRevisao.length > 0) {
      localStorage.setItem(SIMULADOS_STORAGE_KEY, JSON.stringify(userState.simuladosRevisao));
    }
  } catch (e) {
    console.error("Erro ao carregar histórico de revisões:", e);
  }
}

function saveLocalState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
    localStorage.setItem(MATRIX_STORAGE_KEY, JSON.stringify(userState.matrixData));
    
    if (userState.simuladosRevisao && Array.isArray(userState.simuladosRevisao)) {
      localStorage.setItem(SIMULADOS_STORAGE_KEY, JSON.stringify(userState.simuladosRevisao));
    }
  } catch (e) {
    console.error("Erro ao salvar o estado no localStorage:", e);
  }
}

// Funções globais utilitárias para sincronização direta do histórico na página de revisão
window.carregarHistoricoRevisaoGlobal = function() {
  try {
    const data = localStorage.getItem(SIMULADOS_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        userState.simuladosRevisao = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.error("Erro ao carregar histórico global:", e);
  }
  return userState.simuladosRevisao || [];
};

window.salvarHistoricoRevisaoGlobal = function(novoHistorico) {
  if (Array.isArray(novoHistorico)) {
    userState.simuladosRevisao = novoHistorico;
  } else if (novoHistorico) {
    userState.simuladosRevisao.push(novoHistorico);
  }
  saveLocalState();
};

// Função auxiliar global chamada nas rotinas de salvamento
async function saveDataToCloud() {
  saveLocalState();
}

// ==========================================
// MÓDULO DE BACKUP (EXPORTAÇÃO E IMPORTAÇÃO)
// ==========================================
function initBackupModule() {
  const btnExport = document.getElementById('btn-export-backup');
  const inputImport = document.getElementById('input-import-backup');

  if (btnExport) {
    btnExport.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userState, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `backup_organica2_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  if (inputImport) {
    inputImport.addEventListener('change', (e) => {
      const fileReader = new FileReader();
      const file = e.target.files[0];
      if (!file) return;

      fileReader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          if (importedData && typeof importedData === 'object') {
            userState = { ...userState, ...importedData };
            saveLocalState();
            alert("Backup restaurado com sucesso! A página será recarregada.");
            window.location.reload();
          } else {
            alert("Arquivo de backup inválido.");
          }
        } catch (err) {
          alert("Erro ao ler o arquivo de backup.");
        }
      };
      fileReader.readAsText(file);
    });
  }
}

// ==========================================
// CONTROLE DA SIDEBAR RESPONSIVA
// ==========================================
function initSidebarControls() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const btnOpen = document.getElementById('open-sidebar');
  const btnClose = document.getElementById('close-sidebar');

  if (btnOpen && sidebar && overlay) {
    btnOpen.addEventListener('click', () => {
      sidebar.classList.add('open');
      overlay.classList.add('active');
    });
  }

  function closeSidebar() {
    if (sidebar && overlay) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  }

  if (btnClose) btnClose.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
}

// ==========================================
// MÓDULO MATRIZ DE CONTEÚDOS
// ==========================================
function initMatrixModule() {
  const matrixChecks = document.querySelectorAll('.matrix-check');
  if (matrixChecks.length > 0) {
    matrixChecks.forEach(check => {
      check.checked = !!userState.matrixData[check.id];
      updateRowUI(check);

      check.addEventListener('change', (e) => {
        userState.matrixData[e.target.id] = e.target.checked;
        saveLocalState();
        updateRowUI(e.target);
        updateDashboardUI();
      });
    });
  }
  updateAllProgress();
}

function updateRowUI(checkbox) {
  const row = checkbox.closest('tr') || checkbox.closest('.topic-item');
  if (!row) return;
  const rowCheckboxes = row.querySelectorAll('.matrix-check, .chk-item');
  const allChecked = rowCheckboxes.length > 0 && Array.from(rowCheckboxes).every(c => c.checked);

  if (allChecked) {
    row.classList.add('topic-done');
  } else {
    row.classList.remove('topic-done');
  }
  updateAllProgress();
}

function updateAllProgress() {
  const disciplineBlocks = document.querySelectorAll('.discipline-block');
  disciplineBlocks.forEach(block => {
    const blockChecks = block.querySelectorAll('.matrix-check, .chk-item');
    const blockTotal = blockChecks.length;
    let blockChecked = 0;

    blockChecks.forEach(bc => {
      if (bc.checked) blockChecked++;
    });

    const disciplineId = block.getAttribute('data-discipline-id');
    if (disciplineId) {
      const progressTextEl = document.getElementById(`prog-${disciplineId}`);
      if (progressTextEl) {
        const pct = blockTotal > 0 ? Math.round((blockChecked / blockTotal) * 100) : 0;
        progressTextEl.innerText = `${pct}% concluído`;
      }
    }
  });
}

// ==========================================
// MÓDULO CHECKLIST QUALITATIVO
// ==========================================
function initChecklistModule() {
  const checkboxes = document.querySelectorAll('.chk-item');
  if (checkboxes.length === 0) return;

  checkboxes.forEach(chk => {
    chk.checked = !!userState.checklistData[chk.id];
    updateRowUI(chk);

    chk.addEventListener('change', (e) => {
      userState.checklistData[e.target.id] = e.target.checked;
      saveLocalState();
      updateRowUI(e.target);
      updateDashboardUI();
    });
  });
}

// ==========================================
// MÓDULO CRONÔMETRO E POMODORO
// ==========================================
let timerInterval = null;
let seconds = 0;

function initCronometroModule() {
  const display = document.getElementById('timer-display');
  if (!display) return;

  const btnStart = document.getElementById('btn-start');
  const btnPause = document.getElementById('btn-pause');
  const btnReset = document.getElementById('btn-reset');

  btnStart?.addEventListener('click', () => {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
      seconds++;
      userState.tempoFocoTotal += 1 / 60;
      saveLocalState();
      updateDisplay();
    }, 1000);
  });

  btnPause?.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
  });

  btnReset?.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    updateDisplay();
  });

  function updateDisplay() {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    display.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}

// ==========================================
// MÓDULO CRONOGRAMA E REVISÃO
// ==========================================
function initCronogramaModule() {
  const inputs = document.querySelectorAll('.cronograma-input');
  inputs.forEach(input => {
    if (userState.cronogramaData[input.id]) {
      input.value = userState.cronogramaData[input.id];
    }
    input.addEventListener('change', (e) => {
      userState.cronogramaData[e.target.id] = e.target.value;
      saveLocalState();
    });
  });
}

function initRevisaoModule() {
  // Lógica de inicialização de revisões, se houver elementos dedicados no app principal
}

function updateDashboardUI() {
  const progressoTexto = document.getElementById('progresso-texto') || document.getElementById('global-progress-percent');
  const tempoFocoTotal = document.getElementById('tempo-foco-total');
  const concluidosCountEl = document.getElementById('concluidos-count') || document.getElementById('global-topics-count');

  const checklistItems = document.querySelectorAll('.chk-item');
  const matrixChecks = document.querySelectorAll('.matrix-check');
  const allChecks = checklistItems.length > 0 ? checklistItems : matrixChecks;
  const dataSource = checklistItems.length > 0 ? userState.checklistData : userState.matrixData;

  if (allChecks.length > 0) {
    const total = allChecks.length;
    const checked = Object.values(dataSource).filter(Boolean).length;
    
    if (concluidosCountEl) concluidosCountEl.textContent = `${checked} / ${total}`;
    if (progressoTexto) {
      const pct = Math.round((checked / total) * 100);
      progressoTexto.textContent = `${pct}%`;
    }
  }

  if (tempoFocoTotal) {
    tempoFocoTotal.textContent = `${Math.round(userState.tempoFocoTotal || 0)} min`;
  }
}