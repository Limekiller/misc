// This custom JS code runs clientside and goes in a plugin such as https://mybrowseraddon.com/custom-style-script.html
// It makes Freshdesk usable

if (typeof firstLoad == 'undefined') {
    let firstLoad = true;
    let isLoading = false;
    let ticketsCleared = false;

    const currVersion = '1.6';
    let updateExists = false;

    setInterval(() => {
        // Once the page actually, fully loads, set the side menu in place (if we can on this page) and fix the top nav bar
        if (typeof document.body.dataset.identifyelement != 'undefined') {

            if (firstLoad && window.location.pathname.includes('tickets') && document.querySelector('.burger-menu-trigger')) {
                firstLoad = false;
                window.setTimeout(fixMenu, 100);
            }
            const navbar = document.querySelector('#nucleus-navbar');
            window.setTimeout(() => navbar.classList.add('fixed'), 500);
        }


        // Here we watch for page changes. If the page is changing, clear all tickets manually
        if (document.querySelector('.gravity-loader') || isLoading) {
            isLoading = true;

            if (!ticketsCleared) {
                ticketsCleared = true;
                document.querySelectorAll('.lt-body tr').forEach(row => { row.style.display = 'none' });
            }

            if (!updateExists) {
                updateExists = true;
                checkForUpdates();
            }

            // Once we're no longer loading the page, fix all the tickets in the list
            if (!document.querySelector('.gravity-loader')) {
                window.setTimeout(hidePluginTickets, 500);
                isLoading = false;
                ticketsCleared = false;
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

        updateTicketCount();
    }

    // Swap the "Contact" and "Subject" columns
    const swapCols = () => {
        console.log('isLoa');
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
            console.log(status);
            const row = statusField.closest('tr');
            switch (status) {
                case 'Pending':
                    row.parentNode.append(row);
                    row.style.opacity = '0.5';
                    break;
                case 'Customer Replied':
                    statusField.querySelector('div[aria-label="Status"]').innerHTML = 'Replied <span class="ember-power-select-status-icon"></span>';
                    statusField.classList.add('reply-alert');
                    break;
                case 'Hold (pending no close)':
                    statusField.querySelector('div[aria-label="Status"]').innerHTML = 'Hold <span class="ember-power-select-status-icon"></span>';
                    row.parentNode.append(row);
                    row.style.opacity = '0.5';
                    break;
                case 'Waiting on Third Party':
                    statusField.querySelector('div[aria-label="Status"]').innerHTML = 'Waiting... <span class="ember-power-select-status-icon"></span>';
                    row.parentNode.append(row);
                    row.style.opacity = '0.5';
                    break;
            }
        });
    }


    // Update the ticket numbers in the top right to be accurate
    const updateTicketCount = () => {
        let visibleTickets = [];
        document.querySelectorAll('.lt-body tr').forEach(ticket => {
            if (ticket.style.display !== 'none') {
                visibleTickets.push(ticket);
            }
        });
        document.querySelector('span[data-test-id="pagination-details"]').innerHTML = `${visibleTickets.length} tickets`;
    }

    // "Pin" the ticket nav bar so it doesn't disappear on body click
    const fixMenu = () => {
        simulateMouseClick(document.querySelector('.burger-menu-trigger'));

        window.setTimeout(() => {
            const menu = document.querySelector('#ember-basic-dropdown-wormhole');
            menu.parentNode.appendChild(menu.cloneNode(true));
            menu.remove();

            const newMenu = document.querySelector('.category-menu');
            newMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', (e) => {
                    newMenu.querySelectorAll('a').forEach(_link => _link.classList.remove('category-menu--link--active'));
                    link.classList.add('category-menu--link--active');
                });
            });

            let styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            styleSheet.innerText = `
                .app-main-wrapper {
                    margin: 75px 0px 0px 289px !important;
                    position: relative;
                }
                .application-header {
                    padding: 60px 0px 0px 289px !important;
                }
            `;
            document.head.appendChild(styleSheet);
        }, 500);
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

    // Send a request to the raw github link for this script. If it doesn't exist, it's been replaced with a new version
    const checkForUpdates = () => {
        fetch(`https://raw.githubusercontent.com/Limekiller/misc/master/freshdesk/v${currVersion}/freshdesk.js`)
        .then(response => {
            if (response.status === 404) {
                // Retrieve the changelog from that new version folder and display an alert
                const newVersion = Number(Math.round(Number(currVersion) + .1 + 'e2')+'e-2');
                fetch(`https://raw.githubusercontent.com/Limekiller/misc/master/freshdesk/v${newVersion}/changelog.txt`)
                .then(response => response.text())
                .then(data => alert(`There is a new version of the Freshdesk scripts available! Please replace your current JS and CSS link with:\n\nhttps://cdn.jsdelivr.net/gh/limekiller/misc/freshdesk/v${newVersion}/freshdesk.js\nhttps://cdn.jsdelivr.net/gh/limekiller/misc/freshdesk/v${newVersion}/freshdesk.css\n\nChangelog:\n${data}`));
            }
        })
    }

}
