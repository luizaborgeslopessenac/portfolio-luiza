# Portfólio Web Dinâmico – Luiza Borges Lopes

Atividade final do 4º bimestre (Canes Solution). Site codificado do zero com **HTML5, CSS3, JavaScript e Bootstrap 5**, sem construtores de site e sem banco de dados relacional.

## Estrutura

```
index.html        páginas/seções, formulário e painel administrativo
css/style.css     estilos (Mobile First + Bootstrap)
js/data.js        conteúdo (textos, projetos) e configurações (automação, PIN)
js/app.js         renderização, formulário, LocalStorage e CRUD
assets/           foto, imagens e vídeo dos projetos
jogo/             Coletor de Estrelas (jogável na galeria, via iframe)
```

Seções: Início, Sobre mim (perfil, hard e soft skills), Áreas do conhecimento (4), Tendências tecnológicas (4), Projetos e Contato.
Para rodar, abra `index.html` no navegador (é necessária internet para carregar o Bootstrap e as fontes por CDN).

## Responsividade
Mobile First com grid, navbar, tabelas e utilitários do Bootstrap, mais Flexbox/Grid no CSS próprio. Testar em celular, tablet e desktop.

## Armazenamento local (LocalStorage + JSON)
- Chave: `portfolio_mensagens`, valor: lista de mensagens em JSON.
- No primeiro acesso, se estiver vazio, o `app.js` injeta **20 registros de teste fictícios**.
- Cada envio do formulário é salvo antes de acionar a automação, com o status do envio (enviado, falhou, pendente ou sem automação).

## Automação de envio (Etapa 2.2)
**Ferramenta escolhida: Formspree.** Motivos: funciona direto do navegador (sem servidor), tem plano gratuito, recebe os campos do formulário e encaminha para o e-mail cadastrado, e a configuração é uma única URL.

Como configurar:
1. Criar conta em formspree.io e um formulário com o e-mail que vai receber as notificações.
2. Copiar o endereço `https://formspree.io/f/XXXXXXXX`.
3. Colar em `js/data.js`, em `CONFIG.automacaoEndpoint`.

Enquanto o endereço estiver vazio, o site avisa que a automação não está configurada.

## Painel administrativo oculto (como testar o CRUD)
1. Abra o site e adicione `#admin` ao final do endereço (ex.: `index.html#admin`).
2. Digite o PIN: `admin2026` (alterável em `js/data.js`).
3. Teste:
   - **Create:** botão “Nova mensagem”.
   - **Read:** tabela com todas as mensagens e busca por nome, e-mail ou assunto.
   - **Update:** “Abrir / editar” em uma linha.
   - **Delete:** “Excluir” (pede confirmação).
   - “Restaurar 20 registros de teste” recarrega os dados fictícios.

> **Aviso de segurança:** ocultar uma página não a protege, e o PIN fica visível no código. O LocalStorage não é seguro para dados confidenciais. Neste projeto acadêmico, use apenas dados fictícios.

## Projetos exibidos
Sistema de gestão de lavanderia (Lavatech), jogo Coletor de Estrelas e contrato digital do transporte escolar. Os textos ficam em `js/data.js` (campos `null` aparecem como “preencher”).

## Entrega
Repositório no GitHub com o código-fonte e este README, e arquivo `.zip` anexado no Microsoft Teams como backup.
