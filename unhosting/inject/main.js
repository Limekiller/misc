// Legacy (non-react) JS

const getTokens = () => {
    const csrfToken = document.querySelector("meta[name='csrf-token']").content 
    const xsrfToken = document.cookie.split('XSRF-TOKEN=')[1].split(';')[0]
    return {csrf: csrfToken, xsrf: xsrfToken}
}

const fetchSites = async () => {
    console.log('fetching')
    const siteTable = document.querySelector('.sites tbody')
    siteTable.innerHTML = ''
    const searchBar = document.createElement('input')
    searchBar.type = 'text'
    searchBar.placeholder = 'Please wait, sites loading...'
    searchBar.classList.add('siteSearch')
    searchBar.addEventListener('keyup', (e) => {
        window.setTimeout(() => filterSites(e.target.value),
        10)
    })
    siteTable.appendChild(searchBar)

    let maxPages = 1
    for (let page of document.querySelectorAll('.page-link')) {
        if (parseInt(page.innerText) > maxPages) {
            maxPages = parseInt(page.innerText)
        }
    }
    
    for (let i = 1; i <= maxPages; i++) {
        let results = await fetch(`${window.location}?page=${i}`)
        results = await results.text()
        const parser = new DOMParser()
        const htmlDoc = parser.parseFromString(results, 'text/html')
        htmlDoc.querySelectorAll('table tbody tr').forEach(site => {
            fixSite(site)
            siteTable.appendChild(site)
        })
    }   

    searchBar.classList.add('active')
    searchBar.placeholder = 'Search sites'
}

const filterSites = (searchTerm) => {
    document.querySelectorAll('.sites tbody tr').forEach(site => {
        site.style.display = 'grid'
        const name = site.querySelector('th a').innerText
        const link = site.querySelector('.link a').href
        if (!name.includes(searchTerm) && !link.includes(searchTerm)) {
            site.style.display = 'none'
        }
    })
}

const fixSite = (siteElem) => {
    siteElem.children[1].classList.add('link')
    siteElem.children[2].classList.add('status')
    siteElem.children[3].classList.add('app')
    siteElem.children[4].classList.add('stack')

    const infoButton = siteElem.querySelector('a[title="Info / Details"]')
    const innerHTML = `
        <a href="${infoButton.href}">
            ${siteElem.querySelector('th').innerHTML}
        </a>`
    siteElem.querySelector('th').innerHTML = innerHTML
}

const collapseNav = () => {
    const menu = document.querySelector('.dropdown-menu')
    
    const reportToggle = document.createElement('div')
    reportToggle.classList.add('reports')

    const reportLinks = document.createElement('div')
    reportLinks.classList.add('reportLinks')
    reportToggle.innerHTML = `<button class="reportToggle">Reports ▼</button>`
    reportToggle.appendChild(reportLinks)

    document.querySelectorAll('.dropdown-item').forEach(item => {
        if (item.innerText.includes("Report")) {
            reportLinks.appendChild(item)
        }
    })

    menu.appendChild(reportToggle)
    document.querySelector('.reportToggle').addEventListener('click', (e) => {
        if (reportLinks.classList.contains('active')) {
            reportLinks.classList.remove('active')
        } else {
            reportLinks.classList.add('active')
        }
    })
}

if (document.querySelector('a[href="/spark/kiosk"]')) {
    document.querySelector('a[href="/spark/kiosk"]').innerHTML =
        `<i class="fa fa-fw text-left fa-btn fa-user"></i> Users`
}

if (window.location.pathname === '/spark/kiosk') {
    document.querySelector("#kiosk-users-search").addEventListener('keyup', (e) => {
        if (e.key === "Enter") {
            let tempVal = e.target.value.replaceAll('*', '')
            tempVal = "*" + tempVal + "*"

            const tokens = getTokens()
            fetch('/spark/kiosk/users/search', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "X-CSRF-TOKEN": tokens.csrf,
                    "X-XSRF-TOKEN": tokens.xsrf,
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: JSON.stringify({
                    query: tempVal
                })
            }).then(response => response.json())
            .then(data => {
                if (document.querySelector('.userResults')) {
                    document.querySelector('.userResults').remove()
                }
                
                const tableContainer = document.querySelector('#users .card.card-default').parentElement
                let html = `<div class="userResults">`
                for (let user of data) {
                    html += `<div class="user">
                        <strong>${user.firstname} ${user.lastname}</strong>
                        <span>${user.email}</span>
                        <a href='/spark/kiosk/users/impersonate/${user.id}'>Access</a>
                    </div>`
                }
                html += "</div>"
                tableContainer.insertAdjacentHTML('beforeend', html)
                window.setTimeout(() => document.querySelector('.userResults').parentElement.childNodes[4].remove(), 50)
            })
        }
    })

    document.querySelector('a[href="#users"]').click()
    document.querySelector('aside').style.display = 'none'
}

if (window.location.pathname === '/home' ||
    window.location.pathname === '/cp/sites/' ||
    window.location.pathname.includes('/cp/sites/stack/')) {
    document.querySelector('.tablesorter-filter-row')
        .children[4].classList.add('stack-selector')

    document.querySelector('table').classList.add('sites')
    document.querySelectorAll('.sites tbody tr').forEach(row => {
        fixSite(row)
    })

    fetchSites()
}

if (window.location.pathname == '/cp/cloud_stacks/') {
    document.querySelector('table').classList.add('stacks')
    document.querySelectorAll('.stacks tbody tr').forEach(row => {
        row.children[2].classList.add('status')
        row.children[3].classList.add('ec2size')
        row.children[4].classList.add('rdssize')

    })
}

if (window.location.pathname.includes('/cp/sites/')) {
    document.querySelectorAll('li').forEach(li => {
        if (li.innerHTML.includes('Plugins:')) {
            li.classList.add('plugins')
            li.parentElement.after(li)
            li.querySelectorAll('.site-notice-message').forEach(plugin => {
                let pluginText = plugin.innerText
                pluginText = "<strong>" + pluginText.split(' ').join('</strong><br />')
                plugin.innerHTML = pluginText
            })
        }
    })
}

collapseNav()

// -------- Fetch react scripts --------- //

fetch('https://raw.githubusercontent.com/Limekiller/misc/master/unhosting/inject/main.html')
    .then(response => response.text())
    .then(data => {
        let divFragment = document.createRange().createContextualFragment(data);
        document.body.append(divFragment);

        document.querySelector('#react').addEventListener('load', () => {
            divFragment = document.createRange().createContextualFragment('<script id="babel" src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>');
            document.body.append(divFragment);
            
            document.querySelector('#babel').addEventListener('load', () => {
                let pageScript = ""
                switch (window.location.pathname.split('/').slice(-2, -1)[0]) {
                    case "cloud_stacks":
                        pageScript = "<script src='https://cdn.jsdelivr.net/gh/Limekiller/misc@master/unhosting/inject/build/stack.js' crossorigin></script>"
                        break;
                    case "sites":
                        pageScript = "<script src='https://cdn.jsdelivr.net/gh/Limekiller/misc@master/unhosting/inject/build/site.js' crossorigin></script>"
                        break;
                }      
                if (pageScript !== "") {
                    divFragment = document.createRange().createContextualFragment(pageScript);
                    document.body.append(divFragment);
                }
            })
        })
    }
)