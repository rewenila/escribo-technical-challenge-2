# Somatório de Múltiplos de 3 ou 5

Este projeto contém uma função em JavaScript que calcula o somatório de todos os valores inteiros divisíveis por 3 ou 5 que sejam inferiores a um número fornecido.

## Como Usar

1. Clone este repositório para o seu ambiente local.

2. Certifique-se de ter o Node.js instalado na sua máquina.

3. Abra o terminal e navegue até o diretório do projeto.

4. No terminal, execute o arquivo `index.js` para testar a função `somatorioMultiplos` com diferentes números:

```bash
node index.js
```
## Exemplo de uso

A função `somatorioMultiplos` recebe um número inteiro positivo como parâmetro e retorna o somatório de todos os valores menores que esse número e divisíveis por 3 ou 5.

Exemplo de uso:

```bash
const somatorioMultiplos = require('./somatorio');

console.log(somatorioMultiplos(10)); // Saída esperada: 23
console.log(somatorioMultiplos(11)); // Saída esperada: 33
```
