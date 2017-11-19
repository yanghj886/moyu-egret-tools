const fs = require('fs')
const path = require('path')

const fileHash = require('./filehash')


module.exports = (dir) => {
    const resPath = path.resolve(dir, 'default.res.json')
    if (!fs.existsSync(resPath)) {
        throw new Error('"default.res.json" no font')
    }
    const hash = fileHash(dir)
    let res
    try {
        res = fs.readFileSync(resPath, { encoding: 'utf-8' })
        res = JSON.parse(res)
    } catch (e) { }
    for (let i in res.resources) {
        let temppath = path.resolve(path.dirname(resPath), res.resources[i].url)
        if (hash[temppath]) {
            res.resources[i].url += `?v=${hash[temppath]}`
        }
    }
    try {
        fs.writeFileSync(resPath, JSON.stringify(res))
    } catch (e) { }
}
