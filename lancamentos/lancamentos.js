document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.getElementById('dateFilterDropdown');
    const dropdownMenu = document.querySelector('#dateFilterDropdown + .dropdown-menu');
    const customDate = document.getElementById('customDate');
    const tableBody = document.querySelector('.table-container tbody');
    const saidaForm = document.getElementById('saidaForm');
    const entradaForm = document.getElementById('entradaForm');
    const message = document.getElementById('message');
    const saidaModal = new bootstrap.Modal(document.getElementById('saidaModal'));
    const entradaModal = new bootstrap.Modal(document.getElementById('entradaModal'));
    const addSaidaBtn = document.getElementById('addSaidaBtn');
    const addEntradaBtn = document.getElementById('addEntradaBtn');
    const valorInput = document.getElementById('valor');
    const entradaValorInput = document.getElementById('entradaValor');

    // Abrir modal ao clicar em "Adicionar saída"
    addSaidaBtn.addEventListener('click', () => {
        saidaModal.show();
    });

    // Abrir modal ao clicar em "Adicionar entrada"
    addEntradaBtn.addEventListener('click', () => {
        entradaModal.show();
    });

    // Função para formatar o valor no formato R$
    const formatCurrency = (value) => {
        value = value.replace(/\D/g, '');
        value = Number(value) / 100;
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });
    };

    // Função para desformatar o valor (R$ 1.234,56 -> 1234.56)
    const parseCurrency = (value) => {
        value = value.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
        return parseFloat(value);
    };

    // Formatar o campo de valor enquanto o usuário digita (Saída)
    valorInput.addEventListener('input', (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        if (value === '') {
            e.target.value = '';
            return;
        }
        e.target.value = formatCurrency(value);
    });

    // Formatar o campo de valor enquanto o usuário digita (Entrada)
    entradaValorInput.addEventListener('input', (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        if (value === '') {
            e.target.value = '';
            return;
        }
        e.target.value = formatCurrency(value);
    });

    // Função para exibir mensagem
    const showMessage = (text, type = 'info') => {
        message.textContent = text;
        message.className = `message ${type}`;
        setTimeout(() => {
            message.textContent = '';
            message.className = 'message';
        }, 3000);
    };

    // Função para enviar os dados ao back-end JSP (Saída)
    const sendSaidaToBackend = (saidaData) => {
        console.log('Enviando saída ao back-end JSP:', saidaData);
        /*
        fetch('/salvarSaida.jsp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(saidaData).toString(),
        })
            .then(response => response.text())
            .then(data => {
                showMessage('Saída salva com sucesso!', 'success');
                saidaForm.reset();
                valorInput.value = '';
                saidaModal.hide();
            })
            .catch(error => {
                showMessage('Erro ao salvar saída. Tente novamente.', 'error');
                console.error('Erro ao enviar saída ao JSP:', error);
            });
        */
    };

    // Lógica de validação e envio do formulário (Saída)
    saidaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const descricao = document.getElementById('descricao').value.trim();
        const data = document.getElementById('data').value;
        const conta = document.getElementById('conta').value;
        const valorFormatted = valorInput.value;
        const valor = parseCurrency(valorFormatted);

        if (!descricao || !data || !conta || isNaN(valor) || valor <= 0) {
            showMessage('Preencha todos os campos corretamente. O valor deve ser maior que zero.', 'error');
            return;
        }

        const saidaData = {
            descricao,
            data,
            conta,
            valor: valor.toFixed(2),
        };

        sendSaidaToBackend(saidaData);
    });

    // Função para enviar os dados ao back-end JSP (Entrada)
    const sendEntradaToBackend = (entradaData) => {
        console.log('Enviando entrada ao back-end JSP:', entradaData);
        /*
        fetch('/salvarEntrada.jsp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(entradaData).toString(),
        })
            .then(response => response.text())
            .then(data => {
                showMessage('Entrada salva com sucesso!', 'success');
                entradaForm.reset();
                entradaValorInput.value = '';
                entradaModal.hide();
            })
            .catch(error => {
                showMessage('Erro ao salvar entrada. Tente novamente.', 'error');
                console.error('Erro ao enviar entrada ao JSP:', error);
            });
        */
    };

    // Lógica de validação e envio do formulário (Entrada)
    entradaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const descricao = document.getElementById('entradaDescricao').value.trim();
        const data = document.getElementById('entradaData').value;
        const conta = document.getElementById('entradaConta').value;
        const valorFormatted = entradaValorInput.value;
        const valor = parseCurrency(valorFormatted);

        if (!descricao || !data || !conta || isNaN(valor) || valor <= 0) {
            showMessage('Preencha todos os campos corretamente. O valor deve ser maior que zero.', 'error');
            return;
        }

        const entradaData = {
            descricao,
            data,
            conta,
            valor: valor.toFixed(2),
        };

        sendEntradaToBackend(entradaData);
    });

    // Função para atualizar o texto do botão de filtro
    const updateButtonText = (text) => {
        dropdownButton.querySelector('.subtitle-1').textContent = text;
        dropdownButton.classList.add('selected');
    };

    // Função para enviar o filtro ao back-end JSP
    const sendFilterToBackend = (filterData) => {
        console.log('Enviando filtro ao back-end JSP:', filterData);
        /*
        fetch('/lancamentosFiltro.jsp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(filterData).toString(),
        })
          .then(response => response.text())
          .then(data => {
            console.log('Resposta do JSP:', data);
            updateTable(data);
          })
          .catch(error => console.error('Erro ao enviar filtro ao JSP:', error));
        */
    };

    // Função para atualizar a tabela (placeholder)
    const updateTable = (data) => {
        console.log('Atualizando tabela com:', data);
        /*
        const parsedData = JSON.parse(data);
        tableBody.innerHTML = '';
        parsedData.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.data}</td>
            <td>${item.descricao}</td>
            <td>${item.conta}</td>
            <td style="color: ${item.valor >= 0 ? 'var(--green)' : 'var(--red)'};">${item.valor}</td>
            <td></td>
          `;
          tableBody.appendChild(row);
        });
        */
    };

    // Capturar cliques nos itens do dropdown
    dropdownMenu.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            e.preventDefault();
            const selectedValue = target.getAttribute('data-value');

            let filterType;
            if (['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].includes(selectedValue)) {
                filterType = 'month';
            } else if (['Últimos 30 dias', 'Últimos 60 dias', 'Últimos 90 dias'].includes(selectedValue)) {
                filterType = 'period';
            }

            const filterData = {
                filterType,
                value: selectedValue,
            };

            updateButtonText(selectedValue);
            sendFilterToBackend(filterData);
        }
    });

    // Atualizar o texto do botão e enviar filtro quando uma data personalizada é selecionada
    customDate.addEventListener('change', () => {
        const selectedDate = customDate.value;
        if (selectedDate) {
            const [year, month, day] = selectedDate.split('-');
            const formattedDate = `${parseInt(day)}/${parseInt(month)}/${year}`;
            updateButtonText(formattedDate);

            const filterData = {
                filterType: 'customDate',
                value: selectedDate,
            };

            sendFilterToBackend(filterData);
        }
    });
});