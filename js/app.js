(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const vazio = v => v == null || v === '' || (Array.isArray(v) && !v.length);
  const pend = '<span class="pendente">preencher</span>';

  /* ---------- Conteúdo ---------- */
  $('#soft-skills').innerHTML = SOFT_SKILLS.map(s => `<li>${esc(s)}</li>`).join('');
  $('#hard-skills').innerHTML = HARD_SKILLS.map(h => `<tr><td>${esc(h.tec)}</td><td>${esc(h.faz)}</td></tr>`).join('');
  $('#areas-grid').innerHTML = AREAS.map(a => `<div class="col-md-6"><article class="area h-100"><h3>${esc(a.titulo)}</h3><p>${esc(a.relato)}</p><p class="vivencia"><strong>Na prática:</strong> ${esc(a.pratica)}</p></article></div>`).join('');
  $('#trend-tabs').innerHTML = TENDENCIAS.map((t, i) => `<button class="nav-link ${i ? '' : 'active'}" data-bs-toggle="pill" data-bs-target="#t${i}" type="button" role="tab" aria-selected="${i ? 'false' : 'true'}">${esc(t.titulo)}</button>`).join('');
  $('#trend-panes').innerHTML = TENDENCIAS.map((t, i) => `<div class="tab-pane fade ${i ? '' : 'show active'}" id="t${i}" role="tabpanel"><h3>${esc(t.titulo)}</h3><p>${esc(t.texto)}</p></div>`).join('');

  function midia(p) {
    if (p.jogo) return `<iframe src="${esc(p.jogo)}" title="${esc(p.titulo)}" class="jogo-frame" loading="lazy"></iframe>
      <p class="small text-muted mt-2 mb-2">Clique no jogo para focar e use o teclado (setas ou WASD). Em celular, assista ao vídeo.</p>
      <details><summary>Ver vídeo da partida</summary><video controls preload="none" poster="${esc(p.poster)}" class="w-100 rounded mt-2"><source src="${esc(p.video)}" type="video/mp4"></video></details>`;
    if (p.video) return `<video controls preload="metadata" poster="${esc(p.poster)}" class="w-100 rounded"><source src="${esc(p.video)}" type="video/mp4">Seu navegador não reproduz vídeo.</video>`;
    return (p.imagens || []).map(i => `<a href="${esc(i.src)}" target="_blank" rel="noopener"><img src="${esc(i.src)}" alt="${esc(i.alt)}" class="img-fluid rounded mb-2" loading="lazy"></a>`).join('');
  }
  $('#projetos-lista').innerHTML = PROJETOS.map((p, i) => {
    const tec = vazio(p.tecnologias) ? '' : `<dt>Tecnologias utilizadas</dt><dd>${p.tecnologias.map(t => `<span class="tec">${esc(t)}</span>`).join('')}</dd>`;
    const apr = vazio(p.aprendizado) ? '' : `<dt>O que eu aprendi</dt><dd>${esc(p.aprendizado)}</dd>`;
    const repo = vazio(p.repo) ? '' : `<a class="btn btn-outline-ink" href="${esc(p.repo)}" target="_blank" rel="noopener">Ver código no GitHub</a>`;
    const demo = vazio(p.demo) ? '' : `<a class="btn btn-ink" href="${esc(p.demo)}" target="_blank" rel="noopener">Abrir o contrato</a>`;
    return `<article class="projeto"><div class="row g-4 ${i % 2 ? 'flex-md-row-reverse' : ''}">
      <div class="col-md-6">${midia(p)}</div>
      <div class="col-md-6"><h3>${esc(p.titulo)}</h3><dl>
        <dt>Objetivo</dt><dd>${esc(p.objetivo)}</dd>
        <dt>Como funciona</dt><dd>${esc(p.descricao)}</dd>
        ${tec}${apr}</dl>
        ${p.logica ? `<details class="mb-3"><summary>Ver a lógica do jogo (pseudocódigo)</summary><pre class="logica">${esc(p.logica)}</pre></details>` : ''}
        <div class="d-flex flex-wrap gap-2">${repo}${demo}</div></div></div></article>`;
  }).join('');

  /* ---------- Armazenamento (LocalStorage + JSON) ---------- */
  const KEY = CONFIG.chaveStorage;
  let mem = null; // reserva em memória caso o navegador bloqueie o LocalStorage
  const carregar = () => { try { const l = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(l) ? l : []; } catch (e) { return mem || []; } };
  const salvar = l => { mem = l; try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) { /* bloqueado */ } };
  const sessao = { get: () => { try { return sessionStorage.getItem('admin_ok'); } catch (e) { return mem && mem.__ok ? '1' : null; } },
    set: () => { try { sessao.set(); } catch (e) { window.__adm = true; } },
    del: () => { try { sessao.del(); } catch (e) { window.__adm = false; } } };
  const novoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  function gerarTestes() {
    const nomes = ['Ana Souza', 'Bruno Lima', 'Carla Mendes', 'Diego Rocha', 'Elisa Prado', 'Felipe Nunes', 'Gabriela Dias', 'Henrique Alves', 'Isabela Costa', 'João Pereira'];
    const assuntos = ['Dúvida sobre os projetos', 'Convite para parceria', 'Feedback do portfólio', 'Pergunta sobre o jogo', 'Oportunidade de estágio'];
    const status = ['enviado', 'enviado', 'falhou', 'pendente'];
    return Array.from({ length: 20 }, (_, i) => {
      const nome = nomes[i % nomes.length];
      return { id: novoId() + i, nome, email: nome.split(' ')[0].toLowerCase() + (i + 1) + '@exemplo.com',
        assunto: assuntos[i % assuntos.length], mensagem: `Mensagem de teste número ${i + 1}. Dados fictícios para validar o painel administrativo.`,
        criadoEm: new Date(Date.now() - i * 86400000).toISOString(), envio: status[i % status.length] };
    });
  }
  // Primeiro acesso: se o LocalStorage estiver vazio, injeta 20 registros de teste.
  if (carregar().length === 0) salvar(gerarTestes());

  /* ---------- Formulário de contato + automação ---------- */
  const form = $('#form-contato'), retorno = $('#retorno');
  const mostrar = (tipo, txt) => { retorno.innerHTML = `<div class="alert alert-${tipo} mb-0">${esc(txt)}</div>`; };

  async function notificar(m) {
    if (!CONFIG.automacaoEndpoint) return 'nao_configurado';
    try {
      const fd = new FormData();
      fd.append('nome', m.nome); fd.append('email', m.email); fd.append('assunto', m.assunto); fd.append('mensagem', m.mensagem);
      fd.append('_subject', 'Portfólio: ' + m.assunto);
      const r = await fetch(CONFIG.automacaoEndpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      return r.ok ? 'enviado' : 'falhou';
    } catch (e) { return 'falhou'; }
  }

  form.addEventListener('submit', async ev => {
    ev.preventDefault();
    form.classList.add('was-validated');
    if (!form.checkValidity()) return;
    const btn = $('#btn-enviar'); btn.disabled = true; btn.textContent = 'Enviando...';
    const m = { id: novoId(), nome: form.nome.value.trim(), email: form.email.value.trim(), assunto: form.assunto.value.trim(),
      mensagem: form.mensagem.value.trim(), criadoEm: new Date().toISOString(), envio: 'pendente' };
    const lista = carregar(); lista.unshift(m); salvar(lista);               // 1) salva localmente
    m.envio = await notificar(m);                                           // 2) dispara a automação
    salvar(carregar().map(x => x.id === m.id ? m : x));
    if (m.envio === 'enviado') mostrar('success', 'Mensagem enviada! Obrigada pelo contato.');
    else if (m.envio === 'nao_configurado') mostrar('warning', 'Mensagem salva no navegador, mas a automação de e-mail ainda não está configurada.');
    else mostrar('danger', 'Sua mensagem foi salva, mas não consegui enviar a notificação. Tente novamente mais tarde.');
    form.reset(); form.classList.remove('was-validated'); btn.disabled = false; btn.textContent = 'Enviar mensagem';
  });

  /* ---------- Painel administrativo oculto (CRUD) ---------- */
  const site = $('#site'), rodape = $('.rodape'), topo = $('#topo'), admin = $('#admin-area');
  const modal = new bootstrap.Modal($('#modal-msg'));
  const rotulo = { enviado: 'Enviado', falhou: 'Falhou', pendente: 'Pendente', nao_configurado: 'Sem automação' };

  function rotear() {
    const emAdmin = location.hash === '#admin';
    [site, rodape, topo].forEach(e => e.classList.toggle('d-none', emAdmin));
    admin.classList.toggle('d-none', !emAdmin);
    if (!emAdmin) return;
    const logado = (sessao.get() === '1' || window.__adm === true);
    $('#admin-login').classList.toggle('d-none', logado);
    $('#admin-painel').classList.toggle('d-none', !logado);
    if (logado) listar();
  }
  window.addEventListener('hashchange', rotear);

  $('#pin-ok').addEventListener('click', () => {
    if ($('#pin').value === CONFIG.pinAdmin) { sessao.set(); $('#pin').value = ''; $('#pin-erro').textContent = ''; rotear(); }
    else $('#pin-erro').textContent = 'PIN incorreto.';
  });
  $('#pin').addEventListener('keydown', e => { if (e.key === 'Enter') $('#pin-ok').click(); });
  $('#admin-sair').addEventListener('click', () => sessao.del());

  function listar() {
    const q = $('#busca').value.trim().toLowerCase();
    const todas = carregar();
    const lista = todas.filter(m => !q || [m.nome, m.email, m.assunto].some(c => String(c).toLowerCase().includes(q)));
    $('#contagem').textContent = `${lista.length} de ${todas.length} mensagens`;
    $('#admin-linhas').innerHTML = lista.length ? lista.map(m => `<tr>
      <td>${esc(new Date(m.criadoEm).toLocaleString('pt-BR'))}</td><td>${esc(m.nome)}</td><td>${esc(m.email)}</td><td>${esc(m.assunto)}</td>
      <td title="${esc(m.mensagem)}">${esc(m.mensagem)}</td><td class="envio-${esc(m.envio)}">${esc(rotulo[m.envio] || m.envio)}</td>
      <td class="text-end text-nowrap"><button class="btn btn-sm btn-outline-ink" data-acao="editar" data-id="${esc(m.id)}">Abrir / editar</button>
      <button class="btn btn-sm btn-outline-danger" data-acao="excluir" data-id="${esc(m.id)}">Excluir</button></td></tr>`).join('')
      : '<tr><td colspan="7" class="text-center text-muted py-4">Nenhuma mensagem. Use “Nova mensagem” ou restaure os registros de teste.</td></tr>';
  }
  $('#busca').addEventListener('input', listar);

  function abrir(m) {
    $('#modal-titulo').textContent = m ? 'Editar mensagem' : 'Nova mensagem';
    $('#a-id').value = m ? m.id : '';
    $('#a-nome').value = m ? m.nome : ''; $('#a-email').value = m ? m.email : '';
    $('#a-assunto').value = m ? m.assunto : ''; $('#a-msg').value = m ? m.mensagem : '';
    $('#a-envio').value = m ? m.envio : 'pendente';
    $('#form-admin').classList.remove('was-validated'); modal.show();
  }
  $('#btn-nova').addEventListener('click', () => abrir(null));

  $('#form-admin').addEventListener('submit', ev => {
    ev.preventDefault();
    const f = ev.target; f.classList.add('was-validated');
    if (!f.checkValidity()) return;
    const dados = { nome: $('#a-nome').value.trim(), email: $('#a-email').value.trim(), assunto: $('#a-assunto').value.trim(),
      mensagem: $('#a-msg').value.trim(), envio: $('#a-envio').value };
    const id = $('#a-id').value, lista = carregar();
    if (id) { const i = lista.findIndex(x => x.id === id); if (i > -1) lista[i] = Object.assign(lista[i], dados); }      // Update
    else lista.unshift(Object.assign({ id: novoId(), criadoEm: new Date().toISOString() }, dados));                       // Create
    salvar(lista); modal.hide(); listar();
  });

  $('#admin-linhas').addEventListener('click', ev => {
    const b = ev.target.closest('button[data-acao]'); if (!b) return;
    const lista = carregar(), m = lista.find(x => x.id === b.dataset.id); if (!m) return;
    if (b.dataset.acao === 'editar') abrir(m);                                                                            // Read
    else if (confirm(`Excluir a mensagem de ${m.nome}?`)) { salvar(lista.filter(x => x.id !== m.id)); listar(); }         // Delete
  });

  $('#btn-reset').addEventListener('click', () => {
    if (confirm('Isto substitui todas as mensagens pelos 20 registros de teste. Continuar?')) { salvar(gerarTestes()); listar(); }
  });

  rotear();
})();
