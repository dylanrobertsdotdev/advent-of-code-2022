import getData from './lib/getData.js'

const getPriority = (l: string): number => {
    const offset = l.toUpperCase() === l ? 38 : 96
    return l.charCodeAt(0) - offset
}

// part 1
(async () => {
    const data = await getData('rucksacks.txt')
    const rucksacks = data.split('\n').map(rucksack => {
        const size = rucksack.length / 2
        return [rucksack.substring(0, size), rucksack.substring(size)]
    })
    let sum = 0
    rucksacks.forEach(([first, second]) => {
        const lookup = {}
        first.split('').forEach(letter => {
            lookup[letter] = lookup[letter] ? lookup[letter] + 1 : 1
        })
        const invalidLetter = second.split('').find(letter => lookup[letter])
        if (invalidLetter) sum += getPriority(invalidLetter)
    })
    console.log('part 1: ' + sum)
})();

// part 2
(async () => {
    const data = await getData('rucksacks.txt')
    const rucksacks = data.split('\n')
    const GROUP_SIZE = 3
    let common = {}
    let start = {}
    let sum = 0
    rucksacks.forEach((rucksack, i) => {
        if (i % GROUP_SIZE === 0) {
            rucksack.split('').forEach(letter => {
                start[letter] = true
            })
        } else if (i % GROUP_SIZE === 1) {
            rucksack.split('').forEach(letter => {
                if (start[letter]) common[letter] = true
            })
        } else {
            const badge = rucksack.split('').find(letter => common[letter])
            if (badge) sum += getPriority(badge)
            start = {}
            common = {}
        }
    })
    console.log('part 2: ' + sum)
})();
