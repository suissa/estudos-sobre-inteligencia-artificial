# Projeto Final

Eu acredito que aprendemos melhor tendo um objetivo final, uma meta, isso nos da um limite que sabemos ser alcançável e nos ajuda a criar um roteiro de estudos.

Para ter uma ótima fonte atual, eu me inscrevi no curso de [Machine Learning](https://www.coursera.org/learn/machine-learning/) da Coursera e obviamente repassarei o conteúdo por aqui.

## Objetivo

Como minha [mulher](https://github.com/fpchemical/) é professora e química, ela me fez entender um pouco dessa matéria que eu odiava e durante nossos estudos cogitamos a ideia de usar Machine Learning para fazer um sistema web e colaborativo para análise de moléculas.

Minha ideia é que treinemos a Rede Neral para ela entender as classificações dos átomos ou moléculas e quem sabe futuramente poder simular reações químicas.

> Não sei se isso é fácil ou difícil, **só sei que quero fazer**.

## Roteiro

Acredito que para atingir esse objetivo devo seguir os seguintes passos:

- inserir todos os dados necessários para todos os átomos
- treinar a rede para entender a classificação átomos
- inserir muitos dados de moléculas
- treinar a rede para entender porque esses átomos se agrupam
  - entender quais átomos tem mais afinidade 
  - entender os tipos de ligações
- perguntar se X e Y formam uma molécula
- simular uma molécula que não conheça

## Metodologia

Para conseguir uma pletora de dados irei criar um sistema web como captação desses dados, porém de uma forma simples. Qualquer pessoa poderá colaborar ajudando a inserir algum dado sobre as moléculas. Os dados iniciais dos átomos serão gerado por mim, fazendo alguns crawlers marotos.  

Depois precisarei criar um script para tratar esses dados, para que seja possível treinar a rede.

Com o pouco que sei, acredito que inicialmente usarei um treinamento supervisionado para a classificação dos átomos e também das moléculas, para depois uar regressão para que ela possa simular as moléculas.
