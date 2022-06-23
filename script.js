const X_class = 'x'
const Circle_class = 'circle'
const Winning_combination = [
    [0,1,2],
    [3,,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const restartButton = document.getElementById('resetbutton')
const cellEliments = document.querySelectorAll('[data-cell]')
const winningMessageTextEliment = document.querySelector('[data-winning-massage-text]')
const winningMessageEliment = document.getElementById('WinningMassage')
const board = document.getElementById('board')
let circleTurn

startGame()

restartButton.addEventListener('click',startGame)

function startGame(){
    circleTurn = false
    cellEliments.forEach(cell=> {
        cell.classList.remove(X_class)
        cell.classList.remove(Circle_class)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{once: true})
    })
    setBoardHoverClass()
    winningMessageEliment.classList.remove('show')
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? Circle_class : X_class
    placeMark(cell,currentClass)
    if (checkWin(currentClass)){
        endgame(false)
    }else if (isDraw()){
        endgame(true)
    }else{
        swapTrun()
        setBoardHoverClass()
    }
}

function endgame(draw){
    if(draw){
        winningMessageTextEliment.innerText = 'Draw!'
    }else{
        winningMessageTextEliment.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageEliment.classList.add('show')
}

function isDraw(){
    return [...cellEliments].every(cell => {
        return cell.classList.contains(X_class) || cell.classList.contains(Circle_class)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}

function swapTrun() {
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_class)
    board.classList.remove(Circle_class)
    if (circleTurn){
        board.classList.add(Circle_class)
    }else{
        board.classList.add(X_class)
    }
}

function checkWin(currentClass){
    return Winning_combination.some(combination => {
        return combination.every(index => {
            return cellEliments[index].classList.contains(currentClass)
        })
    })
    }