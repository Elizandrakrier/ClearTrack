document.addEventListener('DOMContentLoaded', () => {
  const contasVisao = document.getElementById('lista-contas')
  const investimentosVisao = document.getElementById('lista-investimentos')
  const cartoesVisao = document.getElementById('lista-cartoes')

  const lancamentos = JSON.parse(localStorage.getItem('lancamentos')) || []
  const contasSalvas = JSON.parse(localStorage.getItem('contas')) || []

  const getTipoConta = nomeConta => {
    const conta = contasSalvas.find(c => c.nome === nomeConta)
    return conta ? conta.tipo : 'conta'
  }
  const totais = {
    contas: 0,
    investimentos: 0,
    cartao: 0
  }

  lancamentos.forEach(item => {
    const valor = parseFloat(item.valor)
    const tipo = item.tipo
    const categoria = item.conta.toLowerCase()

    if (categoria === 'cartão de crédito') {
      totais.cartao += tipo === 'entrada' ? valor : -valor
    } else if (categoria === 'investimentos') {
      totais.investimentos += tipo === 'entrada' ? valor : -valor
    } else {
      totais.contas += tipo === 'entrada' ? valor : -valor
    }
  })

  const formatar = valor => {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`
  }

  contasVisao.innerHTML = `<span class="saldo">${formatar(
    totais.contas
  )}</span>`
  investimentosVisao.innerHTML = `<span class="saldo">${formatar(
    totais.investimentos
  )}</span>`
  cartoesVisao.innerHTML = `<span class="saldo">${formatar(
    totais.cartao
  )}</span>`
})
