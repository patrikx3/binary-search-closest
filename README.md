[//]: #@corifeus-header

  [![NPM](https://img.shields.io/npm/v/p3x-binary-search-closest.svg)](https://www.npmjs.com/package/p3x-binary-search-closest)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Uptime ratio (90 days)](https://network.corifeus.com/public/api/uptime-shield/31ad7a5c194347c33e5445dbaf8.svg)](https://network.corifeus.com/status/31ad7a5c194347c33e5445dbaf8)





# 🚅 Find the closest or exact value using binary search v2026.4.134


  
🌌 **Bugs are evident™ - MATRIX️**  
🚧 **This project is under active development!**  
📢 **We welcome your feedback and contributions.**  
    



### NodeJS LTS is supported

### 🛠️ Built on NodeJs version

```txt
v24.14.1
```





# 📝 Description

                        
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

# 🌐 Meet Assistant SaaS — meeting.corifeus.com

Don't want to install anything? Try the **hosted version** at **[meeting.corifeus.com](https://meeting.corifeus.com)** — full meeting workflow built for European businesses, no setup, no API key, no command line.

What the hosted version offers:

- **21-language live translation** during the meeting
- **AI summaries, action items, decisions, attendees, key quotes** auto-generated after every meeting
- **Custom vocabulary** — your client / company / industry terms corrected automatically (Pro+ tier)
- **Searchable meeting library** — find any decision or promise across all your past meetings
- **Shareable read-only links** — send a clean meeting summary to a client or teammate, no signup needed on their end
- **One-click email summary** after each meeting
- **Premium engine on every plan** — no downgraded model, ever
- **EU billing** — Stripe Tax + VAT-compliant + EUR-priced (Solo €19.99 / Pro €39.99 / Business €99.99 per month, no lock-in)
- **GDPR-compliant by default** — browser-language auto-detection, no tracking cookies, your meetings stored encrypted

Try the live demo (1 minute free, no signup) or browse the **public sample meeting** at [meeting.corifeus.com/sample](https://meeting.corifeus.com/sample).

---

# Corifeus Network

AI-powered network & email toolkit — free, no signup.

**Web** · [network.corifeus.com](https://network.corifeus.com)  **MCP** · [`npm i -g p3x-network-mcp`](https://www.npmjs.com/package/p3x-network-mcp)

- **AI Network Assistant** — ask in plain language, get a full domain health report
- **Network Audit** — DNS, SSL, security headers, DNSBL, BGP, IPv6, geolocation in one call
- **Diagnostics** — DNS lookup & global propagation, WHOIS, reverse DNS, HTTP check, my-IP
- **Mail Tester** — live SPF/DKIM/DMARC + spam score + AI fix suggestions, results emailed (localized)
- **Monitoring** — TCP / HTTP / Ping with alerts and public status pages
- **MCP server** — 17 tools exposed to Claude Code, Codex, Cursor, any MCP client
- **Install** — `claude mcp add p3x-network -- npx p3x-network-mcp`
- **Try** — *"audit example.com"*, *"why do my emails land in spam? test me@example.com"*
- **Source** — [patrikx3/network](https://github.com/patrikx3/network) · [patrikx3/network-mcp](https://github.com/patrikx3/network-mcp)
- **Contact** — [patrikx3.com](https://www.patrikx3.com/en/front/contact) · [donate](https://paypal.me/patrikx3)

---

## ❤️ Support Our Open-Source Project  
If you appreciate our work, consider ⭐ starring this repository or 💰 making a donation to support server maintenance and ongoing development. Your support means the world to us—thank you!  

---

### 🌍 About My Domains  
All my domains, including [patrikx3.com](https://patrikx3.com), [corifeus.eu](https://corifeus.eu), and [corifeus.com](https://corifeus.com), are developed in my spare time. While you may encounter minor errors, the sites are generally stable and fully functional.  

---

### 📈 Versioning Policy  
**Version Structure:** We follow a **Major.Minor.Patch** versioning scheme:  
- **Major:** 📅 Corresponds to the current year.  
- **Minor:** 🌓 Set as 4 for releases from January to June, and 10 for July to December.  
- **Patch:** 🔧 Incremental, updated with each build.  

**🚨 Important Changes:** Any breaking changes are prominently noted in the readme to keep you informed.


[**P3X-BINARY-SEARCH-CLOSEST**](https://corifeus.com/binary-search-closest) Build v2026.4.134

 [![NPM](https://img.shields.io/npm/v/p3x-binary-search-closest.svg)](https://www.npmjs.com/package/p3x-binary-search-closest)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)





[//]: #@corifeus-footer:end
