const crypto = require('crypto')
const fs = require('fs')
const path = require('path')


const fileHash = (dir) => {
    let file
    try {
        file = fs.readdirSync(dir)
    } catch (e) { }
    let map = {}
    file.forEach(filename => {
        if (filename.indexOf('.') == 0) {
            return
        }
        const filepath = path.resolve(dir, filename)
        const stat = fs.statSync(filepath)
        if (stat.isFile()) {
            map[filepath] = getHash(filepath)

        } else if (stat.isDirectory()) {
            map = { ...map, ...fileHash(path.resolve(dir, filename)) }
        }
    })
    return map
}

const getHash = (path) => {
    let file
    try {
        file = fs.readFileSync(path)
    } catch (e) {

    }
    return crypto.createHash('md5').update(file).digest('hex')
}

module.exports = fileHash