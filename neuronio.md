# Neuronio
A definição formal diz que: 
>"É a célula do sistema nervoso responsável pela condução do impulso nervoso, é constituído de corpo celular, núcleo celular, dendritos, axônio e telodendritos"

Tá aqui o bicho

![Neuronio biologico](assets/images/neuronio.jpg)

Pensando de forma sistemica esse cara ele ficaria mais ou menos assim:

<!-- [Neuronio artificial](assets/images/tikz9.png) -->
![Neuronio artificial](assets/images/neuros-bio-vs-artificial.png)


Beleza ?

 Os valores x1, x2, x3, ... são os valores de entrada para esse neuronio, 
 esses valores são multiplicados pelos seus respectivos pesos e somados juntamente com a constante bias.

 Como eu gosto de imagem vamos ver isso graficamente:

 ![Neuronio artificial](assets/images/neuron2.png)


#####Se x1, x2, xn são os valores do meu problema quem são w1, w2, wn ?

W é o peso para cada valor, inicialmente você pode associar randomicamente um valor para eles, porque depois a rede vai aprender e vai convergir esses valores adequadamente.

#####E quem é esse tal de "bias" ?

O Bias pode ser considerado como uma nova entrada para o neuronio, ele faz com que a saida do neuronio seja diferente de zero mesmo qeu todas as entradas do mesmo seja nula. Como ele pode ser considerado como mais uma entrada do neuronio ele também é ajustado conforme a rede aprende.


####Resumo de tudo o que aprendemos:

![Função de ativação](assets/images/basicsum.png)

Essa é nossa função de ativação:




------

Função de transferência (T)




