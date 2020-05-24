const { Worker } = require('worker_threads');
const util = require('./util')

module.exports = {
    binarySearchByProperty: util.binarySearchByProperty,
    binarySearchByValue: util.binarySearchByValue,
    worker: util.worker,
}
