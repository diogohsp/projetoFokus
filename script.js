const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const iconePlayPausa = document.querySelector('.app__card-primary-butto-icon')
const botoes = document.querySelectorAll('.app__card-button')
const tempoNaTela = document.querySelector('#timer')
const startPauseBt= document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const beep = new Audio('/sons/beep.mp3')
const pause = new Audio('/sons/pause.mp3')
const play = new Audio('/sons/play.wav')

let tempDecorridoEmSegundos = 1500
let intervaloId = null

musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () =>{
    tempDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () =>{
    tempDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal um descanso curto,<br>
            <strong class="app__title-strong">dê uma respirada.</strong>`
            break;

        case "descanso-longo":
            titulo.innerHTML = `Que tal um descanso longo,<br>
            <strong class="app__title-strong">dê uma pausa para descansar.</strong>`
            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempDecorridoEmSegundos <= 0) {
        tocarSom(beep)
        alert('Tempo Finalizado')
        zerar()
        return
    }
    tempDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        tocarSom(pause)
        zerar()
        return
    }
    tocarSom(play)
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iconePlayPausa.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iconePlayPausa.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null
}

function tocarSom(som) {
    som.play()
}

function mostrarTempo() {
    const tempo = new Date(tempDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second:'2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`

}

mostrarTempo()
