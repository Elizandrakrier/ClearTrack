document.addEventListener('DOMContentLoaded', () => {
  const listaContas = document.getElementById('lista-contas')
  const listaInvestimentos = document.getElementById('lista-investimentos')
  const listaCartoes = document.getElementById('lista-cartoes')
  const btnSalvarConta = document.getElementById('btnSalvarConta')
  const nomeContaInput = document.getElementById('nomeConta')
  const tipoContaSelect = document.getElementById('tipoConta')

  // Carrega contas salvas
  let contas = JSON.parse(localStorage.getItem('contas')) || []

  // Exibe as contas nas listas
  function renderizarContas() {
    listaContas.innerHTML = ''
    listaInvestimentos.innerHTML = ''
    listaCartoes.innerHTML = ''

    contas.forEach(conta => {
      const item = document.createElement('li')
      item.classList.add('list-group-item')
      item.textContent = conta.nome

      if (conta.tipo === 'conta') {
        listaContas.appendChild(item)
      } else if (conta.tipo === 'investimento') {
        listaInvestimentos.appendChild(item)
      } else if (conta.tipo === 'cartao') {
        listaCartoes.appendChild(item)
      }
    })
  }

  // Salvar nova conta
  btnSalvarConta.addEventListener('click', () => {
    const nome = nomeContaInput.value.trim()
    const tipo = tipoContaSelect.value

    if (!nome || !tipo) {
      alert('Preencha todos os campos.')
      return
    }

    contas.push({ nome, tipo })
    localStorage.setItem('contas', JSON.stringify(contas))

    nomeContaInput.value = ''
    tipoContaSelect.value = ''
    const modal = bootstrap.Modal.getInstance(
      document.getElementById('modalConta')
    )
    modal.hide()
    renderizarContas()
  })

  renderizarContas()
})
