/* ============================================================
   CONTEÚDO E CONFIGURAÇÕES DO PORTFÓLIO
   Para atualizar textos, projetos ou a automação, edite só este arquivo.
   Campos com null aparecem no site como "preencher".
   ============================================================ */

const CONFIG = {
  // Endereço da automação de envio (ex.: https://formspree.io/f/SEU_CODIGO). Vazio = automação desligada.
  automacaoEndpoint: "https://formspree.io/f/xgaallgb",
  // PIN do painel administrativo (acesso: adicionar #admin no endereço do site). Não é segurança real.
  pinAdmin: "admin2026",
  chaveStorage: "portfolio_mensagens"
};

const SOFT_SKILLS = [
  "Organização e responsabilidade", "Criatividade na busca por soluções", "Pensamento lógico e analítico",
  "Curiosidade e vontade de aprender", "Resolução de problemas", "Colaboração e comunicação"
];

const HARD_SKILLS = [
  { tec: "HTML5", faz: "Estruturo páginas com títulos, seções, links, imagens e formulários." },
  { tec: "CSS3", faz: "Aplico cores, espaçamentos, tipografia e organização visual." },
  { tec: "JavaScript", faz: "Crio interações, valido campos e manipulo informações na página." },
  { tec: "Bootstrap", faz: "Uso componentes e classes para adaptar a interface a celular, tablet e computador." },
  { tec: "JSON e LocalStorage", faz: "Organizo dados em JSON e salvo no navegador (usado neste portfólio)." }
];

const AREAS = [
  { titulo: "Matemática",
    relato: "A Matemática tem contribuído para o desenvolvimento do meu raciocínio lógico, principalmente na maneira como analiso problemas e procuro soluções organizadas. Na programação, não basta escrever comandos: preciso entender as condições do problema, identificar os valores envolvidos e definir a sequência correta de operações. Quando um cálculo ou uma condição dá um resultado diferente do esperado, posso analisar cada etapa, verificar os valores e testar correções.",
    pratica: "No jogo Coletor de Estrelas, usei condições e contadores: com 10 pontos aparece “VITÓRIA!” e com 0 vidas aparece “DERROTA!”. Também comparo posições para saber quando o robô encosta em uma estrela ou em um inimigo." },
  { titulo: "Ciências da Natureza",
    relato: "Nas Ciências da Natureza, aprendo a observar fenômenos, formular hipóteses, realizar testes e analisar resultados. Esse método também vale para o software: quando um programa não funciona como esperado, observo o comportamento, levanto possíveis causas e testo uma hipótese de cada vez, comparando o resultado obtido com o esperado.",
    pratica: "Para o robô do jogo não perder as 3 vidas de uma vez ao tocar em um inimigo, criei uma invencibilidade de 1,5 segundo: ele volta ao ponto inicial e pisca durante esse tempo." },
  { titulo: "Ciências Humanas",
    relato: "As Ciências Humanas ampliam minha compreensão sobre as pessoas, a sociedade e as consequências das decisões humanas. Um sistema não deve ser pensado só pelo funcionamento técnico, mas pelas necessidades de quem vai usá-lo: as informações precisam estar organizadas, as instruções precisam ser compreensíveis e a navegação precisa facilitar as tarefas. Também considero privacidade, acessibilidade e uso responsável das informações.",
    pratica: "No sistema da lavanderia, as telas conduzem o cliente com perguntas simples e instruções em passos numerados. No contrato digital do transporte escolar, pensei em famílias que assinam pelo celular ou pelo computador." },
  { titulo: "Linguagens",
    relato: "As disciplinas de Linguagens contribuem para minha capacidade de interpretar instruções, organizar ideias e comunicar informações com clareza. Na programação, preciso entender o que a atividade pede e transformá-lo em etapas que o computador execute. Em páginas web, os textos precisam ser claros, os títulos devem orientar o visitante e os elementos da interface devem comunicar suas funções.",
    pratica: "No jogo, escrevi a instrução na tela (“Setas ou WASD para mover… R reinicia”) e mensagens claras de vitória e derrota, para qualquer pessoa jogar sem explicação." }
];

const TENDENCIAS = [
  { titulo: "Cibersegurança",
    texto: "A cibersegurança reúne práticas e tecnologias utilizadas para proteger computadores, redes, sistemas e dados contra acessos não autorizados e ataques digitais. Entre seus principais objetivos estão preservar a confidencialidade, a integridade e a disponibilidade das informações. Medidas como autenticação, controle de acesso, atualizações de segurança e criptografia ajudam a reduzir riscos e proteger os usuários. A cibersegurança é essencial para o desenvolvimento de aplicações confiáveis e para a proteção da privacidade no ambiente digital." },
  { titulo: "Blockchain",
    texto: "Blockchain é uma tecnologia de registro distribuído que organiza informações em blocos conectados por mecanismos criptográficos. Dependendo de sua implementação, ela permite que diferentes participantes compartilhem e verifiquem registros sem depender de um único controlador central. A tecnologia pode ser utilizada em aplicações como rastreamento de produtos, registros digitais e contratos inteligentes. Sua utilização exige atenção à segurança, à privacidade, à escalabilidade e às características de cada projeto." },
  { titulo: "Automação e Robótica",
    texto: "A automação utiliza sistemas e programas para executar tarefas com pouca ou nenhuma intervenção humana. A robótica envolve o desenvolvimento e o controle de máquinas capazes de realizar atividades físicas. Essas tecnologias são utilizadas na indústria, na logística, na saúde e em diversos outros setores. A programação permite definir instruções, interpretar informações de sensores e controlar ações. Com isso, é possível aumentar a precisão de determinadas tarefas, melhorar processos e reduzir atividades repetitivas." },
  { titulo: "Edge Computing",
    texto: "Edge Computing, ou computação de borda, é um modelo de processamento no qual parte dos dados é processada próxima ao local onde são produzidos, em vez de depender exclusivamente de servidores distantes ou da nuvem. Essa abordagem pode reduzir a latência e melhorar o tempo de resposta de aplicações que precisam funcionar rapidamente. Entre os exemplos estão dispositivos inteligentes, equipamentos industriais, sistemas de monitoramento e aplicações de Internet das Coisas (IoT). A escolha entre processamento local, na borda ou na nuvem depende das necessidades de desempenho, segurança, conectividade e armazenamento de cada aplicação." }
];

const PROJETOS = [
  { titulo: "Sistema de gestão de lavanderia – Lavatech",
    objetivo: "Oferecer suporte às lavanderias locais da região, ajudando no gerenciamento dos estabelecimentos e na resolução de dificuldades operacionais por meio de assistência digital.",
    descricao: "Fluxo de telas com login e cadastro (nome, CPF e telefone), escolha do procedimento (lavagem, secagem ou secagem após lavagem), tela de dúvidas (como desbloquear a máquina, como lavar e secar, quando recolher as roupas) e instruções passo a passo com pagamento no totem.",
    tecnologias: null,
    aprendizado: "Organizar um fluxo de telas pensando em quem usa a lavanderia pela primeira vez.",
    imagens: [{ src: "assets/lavanderia-fluxo.jpg", alt: "Fluxo de telas do sistema de gestão de lavanderia" }],
    repo: null },
  { titulo: "Coletor de Estrelas (jogo)",
    objetivo: "Praticar lógica de programação criando um jogo completo, com pontuação, vidas, inimigos em movimento e regras de vitória e derrota.",
    descricao: "Setas ou WASD movem o robô. Há 12 estrelas no mapa (1 ponto cada) e três inimigos que quicam pelo cenário e pelas paredes. Ao tocar em um inimigo, o robô perde 1 vida, volta ao ponto inicial e fica invencível por 1,5 s. Com 10 pontos aparece “VITÓRIA!”; com 0 vidas, “DERROTA!”. A tecla R reinicia.",
    tecnologias: ["HTML5", "CSS3", "JavaScript (Canvas)"],
    aprendizado: "Condições, repetição, detecção de colisão e testes para ajustar as regras do jogo.",
    jogo: "jogo/coletor-estrelas.html",
    video: "assets/coletor-estrelas.mp4", poster: "assets/coletor-estrelas-poster.jpg",
    logica: `INÍCIO
  Pontos ← 0
  Vidas ← 3
  JogoAtivo ← verdadeiro
  ENQUANTO JogoAtivo = verdadeiro FAÇA
    mover jogador conforme as setas
    SE jogador tocar estrela ENTÃO
      Pontos ← Pontos + 1
      destruir estrela
    FIM SE
    SE jogador tocar inimigo E Invencivel = falso ENTÃO
      Vidas ← Vidas − 1
      reposicionar jogador
      ativar invencibilidade por 1,5 s
    FIM SE
    SE Pontos ≥ 10 ENTÃO
      mostrar "VITÓRIA!"
      JogoAtivo ← falso
    SENÃO SE Vidas ≤ 0 ENTÃO
      mostrar "DERROTA!"
      JogoAtivo ← falso
    FIM SE
  FIM ENQUANTO
FIM`,
    repo: null },
  { titulo: "Contrato digital – Tio Rodrigo e Tia Dani",
    objetivo: "Substituir o contrato em papel do transporte escolar por um contrato digital, assinado pelo computador ou pelo celular.",
    descricao: "A família preenche os dados do responsável e da criança e assina na tela. Ao enviar, o contrato vai automaticamente para uma planilha do Google e já preenche também a aba de controle de pagamentos. As imagens ao lado mostram a estrutura das planilhas (sem dados reais).",
    tecnologias: ["Google Apps Script", "Planilhas Google"],
    aprendizado: "Automatizar um processo real: do formulário assinado até o controle de pagamentos.",
    imagens: [
      { src: "assets/contrato-cadastros.png", alt: "Planilha de cadastros com data do envio, responsável, CPF, e-mail, endereço e dados da criança" },
      { src: "assets/contrato-pagamentos.png", alt: "Planilha de controle de pagamentos com mensalidade, vencimento e meses de 2027" }
    ],
    repo: null,
    demo: "" /* link do contrato (opcional). Veja o README antes de publicar um link com dados reais. */ }
];
