const mapaEl = document.getElementById("mapa");
const turnoTexto = document.getElementById("turno");

let jogadorAtual = 1;
let selecionado = null;

const TOTAL = 15;
const mapa = [];

function criarMapa() {
  for (let i = 0; i < TOTAL; i++) {
    const hex = document.createElement("div");
    hex.classList.add("hex");

    const territorio = {
      dono: i < TOTAL / 2 ? 1 : 2,
      tropas: Math.floor(Math.random() * 5) + 1,
      el: hex
    };

    atualizarVisual(territorio);

    hex.addEventListener("click", () => clicarHex(territorio));
    mapa.push(territorio);
    mapaEl.appendChild(hex);
  }
}

function atualizarVisual(t) {
  t.el.className = "hex";
  t.el.classList.add(t.dono === 1 ? "j1" : "j2");
  t.el.textContent = t.tropas;
}

function clicarHex(t) {
  // Selecionar território próprio
  if (!selecionado && t.dono === jogadorAtual) {
    selecionado = t;
    t.el.classList.add("selecionado");
    return;
  }

  // Atacar
  if (selecionado && t !== selecionado && t.dono !== jogadorAtual) {
    atacar(selecionado, t);
    limparSelecao();
  }
}

function atacar(atacante, defensor) {
  if (atacante.tropas <= 1) return;

  const ataque = atacante.tropas - 1;

  if (ataque > defensor.tropas) {
    defensor.dono = jogadorAtual;
    defensor.tropas = ataque - defensor.tropas;
    atacante.tropas = 1;
  } else {
    defensor.tropas -= ataque;
    atacante.tropas = 1;
  }

  atualizarVisual(atacante);
  atualizarVisual(defensor);
}

function limparSelecao() {
  if (selecionado) {
    selecionado.el.classList.remove("selecionado");
    selecionado = null;
  }
}

document.getElementById("fimTurno").addEventListener("click", () => {
  limparSelecao();
  jogadorAtual = jogadorAtual === 1 ? 2 : 1;
  turnoTexto.textContent = `Turno do Jogador ${jogadorAtual}`;
});

criarMapa();
