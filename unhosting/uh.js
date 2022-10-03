// Type your JavaScript code here.

if (document.querySelector('a[href="/spark/kiosk"]')) {
    document.querySelector('a[href="/spark/kiosk"]').innerHTML =
        `<i class="fa fa-fw text-left fa-btn fa-user"></i> Users`
}

if (window.location.pathname === '/spark/kiosk') {
    document.querySelector('a[href="#users"]').click()
    document.querySelector('aside').style.display = 'none'
}

if (window.location.pathname === '/home' ||
    window.location.pathname.includes('/cp/sites')) {
    document.querySelector('.tablesorter-filter-row')
        .children[4].classList.add('stack-selector')

    document.querySelector('table').classList.add('sites')
    document.querySelectorAll('.sites tbody tr').forEach(row => {
        row.children[1].classList.add('link')
        row.children[2].classList.add('status')
        row.children[3].classList.add('app')
        row.children[4].classList.add('stack')

        const infoButton = row.querySelector('a[title="Info / Details"]')
        const innerHTML = `
            <a href="${infoButton.href}">
                ${row.querySelector('th').innerHTML}
            </a>`
        row.querySelector('th').innerHTML = innerHTML
    })
}

if (window.location.pathname.includes('cloud_stacks')) {
    document.querySelector('table').classList.add('stacks')
    document.querySelectorAll('.stacks tbody tr').forEach(row => {
        row.children[2].classList.add('status')
        row.children[3].classList.add('ec2size')
        row.children[4].classList.add('rdssize')

    })
}

if (window.location.pathname.includes('/cp/sites/')) {
    document.querySelectorAll('ul')[5].classList.add('site-info')
    document.querySelectorAll('li').forEach(li => {
        if (li.innerHTML.includes('Plugins:')) {
            li.parentElement.append(li)
            //li.remove()
        }
    })
}
