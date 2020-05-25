const util = require('./util')

module.exports = {
    byProperty: util.binarySearchByProperty,
    byValue: util.binarySearchByValue,
    worker: util.worker,
}
