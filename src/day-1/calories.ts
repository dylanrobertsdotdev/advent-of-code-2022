import fs from 'fs/promises'
import path from 'path'

const getData = async () => {
    const file = path.join(process.cwd(), 'src', 'day-1', 'calories.txt')
    return await fs.readFile(file, { encoding: 'utf-8' })
}

// Finds the elf with the greatest number of calories
(async () => {
    const data = await getData()
    let count = 0
    let max = Number.MIN_VALUE
    data.split('\n').forEach(item => {
        if (item === '') {
            max = Math.max(max, count)
            count = 0
        } else {
            count += Number(item)
        }
    })
    console.log(max)
})();

// Finds the top 3 elves with the greatest number of calories
(async () => {
    const data = await getData()
    let count = 0
    let top = [Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE]
    data.split('\n').forEach(item => {
        if (item === '') {
            if (count > top[0]) {
                top[2] = top[1]
                top[1] = top[0]
                top[0] = count
            } else if (count > top[1]) {
                top[2] = top[1]
                top[1] = count
            } else if (count > top[2]) {
                top[2] = count
            }
            count = 0
        } else {
            count += Number(item)
        }
    })
    console.log(top[0] + top[1] + top[2])
})();
