const inputTelefone = document.getElementById('recebe-telefone');
const botaoEnviar = document.getElementById('envia-telefone');
const listaTelefone = document.getElementById('lista-telefone');
const numerosLigados = document.getElementById('numeros-ligados');
const resultado = document.createElement('p');
const tituloTelefone = document.getElementById('titulo-telefone');
const recargaComprada = document.createElement('p');

let saldoMinutos = 10;
let saldoSegundos = 0;

botaoEnviar.addEventListener('click', (evento) => {
    evento.preventDefault();
    const numero = inputTelefone.value;

    if (inputTelefone.value.trim() !== '') {
        const numeroDeTelefone = document.createElement('li');
        const botaoLigar = document.createElement('button');
        botaoLigar.textContent = 'Discar';

        numeroDeTelefone.textContent = numero;
        listaTelefone.appendChild(numeroDeTelefone);
        numeroDeTelefone.appendChild(botaoLigar);

        inputTelefone.value = '';

        botaoLigar.addEventListener('click', () => {
            const saldoMensagem = verificarSaldo(numero);
            numeroDeTelefone.textContent = saldoMensagem;

            const botaoOk = document.createElement('button');
            botaoOk.textContent = 'Ok';
            numeroDeTelefone.appendChild(botaoOk);

            if (saldoMensagem.includes("sem saldo")) {
                const botaoRecarregar = document.createElement('button');
                botaoRecarregar.textContent = 'Recarregar';
                numeroDeTelefone.appendChild(botaoRecarregar);

                botaoRecarregar.addEventListener('click', () => {
                    botaoOk.remove();
                    tituloTelefone.textContent = 'Tabela de Recarga';

                    numeroDeTelefone.textContent = '';

                    const recargaDez = document.createElement('p');
                    const recargaQuinze = document.createElement('p');
                    const recargaVinte = document.createElement('p');
                    const recargaVinteCinco = document.createElement('p');
                    const inputValorRecarga = document.createElement('input');
                    const botaoComprarRecarga = document.createElement('button');

                    recargaDez.textContent = 'Recarregue já seu saldo por 10 reais e obtenha 15 minutos de ligação!';
                    recargaQuinze.textContent = 'Recarregue já seu saldo por 15 reais e obtenha 20 minutos de ligação!';
                    recargaVinte.textContent = 'Recarregue já seu saldo por 20 reais e obtenha 25 minutos de ligação!';
                    recargaVinteCinco.textContent = 'Recarregue já seu saldo por 25 reais e obtenha 30 minutos de ligação!';
                    inputValorRecarga.type = 'number';
                    inputValorRecarga.placeholder = 'Digite o valor da sua recarga.';
                    botaoComprarRecarga.textContent = 'Comprar';

                    numeroDeTelefone.appendChild(recargaDez);
                    numeroDeTelefone.appendChild(recargaQuinze);
                    numeroDeTelefone.appendChild(recargaVinte);
                    numeroDeTelefone.appendChild(recargaVinteCinco);
                    numeroDeTelefone.appendChild(inputValorRecarga);
                    numeroDeTelefone.appendChild(botaoComprarRecarga);

                    botaoComprarRecarga.addEventListener('click', () => {
                        const valorRecarga = parseInt(inputValorRecarga.value);
                        const botaoVoltar = document.createElement('button');

                        if ([10, 15, 20, 25].includes(valorRecarga)) {
                            saldoMinutos += valorRecarga + 5;

                            botaoVoltar.textContent = 'Voltar';
                            recargaComprada.textContent = 'Comprando...';
                            numeroDeTelefone.appendChild(recargaComprada);

                            setTimeout(() => {
                                recargaComprada.textContent = `Recarga feita com sucesso! Seu saldo atual é de ${saldoMinutos} minutos.`;
                                numeroDeTelefone.appendChild(botaoVoltar);
                            }, 3000);

                            botaoVoltar.addEventListener('click', () => {
                                tituloTelefone.textContent = 'Telefones';
                                numeroDeTelefone.remove();
                                botaoVoltar.remove();
                            });

                            inputValorRecarga.value = '';

                            numeroDeTelefone.removeChild(recargaDez);
                            numeroDeTelefone.removeChild(recargaQuinze);
                            numeroDeTelefone.removeChild(recargaVinte);
                            numeroDeTelefone.removeChild(recargaVinteCinco);
                            numeroDeTelefone.removeChild(inputValorRecarga);
                            numeroDeTelefone.removeChild(botaoComprarRecarga);
                        } else {
                            alert(`O número que você digitou (${inputValorRecarga.value}) não é válido. Consulte a tabela de recarga.`);
                        }
                    });
                });

                botaoOk.addEventListener('click', () => {
                    botaoOk.remove();
                    numeroDeTelefone.remove();
                });
            } else {
                botaoOk.addEventListener('click', () => {
                    numeroDeTelefone.textContent = `Você ligou para o número ${numero}`;
                    atrasarLigacao();

                    const numeroligado = document.createElement('li');
                    numeroligado.textContent = numero;
                    numerosLigados.appendChild(numeroligado);

                    const botaoDiscarNovamente = document.createElement('button');
                    botaoDiscarNovamente.textContent = 'Discar Novamente';

                    numeroDeTelefone.appendChild(resultado);
                    numeroDeTelefone.appendChild(botaoDiscarNovamente);

                    botaoOk.remove();

                    botaoDiscarNovamente.addEventListener('click', () => {
                        // Verifique se o saldo é zero antes de tentar discar novamente
                        if (saldoMinutos === 0 && saldoSegundos === 0) {
                            resultado.textContent = `Você está sem saldo.`;
                            numeroDeTelefone.textContent = 'Você está sem saldo.'
                        } else {
                            atrasarLigacao(); // Continue com a lógica original se houver saldo
                        }
                        
                    });
                });
            }
        });
    }
});

function randomNumber() {
    const respostaAleatoria = Math.floor(Math.random() * 2);
    const minutos = Math.floor(Math.random() * 10 + 1);
    const segundos = Math.floor(Math.random() * 60);

    if (respostaAleatoria === 1) {
        const duracaoChamada = `${minutos === 10 ? minutos : '0' + minutos}:${segundos < 10 ? '0' + segundos : segundos}s`;
        return { mensagem: `Ligação Aceita || Duração da Chamada: ${duracaoChamada}`, minutos, segundos };
    } else {
        return { mensagem: `Ligação Recusada`, minutos: 0, segundos: 0 };
    }
}

function atrasarLigacao() {
    resultado.textContent = 'Chamando...';

    setTimeout(() => {
        const resultadoChamada = randomNumber();
        resultado.textContent = resultadoChamada.mensagem;

        // Subtrai a duração da chamada do saldo restante
        if (resultadoChamada.mensagem.includes("Ligação Aceita")) {
            subtrairDuracao(resultadoChamada.minutos, resultadoChamada.segundos);
            resultado.textContent += ` || Saldo restante: ${saldoMinutos < 10 ? '0' + saldoMinutos : saldoMinutos}:${saldoSegundos < 10 ? '0' + saldoSegundos : saldoSegundos}s`;
        }
    }, 3000);
}

function subtrairDuracao(minutos, segundos) {
    let totalSegundos = saldoMinutos * 60 + saldoSegundos - (minutos * 60 + segundos);
    
    // Garantir que o saldo não fique negativo
    if (totalSegundos < 0) {
        totalSegundos = 0;
    }
    
    saldoMinutos = Math.floor(totalSegundos / 60);
    saldoSegundos = totalSegundos % 60;
}

function verificarSaldo(numero) {
    const respostaSaldo = Math.floor(Math.random() * 2);

    if (respostaSaldo === 1) {
        return `Você está discando para o número ${numero}. Aguarde...`;
    } else {
        return `Você está sem saldo.`;
    }
}
