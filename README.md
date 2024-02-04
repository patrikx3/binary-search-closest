[//]: #@corifeus-header

[![NPM](https://nodei.co/npm-dl/p3x-binary-search-closest.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/p3x-binary-search-closest/)

  

[![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m780749701-41bcade28c1ea8154eda7cca.svg)](https://stats.uptimerobot.com/9ggnzcWrw)





# 🚅 Find the closest or exact value using binary search v2024.4.104



**Bugs are evident™ - MATRIX️**
    



### NodeJS LTS is supported

### Built on NodeJs version

```txt
v20.11.0
```





# Description

                        
[//]: #@corifeus-header:end


Before, you want to find the closest or exact value in an [array of objects](https://www.scaler.com/topics/javascript-sort-an-array-of-objects/) or an array by values, it is important, so that you sort in ascending order, otherwise, it will not work. Example below shows how it works.

The search algorithm is based on https://www.geeksforgeeks.org/find-closest-number-array/.
  
If you have a big array, you can use a worker thread as in the code is on the bottom (4 ways to do it / same as in the event loop, but without blocking the event loop.)  

# Installation

#### For NodeJs
```bash
npm install p3x-binary-search-closest
```
# Usage

If you have mocha, you can test like this, it has a few use cases (you can see, before I execute this micro-service, I sort the array):

**Note:** Given npmjs.com has a narrow page, it is better to see the code on https://corifeus.com/binary-search-closest or https://github.com/patrikx3/binary-search-closest  

Of course, when using a worker thread, the execution is about 20-25ms longer, than when we are in the event loop, so the worker thread is valid when we are working on a big dataset.

```js
const assert = require('assert');

// for only browser (remove worker thread as is NodeJs Specific)
const bsClosest = require('p3x-binary-search-closest/browser')

// for full blown functions
const bsClosest = require('p3x-binary-search-closest')


describe('binary search closest', () => {

    it('binary search closest by array value, when it is exact match', () => {
        const arr = [6, 9, 8, 4, 1, 7, 3, 10, 5, 2]
        arr.sort()
        const foundValue = bsClosest.byValue(arr, 5)
        assert.ok(foundValue === 5)
    })


    it('binary search closest by array value, when it is not existing, but find the closest value', () => {
        const arr = [9, 8, 4, 1, 7, 3, 10, 5, 2]
        arr.sort()
        const foundValue = bsClosest.byValue(arr, 6)
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
        const foundValue = bsClosest.byProperty(arr, 7, 'value')
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
        const foundValue = bsClosest.byProperty(arr, 5, 'value')
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


    it('using thread worker, binary search closest by array with a property, but find the closest value', async() => {
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
```

[//]: #@corifeus-footer

---

🙏 This is an open-source project. Star this repository, if you like it, or even donate to maintain the servers and the development. Thank you so much!

Possible, this server, rarely, is down, please, hang on for 15-30 minutes and the server will be back up.

All my domains ([patrikx3.com](https://patrikx3.com) and [corifeus.com](https://corifeus.com)) could have minor errors, since I am developing in my free time. However, it is usually stable.

**Note about versioning:** Versions are cut in Major.Minor.Patch schema. Major is always the current year. Minor is either 4 (January - June) or 10 (July - December). Patch is incremental by every build. If there is a breaking change, it should be noted in the readme.


---

[**P3X-BINARY-SEARCH-CLOSEST**](https://corifeus.com/binary-search-closest) Build v2024.4.104

[![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)






[//]: #@corifeus-footer:end
