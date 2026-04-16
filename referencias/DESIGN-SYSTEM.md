# Starlink Landing Page Design System

## 1. Objetivo

Este documento consolida o design system da landing page Starlink presente neste projeto. Ele descreve a identidade visual, tipografia, cores, layout, componentes, comportamento responsivo, motion e regras de consistencia para evolucao da interface sem perder unidade.

Este design system foi escrito com base no estado atual do projeto, nao como proposta abstrata. Ou seja: ele documenta o que existe hoje e serve como base para manter, refinar e escalar a landing page.

---

## 2. Direcao da Marca

### Conceito central

A pagina comunica:

- tecnologia premium
- conectividade global
- performance em ambiente extremo
- urgencia comercial
- visual limpo, escuro e cinematografico

### Personalidade visual

- Minimalista, mas nao fria
- Comercial e premium
- Futurista sem exagero sci-fi
- Forte contraste entre preto, branco e imagem/video
- Tipografia em caixa alta para titulos e chamadas

### Princípios de interface

- O conteudo precisa parecer direto e de alto impacto
- O layout deve priorizar legibilidade sobre decoracao
- O preto funciona como base estrutural do sistema
- O branco e usado como cor principal de texto e destaque
- Motion existe para reforcar valor e foco, nao para distrair

---

## 3. Arquitetura Visual

### Estrutura geral da pagina

A home atual e composta por:

1. Preloader
2. Countdown flutuante no topo
3. Hero com video em background
4. Features / product intro
5. Use cases em cards
6. Work & Play section
7. Weather Resilient section
8. Pricing cards
9. Included
10. FAQ
11. Footer

### Hierarquia de leitura

- Primeiro impacto: hero, video, titulo e CTA
- Segundo impacto: prova de uso e contexto visual
- Terceiro impacto: planos e conversao
- Quarto impacto: credibilidade, inclusoes e FAQ

---

## 4. Fundacoes de Design

## 4.1 Cores

As cores principais sao definidas no `tailwind.config.js`.

### Base

- `black / page background`: `#000000`
- `surface.default`: `#0a0a0a`
- `surface.elevated`: `#111111`
- `surface.overlay`: `#1a1a1a`

### Texto e destaque

- `accent.default`: `#ffffff`
- `accent.muted`: `rgba(255,255,255,0.6)`
- `accent.subtle`: `rgba(255,255,255,0.08)`

### Uso recomendado

- Fundo principal: preto absoluto ou `surface.default`
- Cards premium: `surface.elevated`
- Glass / overlays: branco com baixa opacidade ou `surface.overlay`
- Texto principal: branco
- Texto secundario: branco com 60% de opacidade
- Bordas: branco com 10% a 15% de opacidade

### Regras

- Evitar cores extras sem necessidade real
- Nao introduzir gradientes coloridos fora de casos muito intencionais
- O contraste deve permanecer alto em toda a jornada

---

## 4.2 Tipografia

### Familias

O projeto usa duas familias principais:

- `Inter` para texto corrido, UI e leitura funcional
- `Faktum, sans-serif` como familia de display configurada para titulos

O `layout` tambem carrega `Space Grotesk`, mas o sistema atual privilegia:

- `font-sans`: Inter
- `font-display`: Faktum, com fallback `sans-serif`

### Diretriz de uso

- Titulos: `font-display`, `font-medium`, `uppercase`
- Textos corridos: `font-sans`
- Labels, contadores e UI compacta: `font-sans` ou `font-display` conforme impacto

### Estilo visual dos titulos

- Caixa alta
- Peso medio
- Tracking controlado
- Escala ampla, com leitura forte e limpa

### Hero title

No hero, o titulo atual segue:

- mobile: `36px`
- tablet/desktop: `52px`
- `uppercase`
- `font-medium`
- `tracking-tight`

### Praticas recomendadas

- Titulos sempre muito curtos ou bem quebrados
- Subtitulos com largura limitada
- Evitar paragrafo longo em caixa alta
- Para blocos de conversao, manter texto direto e com respiracao

---

## 4.3 Grid, Container e Espacamento

### Container

O projeto define:

- `maxWidth.container = 1200px`

### Estrategia de layout

- Pagina com secoes em largura total
- Conteudo centralizado em container
- Respiros generosos no desktop
- Ajuste de stacking no mobile em vez de miniaturizacao agressiva

### Padrões recorrentes

- `px-6`
- `md:px-10`
- `lg:px-16` ou `lg:px-20`
- `py-16`, `py-20`, `py-24`
- `gap-6`, `gap-8`, `gap-10`, `gap-12`

### Regras de espacamento

- Hero deve respirar acima e abaixo, mas sem consumir toda a primeira dobra
- Cards devem manter boa separacao visual mesmo em fundo escuro
- O mobile deve priorizar pilha vertical clara com imagem acima do texto quando necessario

---

## 4.4 Bordas, Raios e Superficies

### Raios

O projeto trabalha com cantos arredondados modernos, sem exagero:

- `rounded-xl`
- `rounded-2xl`
- `rounded-3xl`
- pills com arredondamento maximo para countdown e alguns chips

### Bordas

Base global:

- `border-white/10`

Uso:

- delimitacao suave de cards
- moldura de blocos elevated
- estrutura glass de baixa intrusao

### Superficies

Tipos principais:

- Flat black: fundo base da pagina
- Elevated dark: cards e blocos de destaque
- Glass translucent: countdown flutuante
- Video/image overlays: gradientes e sombras leves para legibilidade

---

## 5. Motion System

O motion deste projeto e sutil, premium e funcional.

### Objetivo

- dar vida a pagina
- reforcar foco e valor do CTA
- suavizar transicoes
- melhorar percepcao de qualidade

### Animacoes existentes

#### Entrance

- `animate-hero-up`
- `animate-hero-in`
- classes de delay: `delay-100` a `delay-700`

#### Scroll reveal

- `.sr`
- `.sr-fade-up`
- `.sr-fade-down`
- `.sr-fade-left`
- `.sr-fade-right`
- `.sr-scale-in`
- `.sr-blur-in`
- `.sr.sr-visible`

#### Hover / interaction

- `.hover-lift`
- `.hover-glow`
- `.hover-scale`
- `.btn-press`
- `.img-zoom`

#### Ambient motion

- `.animate-pulse-glow`
- `.animate-float`
- `.animate-explore-glow`

#### Preloader motion

- stroke draw no simbolo
- fade progressivo nos pontos
- fade-fill no wordmark

### Regras de uso

- Evitar motion pesado em massa
- Nao usar animacoes competitivas na mesma area
- CTA pode ter destaque continuo se for decisao comercial clara
- Em `prefers-reduced-motion`, as animacoes devem ser reduzidas ou removidas

---

## 6. Video e Imagem

## 6.1 Hero background video

O hero usa video como background full-bleed via Video.js.

### Comportamento

- autoplay
- muted
- loop
- sem controles visiveis
- com `object-fit: cover`

### Diretrizes

- video deve servir como atmosfera, nao como narrativa principal
- overlays devem ser minimos e usados apenas para garantir contraste
- o enquadramento pode ser ajustado com `object-position` quando necessario

### Camadas visuais do hero

- video como base
- overlay preto leve
- vinheta/gradiente inferior para transicao de secao
- gradiente lateral suave para apoio de contraste
- conteudo textual acima de tudo

## 6.2 Imagens de secao

As imagens seguem dois comportamentos principais:

- background media em desktop
- imagem dedicada acima do texto em mobile quando o corte lateral prejudica a leitura

### Regra mobile importante

Quando a composicao desktop usa imagem “ao lado” ou “dentro” da estrutura textual, no mobile ela deve:

- subir para cima do texto
- ocupar largura total util
- usar enquadramento mais controlado, como `object-top`, quando houver corte importante

---

## 7. Responsividade

O sistema atual e fortemente adaptado para mobile.

### Direcao mobile

- prioridade para leitura central
- imagens acima do texto em secoes criticas
- CTA com largura natural, sem stretch exagerado
- titulos grandes, mas controlados
- conteudos dependentes de hover precisam virar estado visivel

### Ajustes mobile ja presentes

- Hero title: `36px`
- Hero button com largura natural
- 2a secao com imagem da antena acima do texto
- Cards de use case com texto revelado sem depender de hover
- Work & Play com imagem acima do texto no mobile
- Weather Resilient com imagem acima do texto no mobile

### Regras de manutencao

- Nao confiar em hover para informacao essencial no mobile
- Nao usar cortes agressivos de imagem em areas de prova de produto
- Se uma secao perder legibilidade no mobile, a hierarquia deve mudar, nao apenas o tamanho

---

## 8. Componentes

## 8.1 Preloader

### Papel

Criar entrada de marca e preparar a experiencia com uma percepcao premium.

### Estrutura

- fundo 100% preto
- simbolo SVG branco animado
- texto institucional
- barra de progresso
- percentual numerico

### Conteudo atual

- eyebrow: `GLOBAL NOTICE`
- titulo: `STARLINK SOLIDARITY DISCOUNT`
- descricao curta explicando o desconto

### Comportamento

- duracao minima de 2.5 segundos
- some apenas quando a pagina estiver pronta e o tempo minimo tiver sido atingido

### Diretrizes

- manter limpo
- evitar excesso de texto
- manter tom premium e institucional

---

## 8.2 Countdown Floating Bar

### Papel

Adicionar urgencia comercial sem virar uma faixa pesada.

### Estilo

- menu flutuante
- glassmorphism escuro
- centralizado no topo
- largura limitada
- labels compactas: `H`, `M`, `S`

### Conteudo

- `Limited Time Offer`
- contagem regressiva
- mensagem auxiliar curta

### Comportamento

- fixa no topo
- nao ocupa largura total da tela
- countdown em looping continuo

### Diretrizes

- deve parecer premium, nao promocao barata
- nao deve competir com a hero

---

## 8.3 Hero

### Papel

E o bloco mais importante da pagina. Ele precisa:

- vender aspiracao
- contextualizar conectividade global
- empurrar para a secao de planos

### Composicao

- video de fundo
- titulo centralizado
- subtitulo centralizado
- CTA centralizado
- countdown separado, mas visualmente integrado ao topo

### Conteudo atual

- titulo:
  - `HIGH-SPEED INTERNET`
  - `AROUND THE WORLD`
- subtitulo:
  - `Pay only the setup fee enjoy unlimited internet access`
- CTA:
  - `GET YOUR DISCOUNT & LIFETIME PLAN`

### Regras de design

- manter o centro visual limpo
- evitar excesso de texto
- CTA precisa ser imediatamente legivel
- overlays nao devem matar o video

---

## 8.4 Feature Intro Section

### Papel

Introduzir o produto e o seu uso de forma visual.

### Diretriz atual

- desktop: composicao lado a lado
- mobile: imagem acima do texto

### Objetivo

- explicar rapidamente o produto
- criar transicao entre hero e provas de uso

---

## 8.5 Use Case Cards

### Papel

Traduzir o produto em cenarios aspiracionais.

### Padrão

- imagem forte
- titulo curto
- texto complementar
- hover/reveal no desktop
- estado visivel no mobile

### Regras

- a imagem precisa carregar parte do storytelling
- a descricao deve ser curta e clara
- no mobile o usuario nao pode depender de hover

---

## 8.6 Lifestyle Sections

Secoes como `Work and Play in Remote Locations` e `Weather Resilient` seguem a mesma familia visual.

### Estrutura

- media forte
- texto curto
- ritmo editorial
- fundo preto

### Regra mobile

- imagem sobe para cima do texto
- enquadramento deve evitar cortes ruins

---

## 8.7 Pricing Cards

### Papel

Area principal de conversao.

### Estrutura

- dois cards principais
- imagem do produto com destaque
- nome do plano
- preco
- CTA direto para checkout

### Conteudo atual

- `Lifetime Plan`
- `Annual Plan`
- CTA: `REDEEM OFFER & ORDER NOW`

### Comportamento

- hero CTA leva para `#pricing`
- imagem do produto foi ampliada para ganhar presenca

### Regras

- o plano destacado deve parecer premium
- os CTAs precisam manter consistencia visual
- preco e CTA devem ser lidos rapidamente

---

## 8.8 Included Section

### Papel

Diminuir friccao mostrando o que acompanha a compra.

### Regra

- visual simples
- poucos elementos
- foco em clareza

---

## 8.9 FAQ

### Papel

Responder duvidas de objecao e reduzir hesitacao antes da compra.

### Regras

- perguntas curtas
- respostas objetivas
- sem excesso de juridiquês visual

---

## 8.10 Footer

### Papel

Encerrar a pagina com limpeza e continuidade visual.

### Regras

- nao competir com a conversao
- manter estilo minimalista

---

## 9. Buttons e CTAs

### Estilo geral

- cantos arredondados consistentes
- peso visual medio/alto
- fundo claro ou contraste suficiente para acao principal
- uppercase quando fizer sentido para match de linguagem da pagina

### CTA primario

Uso:

- hero
- pricing cards

### Diretrizes

- texto sempre direto
- tamanho natural no mobile
- nao usar largura 100% sem necessidade
- manter contraste alto com o fundo

### Interacao

- pressionamento leve com `.btn-press`
- hover pode elevar, brilhar ou expandir discretamente

---

## 10. Glassmorphism

O efeito glass existe, mas em dose controlada.

### Onde usar

- countdown flutuante
- micro containers de destaque
- overlays premium com foco de interface

### Onde evitar

- cards principais de leitura longa
- secoes inteiras
- areas em que o contraste possa cair

### Regras

- blur discreto
- fundo semitransparente escuro
- borda branca de baixa opacidade

---

## 11. Content System

### Tom de voz visual

- direto
- premium
- global
- funcional
- promocional com controle

### Padrões de copy

- Titulos curtos e fortes
- Subtitulos em linguagem simples
- CTAs orientados a acao
- Mensagens de urgencia em microcomponentes

### Regras

- evitar paragrafos muito longos
- evitar titulos genéricos
- evitar texto excessivamente tecnico em areas comerciais

---

## 12. Acessibilidade e Legibilidade

Mesmo com foco comercial e visual cinematografico, a pagina precisa manter leitura clara.

### Regras minimas

- contraste alto entre texto e fundo
- overlays suficientes para legibilidade quando houver video
- motion reduzido em `prefers-reduced-motion`
- conteudo essencial visivel no mobile sem hover

### Pontos de atencao

- textos sobre video
- glass com texto pequeno
- opacidades muito baixas em blocos secundarios

---

## 13. Implementacao Tecnica

### Stack visual

- Next.js App Router
- Tailwind CSS
- Video.js
- CSS utilitario + algumas classes customizadas em `globals.css`

### Arquivos-base do sistema

- `tailwind.config.js`
- `app/globals.css`
- `app/layout.tsx`

### Componentes-chave

- `app/components/Hero.tsx`
- `app/components/CountdownTimer.tsx`
- `app/components/PreloaderOverlay.tsx`
- `app/components/PreloaderMark.tsx`
- `app/components/StreamVideoBackground.tsx`
- `app/components/PricingCards.tsx`

### Padrão de manutenção

- Preferir reutilizacao de classes utilitarias existentes
- Antes de criar novo efeito, verificar se ja existe um helper em `globals.css`
- Ajustes mobile devem ser pensados como reestrutura de layout, nao apenas resize

---

## 14. Inventario de Classes e Tokens Relevantes

### Tipografia

- `font-sans`
- `font-display`
- `font-medium`
- `uppercase`
- `tracking-tight`

### Layout

- `max-w-container`
- `mx-auto`
- `px-6`
- `md:px-10`
- `lg:px-16`
- `lg:px-20`
- `py-16`
- `py-20`
- `py-24`

### Superficie e contraste

- `bg-black`
- `bg-black/20`
- `border-white/10`
- `text-white`
- `text-white/60`
- `text-white/70`

### Motion

- `animate-hero-up`
- `animate-hero-in`
- `animate-explore-glow`
- `hover-lift`
- `hover-glow`
- `hover-scale`
- `img-zoom`
- `btn-press`

### Scroll reveal

- `sr`
- `sr-fade-up`
- `sr-fade-left`
- `sr-fade-right`
- `sr-scale-in`
- `sr-blur-in`

---

## 15. Componentes Fora da Home Atual

Existem componentes no projeto que nao estao na composicao principal atual da home, mas fazem parte do repositorio:

- `NoticeBanner`
- `MiniShowcase`
- `SpaceXSection`

### Regra

Se forem reutilizados, devem seguir a linguagem atual:

- fundo escuro
- contraste alto
- tipografia display em caixa alta
- imagem forte
- sem visual “genérico de template”

---

## 16. Boas Praticas Para Novas Secoes

Toda nova secao deve responder a estas perguntas:

1. Ela aumenta a conversao, prova ou clareza?
2. Ela respeita a hierarquia premium e minimalista da pagina?
3. Ela continua legivel no mobile sem hover?
4. Ela mantem contraste alto no ecossistema escuro?
5. Ela conversa com o hero e com os cards de plano?

### Checklist de aprovacao visual

- titulo curto e forte
- imagem/video com enquadramento bom
- padding respirando
- CTA consistente
- mobile legivel
- motion sutil
- sem poluicao de cores

---

## 17. Resumo do Sistema

Este projeto usa um design system dark premium, comercial e cinematografico, baseado em:

- preto como estrutura
- branco como linguagem principal
- tipografia display em uppercase
- video e imagem como prova aspiracional
- cards de conversao claros
- motion sutil e funcional
- responsividade orientada por reorganizacao real da interface

Se houver duvida entre “decorar mais” e “simplificar melhor”, a direcao correta deste sistema e simplificar melhor.
