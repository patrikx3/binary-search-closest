const assert = require('assert');

const bsClosest = require('../../src')

describe('binary search closest', () => {

    it('binary search closest by array value, when it is exact match', () => {
        const arr = [6, 9, 8, 4, 1, 7, 3, 10, 5, 2]
        arr.sort()
        const foundValue = bsClosest.binarySearchByValue(arr, 5)
        assert.ok(foundValue === 5)
    })


    it('binary search closest by array value, when it is not existing, but find the closest value', () => {
        const arr = [9, 8, 4, 1, 7, 3, 10, 5, 2]
        arr.sort()
        const foundValue = bsClosest.binarySearchByValue(arr, 6)
        assert.ok(foundValue === 7)
    })

    it('binary search closest by array with a property, when it is exact match', () => {
        const arr = [
            {
                id: 4538765,
                value: 9
            },
            {
                id: 4535675,
                value: 10
            },
            {
                id: 4535,
                value: 1
            },
            {
                id: 45654645,
                value: 3
            },
            {
                id: 123123123,
                value: 2
            },
            {
                id: 4532345,
                value: 4
            },
            {
                id: 4545335,
                value: 7
            },
            {
                id: 124535,
                value: 6
            },
            {
                id: 4587635,
                value: 8
            },
        ]
        arr.sort((a, b) => (a.value > b.value) ? 1 : -1)
        const foundValue = bsClosest.binarySearchByProperty(arr, 7, 'value')
        assert.ok(foundValue.value === 7)
    })


    it('binary search closest by array with a property, but find the closest value', () => {
        const arr = [
            {
                id: 4538765,
                value: 9
            },
            {
                id: 4535675,
                value: 10
            },
            {
                id: 4535,
                value: 1
            },
            {
                id: 45654645,
                value: 3
            },
            {
                id: 123123123,
                value: 2
            },
            {
                id: 4532345,
                value: 4
            },
            {
                id: 4545335,
                value: 7
            },
            {
                id: 124535,
                value: 6
            },
            {
                id: 4587635,
                value: 8
            },
        ]
        arr.sort((a, b) => (a.value > b.value) ? 1 : -1)
        const foundValue = bsClosest.binarySearchByProperty(arr, 5, 'value')
        assert.ok(foundValue.value === 6)
    })

    it('using thread worker, binary search closest by array value, when it is exact match', async() => {
        const arr = [6, 9, 8, 4, 1, 7, 3, 10, 5, 2]
        arr.sort()
        const foundValue = await bsClosest.worker({
            type: 'value',
            target: 5,
            array: arr,
        })
        assert.ok(foundValue === 5)
    })

    it('using thread worker, binary search closest by array value, but find the closest value', async() => {
        const arr = [9, 8, 4, 1, 7, 3, 10, 5, 2]
        arr.sort()
        const foundValue = await bsClosest.worker({
            type: 'value',
            target: -1,
            array: arr,
        })
        assert.ok(foundValue === 1)
    })


    it('using thread worker, binary search closest by array with a property, when it is exact match', async() => {
        const arr = [
            {
                id: 4538765,
                value: 9
            },
            {
                id: 4535675,
                value: 10
            },
            {
                id: 4535,
                value: 1
            },
            {
                id: 45654645,
                value: 3
            },
            {
                id: 123123123,
                value: 2
            },
            {
                id: 4532345,
                value: 4
            },
            {
                id: 4545335,
                value: 7
            },
            {
                id: 124535,
                value: 6
            },
            {
                id: 4587635,
                value: 8
            },
        ]
        arr.sort((a, b) => (a.value > b.value) ? 1 : -1)
        const foundValue = await bsClosest.worker({
            type: 'property',
            target: 7,
            array: arr,
            property: 'value',
        })
        assert.ok(foundValue.value === 7)
    })


    it('binary search closest by array with a property, but find the closest value', async() => {
        const arr = [
            {
                id: 4538765,
                value: 9
            },
            {
                id: 4535675,
                value: 10
            },
            {
                id: 4535,
                value: 1
            },
            {
                id: 45654645,
                value: 3
            },
            {
                id: 123123123,
                value: 2
            },
            {
                id: 4532345,
                value: 4
            },
            {
                id: 4545335,
                value: 7
            },
            {
                id: 124535,
                value: 6
            },
            {
                id: 4587635,
                value: 8
            },
        ]
        arr.sort((a, b) => (a.value > b.value) ? 1 : -1)
        const foundValue = await bsClosest.worker({
            type: 'property',
            target: 5,
            array: arr,
            property: 'value',
        })
        assert.ok(foundValue.value === 6)
    })
})
