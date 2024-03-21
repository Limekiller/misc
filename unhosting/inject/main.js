// Legacy (non-react) JS

const getTokens = () => {
    const csrfToken = document.querySelector("meta[name='csrf-token']").content 
    const xsrfToken = document.cookie.split('XSRF-TOKEN=')[1].split(';')[0]
    return {csrf: csrfToken, xsrf: xsrfToken}
}

if (document.querySelector('a[href="/spark/kiosk"]')) {
    document.querySelector('a[href="/spark/kiosk"]').innerHTML =
        `<i class="fa fa-fw text-left fa-btn fa-user"></i> Users`
}

if (window.location.pathname === '/spark/kiosk') {
    document.querySelector('aside').parentElement.style.display = 'none'
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

document.querySelectorAll('.nomaxwidth').forEach(elem => {
    elem.classList.remove('nomaxwidth')
})

// -------- Fetch react scripts --------- //

fetch('https://raw.githubusercontent.com/Limekiller/misc/master/unhosting/inject/main.html')
    .then(response => response.text())
    .then(async data => {
        const currVersion = '1.4'
        const time = Date.now()
        let versionResp = await fetch(`https://raw.githubusercontent.com/Limekiller/misc/master/unhosting/inject/version.json?ts=${time}`)
        versionResp = await versionResp.json()
        if (versionResp.version > currVersion) {
            alert(`There is a new version of BUHCP available! Refresh your browser cache and reload the page to get it.\n
                Release notes for version ${versionResp.version}:\n
                ${versionResp.changelog.map(change => {
                    return `- ${change}`
                })}`.replace(/  +/g, '')
            )
        }

        let divFragment = document.createRange().createContextualFragment(data);
        document.body.append(divFragment);

        document.querySelector('#react').addEventListener('load', () => {
            divFragment = document.createRange().createContextualFragment('<script id="babel" src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>');
            document.body.append(divFragment);
            
            document.querySelector('#babel').addEventListener('load', () => {
                let pageScript = "<script src='https://cdn.jsdelivr.net/gh/Limekiller/misc@master/unhosting/inject/build/header.js' crossorigin></script>"
                const path = window.location.pathname.split('/').slice(-2).join('/')
                switch (true) {
                    // single stack page
                    case new RegExp('cloud_stacks\/\\d+').test(path):
                        pageScript += "<script src='https://cdn.jsdelivr.net/gh/Limekiller/misc@master/unhosting/inject/build/stack.js' crossorigin></script>"
                        break;
                    // single site page
                    case new RegExp('sites\/\\d+').test(path):
                        pageScript += "<script src='https://cdn.jsdelivr.net/gh/Limekiller/misc@master/unhosting/inject/build/site.js' crossorigin></script>"
                        break;
                    // search page
                    case new RegExp('spark\/kiosk').test(path):
                        pageScript += "<script src='https://cdn.jsdelivr.net/gh/Limekiller/misc@master/unhosting/inject/build/search.js' crossorigin></script>"
                        break;
                    // site list page
                    case new RegExp('home\/*$').test(path):
                    case new RegExp('sites\/*$').test(path):
                        pageScript += "<script src='https://cdn.jsdelivr.net/gh/Limekiller/misc@master/unhosting/inject/build/sites.js' crossorigin></script>"
                        break;
                    // stack list page
                    case new RegExp('cloud_stacks\/*$').test(path):
                        pageScript += "<script src='https://cdn.jsdelivr.net/gh/Limekiller/misc@master/unhosting/inject/build/stacks.js' crossorigin></script>"
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