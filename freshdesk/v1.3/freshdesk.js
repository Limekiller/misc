// This custom JS code runs clientside and goes in a plugin such as https://mybrowseraddon.com/custom-style-script.html
// It makes Freshdesk usable

// Since it's a React app, we need to watch for page changes so we can re-run JS that formats the page. Cool!
let currentPage = location.href;
let firstLoad = true;
let ticketsCleared = false;

const currVersion = '1.3';
let updateExists = false;

setInterval(() => {
    if (document.querySelector('*[data-identifyelement="10"]')) {
        if (firstLoad && window.location.pathname.includes('tickets') && document.querySelector('.burger-menu-trigger')) {
            firstLoad = false;
            simulateMouseClick(document.querySelector('.burger-menu-trigger'));
            window.setTimeout(fixMenu, 100);
        }
        const navbar = document.querySelector('#nucleus-navbar');
        window.setTimeout(() => navbar.classList.add('fixed'), 500);
    }

    if (currentPage != location.href) {
        if (!ticketsCleared) {
            ticketsCleared = true;
            document.querySelectorAll('.lt-body tr').forEach(row => { row.style.display = 'none' });
        }

        if (!updateExists) {
            updateExists = true;
            checkForUpdates();
        }

        if (!document.querySelector('.gravity-loader')) {
            window.setTimeout(hidePluginTickets, 500);

            ticketsCleared = false;
            currentPage = location.href;
            updateTicketEmphasis();
            swapCols();
        }
    }
}, 100);


// Find tickets with the request type column set to "plugin" and hide them from view
const hidePluginTickets = () => {
    // Don't hide plugin tickets if the view contains "plugin" in the title
    const viewTitle = document.querySelector('.breadcrumb-title').textContent.trim().toLowerCase();
    if (viewTitle.includes('plugin')) {
        return
    }

    document.querySelectorAll('.lt-body tr').forEach(ticket => {
        ticket.querySelectorAll('td').forEach(column => {
            const val = column.textContent.trim()
            if (val === 'Plugin') {
                column.closest('tr').style.display = 'none';
            }
        })
    });
}

// Swap the "Contact" and "Subject" columns
const swapCols = () => {
    headerRow = document.querySelector(".lt-body-wrap table > thead > tr");
    headerRow.insertBefore(headerRow.children[3], headerRow.children[1]);
    const rows = document.querySelectorAll(".lt-body-wrap table > tbody > tr");
    for(const row of rows){
        row.insertBefore(row.children[3], row.children[1]);
    }
}


// Fade out Pending tickets and move them to the bottom of the list,
// Add a red dot next to Replied tickets
const updateTicketEmphasis = () => {
    document.querySelectorAll('div[data-test-id="statusTranslatedLabel_test_label"]').forEach(statusField => {
        const status = statusField.textContent.trim();
        if (status === 'Pending') {
            const row = statusField.closest('tr');
            row.parentNode.append(row);
            row.style.opacity = '0.5';
        } else if (status === 'Customer Replied') {
            statusField.querySelector('div[aria-label="Status"]').innerHTML = 'Replied <span class="ember-power-select-status-icon"></span>';
            statusField.classList.add('reply-alert');
        }
    });
}

// "Pin" the ticket nav bar so it doesn't disappear on body click
const fixMenu = () => {
    const menu = document.querySelector('.category-menu');
    menu.parentNode.parentNode.appendChild(menu.cloneNode(true));
    menu.remove();

    const newMenu = document.querySelector('.category-menu');
    newMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            newMenu.querySelectorAll('a').forEach(_link => _link.classList.remove('category-menu--link--active'));
            link.classList.add('category-menu--link--active');
        });
    });
}

// Programmatically send a click event even when .click() doesn't work
const simulateMouseClick = (targetNode) => {
    const triggerMouseEvent = (targetNode, eventType) => {
        const clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        targetNode.dispatchEvent(clickEvent);
    }
    ["mouseover", "mousedown", "mouseup", "click"].forEach(eventType => {
        triggerMouseEvent(targetNode, eventType);
    });
}

const checkForUpdates = () => {
    fetch(`https://raw.githubusercontent.com/Limekiller/misc/master/freshdesk/v${currVersion}/freshdesk.js`)
    .then(response => {
        if (response.status === 404) {
            const newVersion = Number(Math.round(Number(currVersion) + .1 + 'e2')+'e-2');
            fetch(`https://raw.githubusercontent.com/Limekiller/misc/master/freshdesk/v${newVersion}/changelog.txt`)
            .then(response => response.text())
            .then(data => alert(`There is a new version of the Freshdesk scripts available! Please replace your current JS and CSS link with:\n\nhttps://cdn.jsdelivr.net/gh/limekiller/misc/freshdesk/v${newVersion}/freshdesk.js\nhttps://cdn.jsdelivr.net/gh/limekiller/misc/freshdesk/v${newVersion}/freshdesk.css\n\nChangelog:\n${data}`));

        }
    })
}
