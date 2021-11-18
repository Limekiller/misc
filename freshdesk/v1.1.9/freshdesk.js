// This custom JS code runs clientside and goes in a plugin such as https://mybrowseraddon.com/custom-style-script.html
// It makes Freshdesk usable

// Since it's a React app, we need to watch for page changes so we can re-run JS that formats the page. Cool!
let currentPage = location.href;
setInterval(() => {
    if (currentPage != location.href && !document.querySelector('.gravity-loader')) {
        window.setTimeout(hidePluginTickets, 500);

        currentPage = location.href;
        updateTicketEmphasis();
        swapCols();
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


const updateTicketEmphasis = () => {
    document.querySelectorAll('div[data-test-id="statusTranslatedLabel_test_label"]').forEach(statusField => {
        const status = statusField.textContent.trim();

        // Zendesk had different colors for different ticket statuses, and put Pending tickets at the bottom of the list
        // Freshdesk, on the other hand, sucks balls, so here we're lowering the opacity of pending tickets so we can get some visual differentiation
        if (status === 'Pending') {
            const row = statusField.closest('tr');
            row.parentNode.append(row);
            row.style.opacity = '0.5';

        // Also, if a customer has replied, that's, like, an important thing, so maybe let's emphasize that?
        } else if (status === 'Customer Replied') {
            statusField.querySelector('div[aria-label="Status"]').innerHTML = 'Replied <span class="ember-power-select-status-icon"></span>';
            statusField.classList.add('reply-alert');
        }
   });
}