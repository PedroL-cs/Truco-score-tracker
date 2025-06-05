# Truco Score Tracker 🃏

Um placar interativo para partidas de Truco, com suporte à contagem de pontos, lógica de “trucar” e alternância entre temas claro/escuro.

## 🎮 Funcionalidades

- Botões para pontuar cada jogador com base no valor atual do truco
- Suporte à lógica de "Truco!" → "Dobrar" → "Triplicar" → "All-win"
- Botão de reset que também atua como "Cancelar truco"
- Detecta automaticamente o vencedor ao atingir 12 pontos
- Alternância de tema (light/dark) com salvamento em `localStorage`

## 🛠️ Tecnologias

- HTML
- CSS (com classes utilitárias de estilo)
- JavaScript puro (sem frameworks)

## 📋 Regras implementadas

- O valor inicial de cada jogada é 1 ponto.
- Ao clicar em "Truco!", o valor sobe para 3, depois 6, 9 e finalmente 12.
- O botão de reset muda para "Cancelar truco" quando o valor estiver acima de 1.
- Quando um jogador alcança 12 pontos, o jogo é encerrado e os botões são desativados.

## 🧪 Como usar

1. [Acesse o link](pedrol-cs.github.io/Truco-score-tracker/) para começar a jogar.
2. Clique nos botões de cada jogador para adicionar pontos.
3. Use o botão "Truco!" para aumentar o valor da rodada.
4. Clique em "Zerar" para resetar a partida ou "Cancelar truco" se quiser voltar o valor da rodada para 1.

## 🌗 Tema

O projeto suporta dois temas:
- Claro (padrão)
- Escuro (ativado via switch)

O tema escolhido é salvo automaticamente no `localStorage`.