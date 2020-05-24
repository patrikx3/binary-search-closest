const { parentPort, workerData } = require('worker_threads');

const util = require('./util');

const allowedTypes = ['value', 'property']
let type = workerData.type
const array = workerData.array
const target = workerData.target
const property = workerData.property

if (type === undefined) {
    type = allowedTypes[0]
}
if (!allowedTypes.includes(type)) {
    throw new Error(`The allowed types are ${allowedTypes.join(', ')}, you tried ${type}`)
}
if (type === 'property' && (typeof property !== 'string' || property.length < 1)) {
    throw new Error(`You tried by searching by binarySearchByProperty, but you forgot the property options, which has to be a string and at least one character`)
}
let foundValue
if (type === 'value') {
    foundValue = util.binarySearchByValue(array, target)
} else {
    foundValue = util.binarySearchByProperty(array, target, property)
}
parentPort.postMessage(foundValue)

