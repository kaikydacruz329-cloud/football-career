// =====================================================
// FOOTBALL CAREER SIMULATOR
// =====================================================


// -----------------------------------------------------
// VARIÁVEIS
// -----------------------------------------------------

let jogador = null;


// -----------------------------------------------------
// ANO INICIAL
// -----------------------------------------------------

let anoAtual = 2026;


// -----------------------------------------------------
// CRIAR JOGADOR
// -----------------------------------------------------

function criarJogador() {

    const nome = document.getElementById("nome").value.trim();

    if (nome === "") {

        alert("Digite o nome do jogador.");

        return;

    }


    jogador = {

        nome: nome,

        idade: Number(
            document.getElementById("idade").value
        ),

        posicao:
            document.getElementById("posicao").value,

        pais:
            document.getElementById("pais").value,

        clube:
            document.getElementById("clube").value,


        // ATRIBUTOS

        overall: 65,

        potencial:
            Math.floor(
                Math.random() * 16
            ) + 80,


        // ESTATÍSTICAS

        jogos: 0,

        gols: 0,

        assistencias: 0,


        // ECONOMIA

        valor: 1000000,


        // CONQUISTAS

        titulos: [],

        premios: [],


        // HISTÓRICO

        temporadas: [],

        clubes: [],


        // CONTROLE

        temporadaAtual: 2026

    };


    jogador.clubes.push({
        nome: jogador.clube,
        inicio: 2026
    });


    salvarJogo();

    mostrarCarreira();

    atualizarTela();

}


// -----------------------------------------------------
// MOSTRAR CARREIRA
// -----------------------------------------------------

function mostrarCarreira() {

    document
        .getElementById("telaCriacao")
        .classList.add("escondido");


    document
        .getElementById("telaCarreira")
        .classList.remove("escondido");

}


// -----------------------------------------------------
// ATUALIZAR TELA
// -----------------------------------------------------

function atualizarTela() {

    if (!jogador) return;


    document.getElementById(
        "nomeJogador"
    ).textContent = jogador.nome;


    document.getElementById(
        "posicaoJogador"
    ).textContent =
        traduzirPosicao(jogador.posicao);


    document.getElementById(
        "idadeJogador"
    ).textContent =
        jogador.idade;


    document.getElementById(
        "paisJogador"
    ).textContent =
        jogador.pais;


    document.getElementById(
        "clubeJogador"
    ).textContent =
        jogador.clube;


    document.getElementById(
        "overall"
    ).textContent =
        jogador.overall;


    document.getElementById(
        "jogos"
    ).textContent =
        jogador.jogos;


    document.getElementById(
        "gols"
    ).textContent =
        jogador.gols;


    document.getElementById(
        "assistencias"
    ).textContent =
        jogador.assistencias;


    document.getElementById(
        "titulos"
    ).textContent =
        jogador.titulos.length;


    document.getElementById(
        "premios"
    ).textContent =
        jogador.premios.length;


    document.getElementById(
        "valor"
    ).textContent =
        formatarDinheiro(jogador.valor);


    document.getElementById(
        "temporada"
    ).textContent =
        `${jogador.temporadaAtual}/${jogador.temporadaAtual + 1}`;


    atualizarHistorico();

    atualizarClubes();

    atualizarConquistas();

}


// -----------------------------------------------------
// TRADUZIR POSIÇÃO
// -----------------------------------------------------

function traduzirPosicao(posicao) {

    const posicoes = {

        ATA: "Atacante",

        MEI: "Meio-campista",

        PE: "Ponta Esquerda",

        PD: "Ponta Direita",

        VOL: "Volante",

        ZAG: "Zagueiro",

        LE: "Lateral Esquerdo",

        LD: "Lateral Direito",

        GOL: "Goleiro"

    };


    return posicoes[posicao] || posicao;

}


// -----------------------------------------------------
// SIMULAR TEMPORADA
// -----------------------------------------------------

function simularTemporada() {

    if (!jogador) return;


    if (jogador.idade >= 40) {

        alert(
            "Seu jogador chegou ao fim da carreira!"
        );

        return;

    }


    const botao =
        document.getElementById(
            "botaoSimular"
        );


    botao.disabled = true;

    botao.textContent =
        "SIMULANDO...";


    setTimeout(() => {

        executarTemporada();


        botao.disabled = false;

        botao.textContent =
            "▶ SIMULAR TEMPORADA";

    }, 800);

}


// -----------------------------------------------------
// EXECUTAR TEMPORADA
// -----------------------------------------------------

function executarTemporada() {


    let idade = jogador.idade;


    // -----------------------------------------------
    // JOGOS
    // -----------------------------------------------

    let jogos =
        Math.floor(
            Math.random() * 20
        ) + 25;


    // -----------------------------------------------
    // GOLS
    // -----------------------------------------------

    let gols = calcularGols(jogos);


    // -----------------------------------------------
    // ASSISTÊNCIAS
    // -----------------------------------------------

    let assistencias =
        calcularAssistencias(jogos);


    // -----------------------------------------------
    // NOTA
    // -----------------------------------------------

    let nota =
        (
            6.5 +
            Math.random() * 1.5
        ).toFixed(2);


    // -----------------------------------------------
    // EVOLUÇÃO
    // -----------------------------------------------

    let evolucao = calcularEvolucao();


    jogador.overall += evolucao;


    // Não deixa ultrapassar 99

    if (jogador.overall > 99) {

        jogador.overall = 99;

    }


    // -----------------------------------------------
    // ESTATÍSTICAS
    // -----------------------------------------------

    jogador.jogos += jogos;

    jogador.gols += gols;

    jogador.assistencias +=
        assistencias;


    // -----------------------------------------------
    // VALOR DE MERCADO
    // -----------------------------------------------

    atualizarValor();


    // -----------------------------------------------
    // ACONTECIMENTOS
    // -----------------------------------------------

    let acontecimentos =
        gerarAcontecimentos(
            nota,
            gols
        );


    // -----------------------------------------------
    // TÍTULOS
    // -----------------------------------------------

    let titulos =
        gerarTitulos();


    // -----------------------------------------------
    // PRÊMIOS
    // -----------------------------------------------

    let premios =
        gerarPremios(
            gols,
            nota
        );


    // -----------------------------------------------
    // HISTÓRICO
    // -----------------------------------------------

    jogador.temporadas.push({

        temporada:
            `${jogador.temporadaAtual}/${jogador.temporadaAtual + 1}`,

        clube:
            jogador.clube,

        jogos:
            jogos,

        gols:
            gols,

        assistencias:
            assistencias,

        nota:
            nota,

        overall:
            jogador.overall

    });


    // -----------------------------------------------
    // MOSTRAR RESULTADO
    // -----------------------------------------------

    mostrarResultado(
        jogos,
        gols,
        assistencias,
        nota,
        acontecimentos,
        titulos,
        premios
    );


    // -----------------------------------------------
    // PASSAR PARA PRÓXIMA TEMPORADA
    // -----------------------------------------------

    jogador.idade++;

    jogador.temporadaAtual++;


    verificarTransferencia();


    salvarJogo();

    atualizarTela();

}


// -----------------------------------------------------
// CALCULAR GOLS
// -----------------------------------------------------

function calcularGols(jogos) {

    let multiplicador = 1;


    if (
        jogador.posicao === "ATA"
    ) {

        multiplicador = 0.45;

    }

    else if (
        jogador.posicao === "PE" ||
        jogador.posicao === "PD"
    ) {

        multiplicador = 0.35;

    }

    else if (
        jogador.posicao === "MEI"
    ) {

        multiplicador = 0.22;

    }

    else if (
        jogador.posicao === "VOL"
    ) {

        multiplicador = 0.10;

    }

    else if (
        jogador.posicao === "ZAG"
    ) {

        multiplicador = 0.05;

    }

    else if (
        jogador.posicao === "LE" ||
        jogador.posicao === "LD"
    ) {

        multiplicador = 0.07;

    }

    else if (
        jogador.posicao === "GOL"
    ) {

        multiplicador = 0;

    }


    let qualidade =
        jogador.overall / 70;


    return Math.floor(
        jogos *
        multiplicador *
        qualidade *
        (0.7 + Math.random() * 0.7)
    );

}


// -----------------------------------------------------
// CALCULAR ASSISTÊNCIAS
// -----------------------------------------------------

function calcularAssistencias(jogos) {

    let multiplicador = 0.15;


    if (
        jogador.posicao === "MEI"
    ) {

        multiplicador = 0.35;

    }

    else if (
        jogador.posicao === "PE" ||
        jogador.posicao === "PD"
    ) {

        multiplicador = 0.30;

    }

    else if (
        jogador.posicao === "ATA"
    ) {

        multiplicador = 0.20;

    }

    else if (
        jogador.posicao === "VOL"
    ) {

        multiplicador = 0.20;

    }


    let qualidade =
        jogador.overall / 70;


    return Math.floor(
        jogos *
        multiplicador *
        qualidade *
        (0.7 + Math.random() * 0.7)
    );

}


// -----------------------------------------------------
// EVOLUÇÃO
// -----------------------------------------------------

function calcularEvolucao() {

    let evolucao = 0;


    if (jogador.idade <= 20) {

        evolucao =
            Math.floor(
                Math.random() * 4
            ) + 1;

    }

    else if (jogador.idade <= 24) {

        evolucao =
            Math.floor(
                Math.random() * 3
            );

    }

    else if (jogador.idade <= 29) {

        evolucao =
            Math.floor(
                Math.random() * 2
            );

    }

    else if (jogador.idade <= 33) {

        evolucao =
            Math.floor(
                Math.random() * 2
            ) - 1;

    }

    else {

        evolucao =
            Math.floor(
                Math.random() * 3
            ) - 2;

    }


    // Respeita o potencial

    if (
        jogador.overall >= jogador.potencial
    ) {

        evolucao = Math.min(
            evolucao,
            1
        );

    }


    return evolucao;

}


// -----------------------------------------------------
// VALOR DE MERCADO
// -----------------------------------------------------

function atualizarValor() {

    jogador.valor =
        jogador.overall *
        jogador.overall *
        20000;


    // Jogadores jovens valem mais

    if (jogador.idade <= 22) {

        jogador.valor *= 1.25;

    }


    if (jogador.valor < 100000) {

        jogador.valor = 100000;

    }

}


// -----------------------------------------------------
// ACONTECIMENTOS
// -----------------------------------------------------

function gerarAcontecimentos(
    nota,
    gols
) {

    let acontecimentos = [];


    if (gols >= 20) {

        acontecimentos.push(
            "🔥 Temporada espetacular! Você marcou mais de 20 gols."
        );

    }

    else if (gols >= 10) {

        acontecimentos.push(
            "⭐ Boa temporada. Você terminou com números importantes."
        );

    }

    else {

        acontecimentos.push(
            "📈 Temporada de aprendizado e evolução."
        );

    }


    if (jogador.overall >= 80) {

        acontecimentos.push(
            "🌟 Você se tornou um dos principais jogadores do elenco."
        );

    }


    if (Math.random() < 0.08) {

        acontecimentos.push(
            "🩹 Você sofreu uma pequena lesão durante a temporada."
        );

    }


    if (Math.random() < 0.10) {

        acontecimentos.push(
            "🇧🇷 Você foi observado pela seleção nacional."
        );

    }


    return acontecimentos;

}


// -----------------------------------------------------
// TÍTULOS
// -----------------------------------------------------

function gerarTitulos() {

    let titulos = [];


    let chance =
        Math.random();


    if (chance < 0.30) {

        let titulo;


        if (
            jogador.clube === "Corinthians" ||
            jogador.clube === "Palmeiras" ||
            jogador.clube === "Flamengo" ||
            jogador.clube === "São Paulo" ||
            jogador.clube === "Santos"
        ) {

            titulo =
                "🏆 Campeonato Brasileiro";

        }

        else {

            titulo =
                "🏆 Campeonato Nacional";

        }


        jogador.titulos.push({

            nome: titulo,

            temporada:
                `${jogador.temporadaAtual}/${jogador.temporadaAtual + 1}`

        });


        titulos.push(titulo);

    }


    if (
        Math.random() < 0.15
    ) {

        let titulo =
            "🏆 Copa Nacional";


        jogador.titulos.push({

            nome: titulo,

            temporada:
                `${jogador.temporadaAtual}/${jogador.temporadaAtual + 1}`

        });


        titulos.push(titulo);

    }


    return titulos;

}


// -----------------------------------------------------
// PRÊMIOS
// -----------------------------------------------------

function gerarPremios(
    gols,
    nota
) {

    let premios = [];


    if (
        gols >= 20 &&
        Number(nota) >= 7.5
    ) {

        let premio =
            "🥇 Melhor jogador da temporada";


        jogador.premios.push({

            nome: premio,

            temporada:
                `${jogador.temporadaAtual}/${jogador.temporadaAtual + 1}`

        });


        premios.push(premio);

    }


    if (
        gols >= 15
    ) {

        let premio =
            "⚽ Artilheiro do clube";


        jogador.premios.push({

            nome: premio,

            temporada:
                `${jogador.temporadaAtual}/${jogador.temporadaAtual + 1}`

        });


        premios.push(premio);

    }


    return premios;

}


// -----------------------------------------------------
// RESULTADO
// -----------------------------------------------------

function mostrarResultado(
    jogos,
    gols,
    assistencias,
    nota,
    acontecimentos,
    titulos,
    premios
) {

    const resultado =
        document.getElementById(
            "resultado"
        );


    resultado.classList.remove(
        "escondido"
    );


    document.getElementById(
        "resultadoTitulo"
    ).textContent =
        escolherTitulo(gols);


    document.getElementById(
        "temporadaJogos"
    ).textContent =
        jogos;


    document.getElementById(
        "temporadaGols"
    ).textContent =
        gols;


    document.getElementById(
        "temporadaAssistencias"
    ).textContent =
        assistencias;


    document.getElementById(
        "temporadaNota"
    ).textContent =
        nota;


    const container =
        document.getElementById(
            "acontecimentos"
        );


    container.innerHTML = "";


    acontecimentos.forEach(
        acontecimento => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "acontecimento";

            div.textContent =
                acontecimento;

            container.appendChild(
                div
            );

        }
    );


    titulos.forEach(
        titulo => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "acontecimento";

            div.textContent =
                titulo;

            container.appendChild(
                div
            );

        }
    );


    premios.forEach(
        premio => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "acontecimento";

            div.textContent =
                premio;

            container.appendChild(
                div
            );

        }
    );

}


// -----------------------------------------------------
// TÍTULO DA TEMPORADA
// -----------------------------------------------------

function escolherTitulo(gols) {

    if (gols >= 25) {

        return "🔥 TEMPORADA HISTÓRICA";

    }

    if (gols >= 15) {

        return "⭐ GRANDE TEMPORADA";

    }

    if (gols >= 8) {

        return "👏 BOA TEMPORADA";

    }

    return "📈 TEMPORADA DE EVOLUÇÃO";

}


// -----------------------------------------------------
// TRANSFERÊNCIAS
// -----------------------------------------------------

function verificarTransferencia() {

    if (
        jogador.overall < 75
    ) {

        return;

    }


    if (
        Math.random() > 0.35
    ) {

        return;

    }


    const clubes = [

        "Real Madrid",

        "Barcelona",

        "Manchester City",

        "Liverpool",

        "Bayern de Munique",

        "PSG",

        "Milan",

        "Arsenal",

        "Chelsea"

    ];


    let novoClube =
        clubes[
            Math.floor(
                Math.random() *
                clubes.length
            )
        ];


    if (
        novoClube ===
        jogador.clube
    ) {

        return;

    }


    let aceitar =
        confirm(
            `📨 PROPOSTA DE TRANSFERÊNCIA\n\n` +

            `${novoClube} quer contratar ${jogador.nome}.\n\n` +

            `Valor aproximado: ${formatarDinheiro(
                jogador.valor
            )}\n\n` +

            `Deseja aceitar a transferência?`
        );


    if (aceitar) {

        jogador.clube =
            novoClube;


        jogador.clubes.push({

            nome:
                novoClube,

            inicio:
                jogador.temporadaAtual

        });


        alert(
            `🔄 TRANSFERÊNCIA REALIZADA!\n\n` +

            `${jogador.nome} agora joga no ${novoClube}.`
        );

    }

}


// -----------------------------------------------------
// HISTÓRICO
// -----------------------------------------------------

function atualizarHistorico() {

    const container =
        document.getElementById(
            "historico"
        );


    if (
        jogador.temporadas.length === 0
    ) {

        container.innerHTML =
            `<p class="vazio">
                Sua carreira ainda não possui temporadas.
            </p>`;

        return;

    }


    container.innerHTML = "";


    jogador.temporadas
        .slice()
        .reverse()
        .forEach(temporada => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "temporada-historico";


            div.innerHTML = `

                <strong>
                    ${temporada.temporada}
                </strong>

                <span>
                    ${temporada.clube}
                </span>

                <span>
                    ${temporada.jogos} jogos
                </span>

                <span>
                    ${temporada.gols} gols
                </span>

                <span>
                    ${temporada.assistencias} assists.
                </span>

            `;


            container.appendChild(
                div
            );

        });

}


// -----------------------------------------------------
// CLUBES
// -----------------------------------------------------

function atualizarClubes() {

    const container =
        document.getElementById(
            "clubes"
        );


    container.innerHTML = "";


    jogador.clubes.forEach(
        clube => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "clube-card";


            div.innerHTML = `

                <h3>
                    ${clube.nome}
                </h3>

                <p>
                    Desde ${clube.inicio}
                </p>

            `;


            container.appendChild(
                div
            );

        }
    );

}


// -----------------------------------------------------
// CONQUISTAS
// -----------------------------------------------------

function atualizarConquistas() {

    const listaTitulos =
        document.getElementById(
            "listaTitulos"
        );


    const listaPremios =
        document.getElementById(
            "listaPremios"
        );


    listaTitulos.innerHTML = "";


    listaPremios.innerHTML = "";


    if (
        jogador.titulos.length === 0
    ) {

        listaTitulos.innerHTML =
            "<li>Nenhum título ainda.</li>";

    }

    else {

        jogador.titulos
            .slice()
            .reverse()
            .forEach(titulo => {

                const li =
                    document.createElement(
                        "li"
                    );


                li.textContent =
                    `${titulo.nome} — ${titulo.temporada}`;


                listaTitulos.appendChild(
                    li
                );

            });

    }


    if (
        jogador.premios.length === 0
    ) {

        listaPremios.innerHTML =
            "<li>Nenhum prêmio ainda.</li>";

    }

    else {

        jogador.premios
            .slice()
            .reverse()
            .forEach(premio => {

                const li =
                    document.createElement(
                        "li"
                    );


                li.textContent =
                    `${premio.nome} — ${premio.temporada}`;


                listaPremios.appendChild(
                    li
                );

            });

    }

}


// -----------------------------------------------------
// FORMATAR DINHEIRO
// -----------------------------------------------------

function formatarDinheiro(valor) {

    if (valor >= 1000000000) {

        return `€ ${(valor / 1000000000).toFixed(1)}B`;

    }


    if (valor >= 1000000) {

        return `€ ${(valor / 1000000).toFixed(1)}M`;

    }


    if (valor >= 1000) {

        return `€ ${(valor / 1000).toFixed(0)}K`;

    }


    return `€ ${valor}`;

}


// -----------------------------------------------------
// NOVA CARREIRA
// -----------------------------------------------------

function novoJogo() {

    const confirmar =
        confirm(
            "Deseja realmente começar uma nova carreira?"
        );


    if (!confirmar) {

        return;

    }


    localStorage.removeItem(
        "footballCareer"
    );


    location.reload();

}


// -----------------------------------------------------
// SALVAR JOGO
// -----------------------------------------------------

function salvarJogo() {

    localStorage.setItem(
        "footballCareer",
        JSON.stringify(jogador)
    );

}


// -----------------------------------------------------
// CARREGAR JOGO
// -----------------------------------------------------

function carregarJogo() {

    const salvo =
        localStorage.getItem(
            "footballCareer"
        );


    if (!salvo) {

        return;

    }


    jogador =
        JSON.parse(salvo);


    mostrarCarreira();

    atualizarTela();

}


// -----------------------------------------------------
// INICIAR
// -----------------------------------------------------

window.addEventListener(
    "load",
    carregarJogo
);