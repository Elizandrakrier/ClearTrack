document.addEventListener('DOMContentLoaded', () => {
  const dados = JSON.parse(localStorage.getItem('lancamentos')) || []

  const tipos = {
    conta: document.getElementById('lista-contas'),
    investimento: document.getElementById('lista-investimentos'),
    cartao: document.getElementById('lista-cartoes')
  }

  // Agrupa os saldos por conta e tipo
  const resumo = {}

  dados.forEach(l => {
    const chave = l.tipo + ':' + l.conta
    if (!resumo[chave]) {
      resumo[chave] = { nome: l.conta, tipo: l.tipo, valor: 0 }
    }
    resumo[chave].valor += parseFloat(l.valor)
  })

  // Preenche cada card
  Object.values(tipos).forEach(el => (el.innerHTML = ''))

  Object.values(resumo).forEach(item => {
    const div = document.createElement('div')
    div.classList.add('d-flex', 'justify-content-between')
    div.innerHTML = `<span>${
      item.nome
    }</span><span class="saldo">R$ ${item.valor.toFixed(2)}</span>`
    tipos[item.tipo].appendChild(div)
  })
})
