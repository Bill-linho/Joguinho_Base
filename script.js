const mapaEl = document.getElementById("mapa");
const turnoTexto = document.getElementById("turno");

const LINHAS = 9;
const COLUNAS = 9;

let jogadorAtual = 1;

const terrenos = ["planicie", "floresta", "montanha"];
const mapa = [];

/* Geração procedural */
function gerarMapa() {
  for (let y = 0; y < LINHAS; y++) {
    const linhaEl = document.createElement("div");
    linhaEl.classList.add("linha");

    if (y % 2 !== 0) linhaEl.classList.add("par");

    mapa[y] = [];

    for (let x = 0; x < COLUNAS; x++) {
      const hex = document.createElement("div");
      hex.classList.add("hex");

      const terreno = terrenos[Math.floor(Math.random() * terrenos.length)];

      const territorio = {
        x,
        y,
        terreno,
        dono: null,
        tropas: 0,
        el: hex
      };

      hex.classList.add(terreno);
      hex.addEventListener("click", () => clicarHex(territorio));

      mapa[y][x] = territorio;
      linhaEl.appendChild(hex);
    }

    mapaEl.appendChild(linhaEl);
  }

  distribuirJogadores();
}

/* Distribuição inicial equilibrada */
function distribuirJogadores() {
  mapa[0][0].dono = 1;
  mapa[0][0].tropas = 5;
  mapa[0][0].el.classList.add("j1");

  mapa[LINHAS - 1][COLUNAS - 1].dono = 2;
  mapa[LINHAS - 1][COLUNAS - 1].tropas = 5;
  mapa[LINHAS - 1][COLUNAS - 1].el.classList.add("j2");

  atualizarTextos();
}

function atualizarTextos() {
  mapa.flat().forEach(t => {
    t.el.textContent = t.tropas > 0 ? t.tropas : "";
  });
}

function clicarHex(t) {
  console.log(
    `Hex (${t.x},${t.y}) | Terreno: ${t.terreno} | Dono: ${t.dono}`
  );
  expandir(t);
}

function expandir (t) {
  t.addEventListener("click", (hex) => {
    console.log(`Dominou terreno ${hex.x},${hex.y}`);
  })
  
}

/* Turnos */
document.getElementById("fimTurno").addEventListener("click", () => {
  jogadorAtual = jogadorAtual === 1 ? 2 : 1;
  turnoTexto.textContent = `Turno do Jogador ${jogadorAtual}`;
});

gerarMapa();
