<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />

    <link rel="stylesheet" href="color.css" />
    <link rel="stylesheet" href="configurarContas.css" />

    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&family=Roboto:wght@100&display=swap"
      rel="stylesheet"
    />

    <title>Clear Track - Cadastro</title>
  </head>
  <body class="bg-light">
    <div class="container py-4">
      <div
        class="container py-3 px-4 d-flex align-items-center gap-4 flex-wrap"
      >
        <div class="d-flex align-items-center gap-4 flex-wrap">
          <h5 class="fw-bold m-0">Clear Track</h5>

          <nav class="d-flex gap-2">
            <a href="../visao_geral/visaoGeral.html" class="nav-tab"
              >Visão geral</a
            >
            <a href="../lancamentos/lancamentos.html" class="nav-tab"
              >Lançamentos</a
            >
            <a href="#" class="nav-tab active">Configurar Contas</a>
          </nav>
        </div>
        <div class="mt-3 mt-md-0">
          <button
            class="btn btn-danger rounded-pill"
            data-bs-toggle="modal"
            data-bs-target="#modalConta"
          >
            Adicionar conta
          </button>
        </div>
      </div>
    </div>

    <!-- Conteúdo principal abaixo do header -->
    <main class="container px-4 py-4">
      <div class="mb-5">
        <h6 class="fw-bold">Contas</h6>
        <ul class="list-group border-0 rounded-0" id="lista-contas">
          <!-- Preenchido via JS -->
        </ul>
      </div>

      <div class="mb-5">
        <h6 class="fw-bold">Investimentos</h6>
        <ul class="list-group border-0 rounded-0" id="lista-investimentos">
          <!-- Preenchido via JS -->
        </ul>
      </div>

      <div class="mb-5">
        <h6 class="fw-bold">Cartão de crédito</h6>
        <ul class="list-group border-0 rounded-0" id="lista-cartoes">
          <!-- Preenchido via JS -->
        </ul>
      </div>
    </main>

    <!-- Modal de Adicionar Conta -->
    <div class="modal fade" id="modalConta" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">Adicionar</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="form-control mb-3"
              id="nomeConta"
              placeholder="Nome"
            />
            <select class="form-control" id="tipoConta">
              <option value="">Tipo de conta</option>
              <option value="conta">Conta</option>
              <option value="investimento">Investimento</option>
              <option value="cartao">Cartão de crédito</option>
            </select>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded-pill" id="btnSalvarConta">
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
    <script src="configurarContas.js"></script>
  </body>
</html>
