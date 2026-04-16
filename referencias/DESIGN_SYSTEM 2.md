# Design System — anel-main

> Documentacao completa do design system implementado neste projeto.
> Baseado no estado atual do codigo em `src/app` e `src/components`.
> Escopo: tokens visuais, tipografia, layout, componentes, interacoes, animacoes, assets e regras de consistencia.

---

## 1. Visao Geral

Este projeto constroi uma landing page premium inspirada no universo visual da Oura. O sistema visual mistura:

- base editorial e sofisticada
- superficies suaves com cantos muito arredondados
- paleta quente de creme, taupe e charcoal
- hierarquia tipografica forte com serif italic para destaque
- motion discreto, elegante e orientado a reveal

As secoes atuais da pagina sao:

1. `HeroSection`
2. `LiveHealthCarouselSection`
3. `ScienceOfSelfCareSection`
4. `SelectYourModelSection`
5. `FAQSection`
6. `TechSpecsSection`
7. `FooterSection`

Arquivo raiz da composicao: [src/app/page.tsx](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/app/page.tsx)

---

## 2. Fundamentos da Marca

### 2.1 Direcao visual

O projeto segue uma linguagem:

- premium, calma e tactil
- tecnologica sem parecer fria
- limpa sem ficar esteril
- editorial no texto, utilitaria nos controles

### 2.2 Principios

- Espaco em branco generoso e respiracao ampla entre blocos
- Headings grandes como elemento estrutural do layout
- Cores neutras e materiais como protagonista
- Componentes com baixa agressividade visual
- Animacoes suaves, sem excesso de bounce ou efeitos chamativos

---

## 3. Tokens de Cor

Fonte oficial: [src/app/globals.css](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/app/globals.css)

### 3.1 Cores globais

| Token | Valor | Uso principal |
|---|---|---|
| `--oura-cream` | `#f6efe5` | fundo global da pagina |
| `--oura-cream-deep` | `#efe7dc` | variacao de fundo quente |
| `--oura-soft` | `#f3ece3` | cards internos, pills, areas suaves |
| `--oura-line` | `#d8d0c5` | bordas, divisorias e rings sutis |
| `--oura-ink` | `#1c1b1a` | texto principal e botoes escuros |
| `--oura-charcoal` | `#1c1b1a` | superficies escuras e footer |
| `--oura-slate` | `#4a4741` | hover escuro e texto secundario forte |
| `--oura-mute` | `#6b665f` | labels, descricoes e texto secundario |

### 3.2 Paleta semantica

| Papel | Token |
|---|---|
| Fundo principal | `var(--oura-cream)` |
| Texto primario | `var(--oura-ink)` |
| Texto secundario | `var(--oura-mute)` |
| Borda padrao | `var(--oura-line)` |
| Superficie suave | `var(--oura-soft)` |
| CTA escuro | `var(--oura-ink)` |
| CTA hover | `var(--oura-slate)` |

### 3.3 Transparencias e overlays recorrentes

| Contexto | Valor aproximado |
|---|---|
| card glass claro | `rgba(255,255,255,0.26)` |
| borda clara sobre glass | `rgba(120,101,78,0.08)` |
| badge sobre imagem | `bg-white/14` |
| texto branco secundario | `rgba(255,255,255,0.52)` a `0.88` |
| gradiente escuro sobre foto | `from-black/12 via-transparent to-black/45` |

### 3.4 Cores de produto

As cores dos aneis tambem fazem parte do sistema, especialmente na secao de selecao de modelo.

#### Titanium

| Cor | Background |
|---|---|
| Silver | `#d8d4d0` |
| Black | `#2a2a2a` |
| Brushed Silver | `#b8b6b2` |
| Gold | `#c9a96e` |
| Rose Gold | `#c9a099` |
| Stealth | `#1c1c1c` |

#### Ceramic

| Cor | Background |
|---|---|
| Cloud | `#e4dfd9` |
| Midnight | `#1e1e22` |
| Petal | `#d4b8b2` |
| Tide | `#8fa89a` |

---

## 4. Tipografia

### 4.1 Familias

| Papel | Token | Valor |
|---|---|---|
| Sans base | `--font-sans` | `"Helvetica Neue", Arial, sans-serif` |
| Serif editorial | `--font-editorial` | `"Cormorant Garamond", Georgia, serif` |

Importacao atual:

- Google Fonts via `@import` em `globals.css`
- serif usada como destaque dentro de headings e trechos curtos

### 4.2 Regra de composicao tipografica

O padrao dominante do projeto e:

- texto base em sans
- palavra ou frase de destaque em serif italic
- tracking negativo nos titulos
- `font-weight` visualmente leve nos headings

### 4.3 Escala tipografica real do projeto

| Uso | Valor |
|---|---|
| Hero H1 | `clamp(3rem, 6vw, 5rem)` |
| H2 grande desktop | ate `5rem` |
| H2 grande mobile | `2.4rem` a `2.8rem` |
| H2 media | `clamp(2.2rem, 5vw, 3.8rem)` |
| H3 cartao produto | `clamp(1.4rem, 2.2vw, 1.8rem)` |
| titulo de slide | `1.85rem` a `3.05rem` |
| body grande | `1rem` a `1.15rem` |
| body pequeno | `0.8rem` a `0.97rem` |
| labels uppercase | `text-xs` com tracking alto |
| legal/footer microcopy | `11px` a `13px` |

### 4.4 Tracking e line-height

| Uso | Regra |
|---|---|
| Heading hero | `tracking-[-0.06em]`, `leading-[0.96]` |
| Headings de secao | `tracking-[-0.04em]` a `-0.055em` |
| Label uppercase | `tracking-[0.14em]` a `0.18em` |
| Body editorial | `tracking-[-0.012em]` |

### 4.5 Regra para destaque editorial

Padrao recomendado:

```tsx
<em
  className="not-italic"
  style={{
    fontFamily: "var(--font-editorial)",
    fontStyle: "italic",
    fontWeight: 700,
  }}
>
  destaque editorial
</em>
```

---

## 5. Layout e Grid

### 5.1 Container principal

Padrao recorrente:

```tsx
className="max-w-[1280px] mx-auto px-5 md:px-8"
```

### 5.2 Espacamento de secao

| Contexto | Classe recorrente |
|---|---|
| secao clara padrao | `py-20 md:py-28` |
| secao hero | `h-screen max-h-[760px]` |
| footer | `pt-[4.5rem] pb-8` |

### 5.3 Paddings internos

| Escala | Uso |
|---|---|
| `p-6` | cards compactos |
| `p-8` | cards principais |
| `p-10` | painel de controles desktop |
| `px-5` | gutter mobile |
| `md:px-8` | gutter desktop |

### 5.4 Grids implementados

| Secao | Grid |
|---|---|
| Science | `md:grid-cols-[minmax(0,0.95fr)_minmax(0,0.92fr)]` |
| Select Model | `md:grid-cols-2` |
| Tech Specs | `md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]` |
| Footer | `md:grid-cols-[minmax(0,1fr)_minmax(0,2.8fr)]` |

### 5.5 Maximos recorrentes

| Elemento | Max width |
|---|---|
| conteudo geral | `1280px` |
| FAQ | `860px` |
| bloco de texto hero | `max-w-xl` |
| image holder do produto | `max-w-[340px]` |
| charger image | `max-w-[420px]` |

---

## 6. Radius, Bordas e Profundidade

### 6.1 Border radius

O radius e uma assinatura forte do projeto.

| Classe | Uso |
|---|---|
| `rounded-full` | botoes, swatches, pills, input |
| `rounded-[38px]` | hero bottom, card principal de selecao |
| `rounded-[32px]` | painel interno de controle |
| `rounded-[28px]` | glass card science |
| `rounded-[22px]` | card de "What's Included" |
| `rounded-[20px]` | imagem thumb cover |
| `rounded-[18px]` | FAQ item, card do carousel |
| `rounded-[10px]` | thumbnails do produto |

### 6.2 Bordas

| Tipo | Aplicacao |
|---|---|
| `border-[var(--oura-line)]` | borda padrao clara |
| `ring-1 ring-[rgba(...)]` | glass card refinado |
| `ring-2 ring-offset-2` | estado ativo de swatch |
| `border-white/10` | blocos escuros ou transluzidos |

### 6.3 Sombras

O sistema evita sombras pesadas. A profundidade vem de:

- contraste de superficies
- blur de fundo
- bordas leves
- overlays
- pouca sombra, usada apenas em casos pontuais

Sombra mais notavel:

```css
shadow-[0_22px_70px_rgba(92,74,49,0.08)]
```

---

## 7. Motion System

### 7.1 Filosofia de animacao

As animacoes servem para:

- revelar conteudo com suavidade
- dar sensacao de materialidade
- reforcar sofisticacao
- sugerir interatividade sem distrair

Nao ha animacoes agressivas, spring exagerado ou efeitos de marketing excessivo.

### 7.2 Tempos recorrentes

| Duracao | Uso |
|---|---|
| `150ms` | hover e pressed states |
| `200ms` | fade de troca de imagem e pills |
| `300ms` | rotacao e abertura curta |
| `500ms` | accordion, entradas locais |
| `700ms` | reveal de secao |
| `900ms` | headline reveal |
| `1000ms` | card grande reveal |

### 7.3 Curvas de easing

| Easing | Uso |
|---|---|
| `ease-out` | padrao dominante |
| `linear` | marquee infinito |
| custom | nao ha cubic-bezier custom no codigo atual |

### 7.4 Padrao de reveal

Padrao implementado em varias secoes:

```tsx
isVisible
  ? "opacity-100 translate-y-0 blur-0"
  : "opacity-0 translate-y-5 blur-[6px]"
```

Elementos revelados costumam combinar:

- `opacity`
- `translateY`
- `blur`

### 7.5 Intersection Observer

Quase todas as secoes abaixo do hero usam `IntersectionObserver` para disparar entrada:

- `LiveHealthCarouselSection`
- `ScienceOfSelfCareSection`
- `SelectYourModelSection`
- `FAQSection`
- `TechSpecsSection`
- `FooterSection`

Thresholds atuais variam entre `0.05` e `0.35`.

### 7.6 Animacoes globais em `globals.css`

#### `ceramic-fade`

Usada pela classe `.animate-ceramic`.

Comportamento:

- fade in
- pequeno `translateY`
- blur reduzindo a zero
- loop infinito de `4s`

#### `strike`

Keyframe declarado para strikethrough, embora o risco visual atual seja aplicado via pseudo-elemento fixo em `.strike-through::after`.

#### `live-health-marquee`

Usada na classe `.live-health-marquee`.

Comportamento:

- deslocamento horizontal continuo
- `34s linear infinite`
- ativa apenas em `min-width: 768px`

### 7.7 Animacoes por secao

#### Hero

Arquivo: [src/components/HeroSection.tsx](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/components/HeroSection.tsx)

- reveal inicial do conteudo apos `2500ms`
- blur transitorio entre `2500ms` e `2850ms`
- ciclo textual de destaque:
  - aparece `or`
  - depois aparece `Ceramic`
  - `Ceramic` some primeiro
  - `or` some depois
  - reinicia em loop
- CTA com hover scale:
  - `hover:scale-[1.02]`
  - `active:scale-[0.98]`

#### Live Health Carousel

Arquivo: [src/components/LiveHealthCarouselSection.tsx](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/components/LiveHealthCarouselSection.tsx)

- reveal do titulo via observer
- carousel horizontal com loop infinito manual
- recenter automatico por `scrollLeft`
- drag em desktop
- parallax vertical por card usando CSS custom property `--parallax-offset`
- zoom suave de imagem com `transition-transform duration-500 ease-out`

#### Science of Self-Care

- reveal de titulo, copy e media card
- blobs desfocados no background
- video com overlay radial + linear
- glass card com entrada de `1000ms`

#### Select Your Model

- troca de modelo e cor com fade curto de `200ms`
- background do card transiciona junto com a cor selecionada
- swatches ativos aumentam para `scale-110`
- botoes e CTA usam microinteracao de hover/active

#### FAQ

- reveal em cascata com `transitionDelay` por indice
- expansao via `maxHeight`
- icone de mais gira `45deg` ao abrir

#### Tech Specs

- reveal da coluna esquerda e direita
- grid de grupos com delays progressivos
- opacidade final do footnote reduzida para `0.4`

#### Footer

- fade-up progressivo
- colunas entram com delays por indice
- links alteram cor em hover

---

## 8. Componentes

### 8.1 Hero

Arquivo: [src/components/HeroSection.tsx](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/components/HeroSection.tsx)

#### Estrutura

- video desktop full bleed com borda inferior arredondada
- video mobile dedicado
- bloco textual sobreposto
- preco com valor antigo riscado
- CTA principal

#### Caracteristicas

- fundo audiovisual como protagonista
- texto alinhado ao centro no mobile e a esquerda no desktop
- frase editorial com gradiente de texto no destaque `or` e `Ceramic`

### 8.2 Live Health Carousel

Arquivo: [src/components/LiveHealthCarouselSection.tsx](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/components/LiveHealthCarouselSection.tsx)

#### Estrutura de card

- imagem de fundo
- gradiente escuro de legibilidade
- badge superior com icone
- titulo grande com palavra serif

#### Regras

- cards largos no mobile, mais compactos no desktop
- cards sao focados em storytelling visual
- scroll horizontal como mecanismo principal

### 8.3 Science Feature Section

Arquivo: [src/components/ScienceOfSelfCareSection.tsx](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/components/ScienceOfSelfCareSection.tsx)

#### Composicao

- coluna de texto
- card glass com video interno
- manchas de luz desfocadas atras do bloco

#### Linguagem

- mais eterea e cientifica
- menos comercial, mais aspiracional

### 8.4 Product Configurator

Arquivo: [src/components/SelectYourModelSection.tsx](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/components/SelectYourModelSection.tsx)

#### Subcomponentes conceituais

- toggle de modelo
- imagem principal do produto
- strip de thumbnails
- seletor de cor por swatch
- seletor de tamanho
- CTA de compra

#### Estados

- modelo ativo
- cor ativa
- imagem ativa
- tamanho ativo
- modo `Free Kit`

#### Regras visuais

- painel externo recebe a cor do acabamento escolhido
- painel interno permanece em creme para legibilidade
- controles usam pills e circulos como padrao dominante

### 8.5 FAQ Accordion

Arquivo: [src/components/FAQSection.tsx](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/components/FAQSection.tsx)

#### Estrutura

- titulo centralizado
- pilha vertical de itens
- cada item com trigger e corpo expansivel

#### Regras

- fundo do item em `var(--oura-soft)`
- texto curto, legivel e sem excesso de contraste
- abertura individual por estado local

### 8.6 Tech Specs

Arquivo: [src/components/TechSpecsSection.tsx](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/components/TechSpecsSection.tsx)

#### Composicao

- coluna visual do charger
- card "What's Included"
- grid de grupos tecnicos com icones inline SVG

#### Tema

- secao escura e tecnica
- contraste mais alto
- linguagem mais informativa e menos editorial

### 8.7 Footer

Arquivo: [src/components/FooterSection.tsx](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/components/FooterSection.tsx)

#### Blocos

- wordmark
- newsletter
- colunas de navegacao
- links legais
- seletor de idioma

#### Regras

- fundo escuro integral
- microcopy em opacidades diferentes
- links com hover apenas por cor, sem ornamento extra

---

## 9. Estados de Interacao

### 9.1 Hover

Padroes recorrentes:

- CTA: troca de background + leve scale
- swatch: `hover:scale-105`
- pills inativas: ganho de contraste
- links do footer: cor mais clara

### 9.2 Active / Selected

| Elemento | Estado ativo |
|---|---|
| swatch de cor | `ring-2 ring-offset-2` + `scale-110` |
| tamanho selecionado | fundo escuro + texto creme |
| modelo selecionado | pill escura |
| FAQ aberto | circulo preenchido + rotacao |

### 9.3 Disabled

Nao existe sistema formal de disabled implementado no codigo atual.

### 9.4 Focus

Nao ha um padrao dedicado de focus desenhado manualmente no projeto atual. Em futuras evolucoes, recomenda-se explicitar estados de foco para acessibilidade.

---

## 10. Assets e Midia

### 10.1 Assets locais

Diretorio: [public/products/oura](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/public/products/oura)

Uso:

- swatches de acabamento
- imagens anguladas dos aneis
- fallbacks locais para imagens de produto

### 10.2 Assets remotos

O projeto usa varias midias remotas da Oura via `imgix`:

- videos do hero
- imagens do carousel
- video X-ray da secao science
- imagem do charger

### 10.3 Estrategia atual

- `next/image` para imagens locais e remotas suportadas
- `video` nativo para hero e science
- fallback local na imagem do produto quando o asset principal falha

---

## 11. Responsividade

### 11.1 Breakpoint principal

O projeto trabalha majoritariamente com `md` como ponto de virada principal.

### 11.2 Comportamentos responsivos importantes

- hero muda alinhamento e troca de video entre mobile e desktop
- science duplica markup de titulo para ajuste fino mobile/desktop
- select model vira 2 colunas em desktop
- tech specs vira layout assimetrico em desktop
- footer reorganiza colunas conforme largura
- marquee de carousel so existe no desktop

### 11.3 Heuristicas de escala

- titulos usam `clamp` ou tamanhos muito maiores em desktop
- copy cresce moderadamente
- raios altos sao preservados em qualquer viewport
- scroll horizontal e priorizado para descoberta no carousel

---

## 12. Inventario Tecnico do Sistema

### 12.1 Arquivos centrais

- [src/app/globals.css](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/app/globals.css)
- [src/app/layout.tsx](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/app/layout.tsx)
- [src/app/page.tsx](/Users/marcosviniciuscostaviana/Documents/lpouring/anel-main/src/app/page.tsx)

### 12.2 Stack visual

- Next.js App Router
- Tailwind CSS v4
- CSS variables em `:root`
- animacoes por classes utilitarias e inline styles
- SVG inline para varios icones

### 12.3 Tokens expostos em `@theme inline`

```css
--color-oura-cream
--color-oura-ink
--color-oura-slate
--color-oura-mute
--color-oura-line
--color-oura-soft
--font-sans
--font-editorial
```

---

## 13. Regras Para Evolucao do Projeto

Para manter coerencia com o design system atual:

- use sempre `var(--oura-*)` antes de inventar novas cores
- prefira radius grande e superfices suaves
- mantenha headings leves com tracking negativo
- use serif italic apenas como acento editorial
- motion deve continuar elegante, curto e com `ease-out`
- evite sombras pesadas e gradientes chamativos demais
- em secoes claras, preserve o contraste quente e suave
- em secoes escuras, use branco com opacidade em vez de branco puro sempre que possivel

---

## 14. Checklist de Consistencia

- [ ] novos componentes usam tokens globais existentes
- [ ] headings seguem o padrao sans + serif editorial
- [ ] radius continua amplo e consistente
- [ ] hover states sao discretos
- [ ] reveals usam `opacity + translateY + blur`
- [ ] secoes mantem `max-w-[1280px]`
- [ ] backgrounds de produto respeitam a cor do acabamento
- [ ] componentes escuros usam opacidades refinadas de branco

---

## 15. Resumo Executivo

Este design system descreve um produto editorial, premium e suave, sustentado por:

- paleta neutra quente
- tipografia hibrida entre sans utilitaria e serif expressiva
- containers amplos com radius alto
- componentes com pouca friccao visual
- animacoes baseadas em reveal, loop discreto e microinteracoes elegantes

O documento agora reflete o estado real do projeto e pode servir como referencia para expansao da landing, refatoracao visual e criacao de novos componentes coerentes com a base existente.
