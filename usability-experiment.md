# Roteiro de Teste

## Cenário

Um usuário cego está logado junto com outros dois usuários videntes, compartilhando o espaço de trabalho para a criação de um diagrama lógico de banco de dados.

O usuário cego pode movimentar-se, movendo o foco entre as tabelas e ouvir os sinais auditivos referentes às alterações realizadas pelos seus colegas.

## Dinâmica

As ações dos usuários são simuladas, criando, alterando e excluindo tabelas. A cada interação o usuário é questionado sobre:

* O que aconteceu? que ação foi realizada? Inclusão, Exclusão, Alteração (I|E|A)
* Quem? quem realizou a ação? Márcio, Tiago, Stefane (M|T|S)
* Onde aconteceu? em que direção uma ação aconteceu? À frente, esquerda ou direita (F|E|D)
* Onde? A que distância? 0~6, onde 0 é o objeto focado, 1 adjacente imediato e n número de links;

São planejadas 16 interações para cada estratégia de sonificação, estas:

* Earcons: a estratégia original da primeira iteração do projeto;
* Earcons2: a estratégia original modificada para contar a distância de acordo com o número de notas, visto que na primeira fase percebeu-se a dificuldade em avaliar a distância;
* Fala: fala intetizada identificando usuário, ação e distância;
* Gravação: fala pré-gravada dos colegas presentes no espaço de trabalho.

As seguintes tarefas são avaliadas:

* Seguir um evento até a origem;

Após cada é aplicado o questionário NASA TLX;

Comentários e sugestões abertos.
