const fs = require('fs')
const path = require('path')

const loadAppsPath = (basePath, target = 'src', parent = '', filename = 'app.js', entryName = 'src', outputName = 'dists') => {
    const targetPath = path.resolve(basePath, parent, target)
    const files = fs.readdirSync(targetPath)
    let apps = []
    for (let file of files) {
        const filePath = `${targetPath}/${file}`
        if (fs.lstatSync(filePath).isDirectory()) {
            const appPath = `${filePath}/${filename}`
            if (fs.existsSync(appPath)) {
                const currentPath = `${parent}/${file}`.replace(/^\//, '')
                apps.push({
                    filename,
                    appName: currentPath,
                    appPath: `${entryName}/${currentPath}`,
                    entryPath: `${entryName}/${currentPath}/${filename}`,
                    outputPath: `${outputName}/${currentPath}`
                })
            } else {
                apps = [
                    ...apps,
                    ...loadAppsPath(basePath, filePath, `${parent}/${file}`)
                ]
            }
        }
    }
    return apps
}

module.exports.loadAppsPath = loadAppsPath
