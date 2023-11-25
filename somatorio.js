function somatorioMultiplos(numero) {
  let soma = 0;

  for (let i = 3; i < numero; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      soma += i;
    }
  }

  return soma;
}

module.exports = somatorioMultiplos;

