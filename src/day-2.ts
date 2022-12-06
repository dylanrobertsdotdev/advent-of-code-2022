import getData from './lib/getData.js'

const points = {
    rock: 1,
    paper: 2,
    scissors: 3,
    lose: 0,
    draw: 3,
    win: 6
}

const isRock = (l: string) => l === 'A' || l === 'X'
const isPaper = (l: string) => l === 'B' || l === 'Y'
const isScissors = (l: string) => l === 'C' || l === 'Z'
const isLose = (l: string) => l === 'X'
const isDraw = (l: string) => l === 'Y'
const isWin = (l: string) => l === 'Z'

const getPoints = (l: string): number => {
    if (isRock(l)) return points.rock
    if (isPaper(l)) return points.paper
    return points.scissors
}

// part 1
(async () => {
    const data = await getData('rock-paper-scissors.txt')
    const rounds = data.split('\n')
    let total = 0
    rounds.forEach(round => {
        const [theirChoice, myChoice] = round.split(' ')
        total += getPoints(myChoice)

        if (isRock(theirChoice)) {
            if (isRock(myChoice)) total += points.draw
            if (isPaper(myChoice)) total += points.win
        } else if (isPaper(theirChoice)) {
            if (isPaper(myChoice)) total += points.draw
            if (isScissors(myChoice)) total += points.win
        } else if (isScissors(theirChoice)) {
            if (isScissors(myChoice)) total += points.draw
            if (isRock(myChoice)) total += points.win
        }
    })
    console.log('part 1: ' + total)
})();

// part 2
(async () => {
    const data = await getData('rock-paper-scissors.txt')
    const rounds = data.split('\n')
    let total = 0
    rounds.forEach(round => {
        const [theirChoice, outcome] = round.split(' ')

        if (isLose(outcome)) {
            if (isRock(theirChoice)) total += points.scissors
            else if (isPaper(theirChoice)) total += points.rock
            else if (isScissors(theirChoice)) total += points.paper

            total += points.lose
        }
        else if (isDraw(outcome)) {
            if (isRock(theirChoice)) total += points.rock
            else if (isPaper(theirChoice)) total += points.paper
            else if (isScissors(theirChoice)) total += points.scissors

            total += points.draw
        } else if (isWin(outcome)) {
            if (isRock(theirChoice)) total += points.paper
            else if (isPaper(theirChoice)) total += points.scissors
            else if (isScissors(theirChoice)) total += points.rock

            total += points.win
        }
    })
    console.log('part 2: ' + total)
})();
