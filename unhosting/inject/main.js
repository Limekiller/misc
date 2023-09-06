// Legacy (non-react) JS

const getTokens = () => {
    const csrfToken = document.querySelector("meta[name='csrf-token']").content 
    const xsrfToken = document.cookie.split('XSRF-TOKEN=')[1].split(';')[0]
    return {csrf: csrfToken, xsrf: xsrfToken}
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
    document.querySelector('a[href="#users"]').click()
    document.querySelector('aside').style.display = 'none'
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
                const path = window.location.pathname.split('/').slice(-2).join('/')
                switch (true) {
                    // single stack page
                    case new RegExp('cloud_stacks\/\\d+').test(path):
                        pageScript = "<script src='https://cdn.jsdelivr.net/gh/Limekiller/misc@master/unhosting/inject/build/stack.js' crossorigin></script>"
                        break;
                    // single site page
                    case new RegExp('sites\/\\d+').test(path):
                        pageScript = "<script src='https://cdn.jsdelivr.net/gh/Limekiller/misc@master/unhosting/inject/build/site.js' crossorigin></script>"
                        break;
                    // search page
                    case new RegExp('spark\/kiosk').test(path):
                        pageScript = "<script src='https://cdn.jsdelivr.net/gh/Limekiller/misc@master/unhosting/inject/build/search.js' crossorigin></script>"
                        break;
                    // site list page
                    case new RegExp('home\/*$').test(path):
                    case new RegExp('sites\/*$').test(path):
                        pageScript = "<script src='https://cdn.jsdelivr.net/gh/Limekiller/misc@master/unhosting/inject/build/sites.js' crossorigin></script>"
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