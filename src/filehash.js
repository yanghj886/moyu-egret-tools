const crypto = require('crypto')
const fs = require('fs')
const path = require('path')


const getDirTree = (dir) => {
    let file
    try {
        file = fs.readdirSync(dir)
    } catch (e) { }
    let arr = {}
    file.forEach(filename => {
        if (filename.indexOf('.') == 0) {
            return
        }
        const filepath = path.join(dir, filename)
        const stat = fs.statSync(filepath)
        if (stat.isFile()) {
            arr.push({
                name: `${dir}/${filename}`,
                hash: getFileHash(filepath)
            })
        } else if (stat.isDirectory()) {
            arr = [...arr, ...getDirTree(path.join(dir, filename))]
        }
    })
    return arr
}

const getFileHash = (path) => {
    let file
    try {
        file = fs.readFileSync(path)
    } catch (e) {

    }
    return crypto.createHash('md5').update(file).digest('hex')
}

module.exports = getDirTree