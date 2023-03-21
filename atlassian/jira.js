// Hide vulnerability tickets from the Your Work dropdown
window.setInterval(() => {
    document.querySelectorAll("#your-work-dropdown-tabs-0-tab a").forEach(elem => {
        if (elem.innerText.includes('Vulnerability:')) {
            elem.remove()
        }
    })
}, 100)
