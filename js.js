
    // JavaScript

//referenciar aos elementos do html criando variaveis
const menu = document.querySelector("#menu");
const sideMenu = document.querySelector("#sideMenu");

//fazer referencia as barras do menu de modo individual
const barra1 = document.querySelector("#barra1");
const barra2 = document.querySelector("#barra2");
const barra3 = document.querySelector("#barra3");

//fazer referencia as casas
const casa = document.getElementsByClassName("casa");

//referencia ao botao
const restartBtn = document.querySelector("#restart")

//criar 2 arrays
var playerOneSelections = [];
var playerTwoSelections = [];

menu.addEventListener("click", toggleMenu)

function toggleMenu() {
  sideMenu.classList.toggle("show");
  barra1.classList.toggle("barra1");
  barra2.classList.toggle("barra2");
  barra3.classList.toggle("barra3");
  menu.classList.toggle("centralizar")
}

//definir o primeiro jogador
var vez = 1;
var vencedor = null;

for(var i = 0; i < casa.length; i++) {
    casa[i].addEventListener("click", addElement)
}

restartBtn.addEventListener('click', restartGame)
restartBtn.addEventListener("click", () => {
    restartBtn.style.display="none";
})

//criar array que contem os elementos selecionadosn (o proposito dessas arrays sao para ditar selecao de casas)
var casasJogador1 = [];
var casasJogador2 = [];

function addElement() {
    if(vez == 1) {
        //se acasa esta disponivel, entao adicionar-la ao jogador 1
        if(!casasJogador2.includes(this.id) && !casasJogador1.includes(this.id))  {
            const casaSelecionada = this.id;
            const split = casaSelecionada.split("");
            casasJogador1.push(this.id);
            this.style.backgroundImage = "url('x.png')";
            this.style.backgroundSize = "cover";


            //para playerOneSelection
            var casa2 = split[4];
            var parse = parseInt(casa2) // "1" => 1
            playerOneSelections.push(parse);
        } else {
            //se acasa nao esta disponivel, entao nao faz nada
            return false;
        }
            // se a casa esta disponivel, entao adicionar-la ao jogador 2
        } else if (!casasJogador1.includes(this.id) && !casasJogador2.includes(this.id)){
            const casaSelecionada = this.id;
            const split = casaSelecionada.split("");
            casasJogador2.push(this.id);
            this.style.backgroundImage="url('o.png')";
            this.style.backgroundSize="cover";

            //para playerTwoSelection
            var casa2 = split[4];
            var parse = parseInt(casa2);
            playerTwoSelections.push(parse);
        } else {
            // se a casa nao esta disponivel, nao faz nada
            return false;
        }
        //alterne a vez
        vez = (vez == 1? 2:1);    

        //chamar funcao checar vencedor para ver se ha um vencedor
        checarVencedor()
    } 


    function checarVencedor() {
        //criar as combinacoes possiveis de ganhar o jogo
        const combinacoesVitoria = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], // linhas
            [1, 4, 7], [2, 5, 8], [3, 6, 9], // colunas
            [1, 5, 9], [3, 5, 7] // diagonais
        ];

        //enquanto ouver opcoes de combinacoes, a parrtir do elemento 0, faca um loop
        for(let i = 0; i < combinacoesVitoria.length; i++) {
            const [a, b, c] = combinacoesVitoria[i];
            // porcao de codigo para determinar jogador 1 como ganhador
            if(
                playerOneSelections.includes(a) &&
                playerOneSelections.includes(b) &&
                playerOneSelections.includes(c)
            ) {
                // return 'player one';
                vencedor = 1;
                setTimeout(() => {
                    window.alert("o jogador 1 ganhou");
                }, 500);

                //mostra botao para reiniciar
                restartBtn.style.display="block";
                //impossibilita continuar clicando nas casas
                removeClickEvent()

            // porcao de codigo para determinar jogador 2 como ganhador
            } else if (
                playerTwoSelections.includes(a) &&
                playerTwoSelections.includes(b) &&
                playerTwoSelections.includes(c)
            ) {
                vencedor = 2;
                setTimeout(() => {
                    window.alert("o jogador " + vencedor + " ganhou");
                }, 500);
                //mostra botao para reiniciar
                restartBtn.style.display="block";
                //impossibilita continuar clicando nas casas
                removeClickEvent()
            }
            // porcao de codigo para determinar um empate
            else if (
                playerOneSelections.length + playerTwoSelections.length == 9 && vencedor === null
            ){
                window.alert("empatou")
                restartBtn.style.display="block";
                //interromper o for loop caso haja um empate
                break
            }
        }
    }


    function restartGame() {
        //voltar a vez para jogador 1
        vez = 1
            //limpar arrays
            playerOneSelections = [];
            playerTwoSelections = [];
            casasJogador1 = [];
            casasJogador2 = [];
            //remover o vencedor
            vencedor = null;

        for(var i = 0; i < casa.length; i++) {
            casa[i].addEventListener("click", addElement);
            casa[i].style.backgroundImage = "none";
        }
    }

    function removeClickEvent() {
        for(var i = 0; i < casa.length; i++) {
            casa[i].removeEventListener("click", addElement)
        }
    }