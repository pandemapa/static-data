// import path helper.
const pathUtil = require('path')

// resolve root path.
const projectPath = pathUtil.resolve(__dirname, '../..')

// resolver function.
const resolve = (path) => pathUtil.resolve(projectPath, path)

// export resolve function.
module.exports = resolve
