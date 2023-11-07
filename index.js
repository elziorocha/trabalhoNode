// math.test.js
const { soma } = require('./math');

describe('Testando a função soma', () => {
  it('Deve somar dois números corretamente', () => {
    const resultado = soma(2, 3);
    expect(resultado).toBe(5);
  });

  it('Deve somar números negativos corretamente', () => {
    const resultado = soma(-2, -3);
    expect(resultado).toBe(-5);
  });
});
