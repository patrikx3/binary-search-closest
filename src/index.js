const util = require('./util')
const utilWorker = require('./util.worker')

module.exports = {
    byProperty: util.binarySearchByProperty,
    byValue: util.binarySearchByValue,
    worker: utilWorker.worker,
}
