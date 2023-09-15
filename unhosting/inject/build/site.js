var infoParent = document.querySelector('.col-sm-9');

var siteTitle = infoParent.childNodes[0].textContent.split('Review: ')[1].trim();
var editBtn = infoParent.childNodes[2].querySelector('a');
var pluginsBtn = infoParent.childNodes[2].querySelector('a');

var siteStatus = infoParent.textContent.split('deployment status: ')[1].split("\n")[0].trim();
var siteVersion = infoParent.textContent.split('checkout:: ')[1].split(" ")[0].trim();
var emailStatus = infoParent.textContent.split('Email state: ')[1].split("Site admin")[0].trim();
var productionStatus = infoParent.textContent.split('Production site: ')[1].split(" ")[0].trim();

var domainStatusDropdown = infoParent.querySelector('.collapsed[href="#accordionDomainRecord"]');
var accordionDomainRecord = infoParent.querySelector('#accordionDomainRecord');
var sslSatusDropdown = infoParent.querySelector('.collapsed[href="#accordionSslValidation"]');
var accordionSslValidation = infoParent.querySelector('#accordionSslValidation');
var ELBImportStatusDropdown = infoParent.querySelector('.collapsed[href="#accordionElbImport"]');
var accordionElbImport = infoParent.querySelector('#accordionElbImport');

var mainInfo = document.querySelector('.col-sm-9 > ul');
var url = mainInfo.textContent.split('URL: ')[1].split(' ')[0];

var adminBtn = infoParent.querySelector('.sites-custom-create-admin');
var passwordSection = infoParent.childNodes[5];
var adminUsername = mainInfo.innerHTML.split('admin username:</span> ')[1].split('<')[0];
var adminPass = mainInfo.innerHTML.split('data-password="')[1].split('"')[0];
var adminEmail = mainInfo.innerHTML.split('admin email:</span> ')[1].split('<')[0];

var plugins = infoParent.querySelector('.plugins ul');

var advSettings = infoParent.querySelector('#accordionAdvancedSettings');
var jobOutput = infoParent.querySelector('#accordionJobOutput');

infoParent.insertAdjacentHTML('afterbegin', "<div class='reactRoot'></div>");

ReactDOM.render(React.createElement(
    'div',
    { 'class': 'reactInfo' },
    React.createElement(
        'div',
        { 'class': 'titleBar' },
        React.createElement(
            'h1',
            null,
            siteTitle
        ),
        editBtn ? React.createElement('div', { dangerouslySetInnerHTML: { __html: editBtn.outerHTML } }) : ""
    ),
    React.createElement(
        'h3',
        null,
        React.createElement(
            'a',
            { target: '_blank', href: url + '/login/index.php?nosso=true&username=mus&saml=no' },
            url
        )
    ),
    React.createElement(
        'div',
        { 'class': 'infoCards' },
        React.createElement(
            'span',
            { 'class': 'status' },
            siteStatus === 'complete' ? React.createElement(
                'span',
                { 'class': 'material-icons', style: { color: "green" } },
                'check_circle'
            ) : React.createElement(
                'span',
                { 'class': 'material-icons', style: { color: "red" } },
                'error'
            ),
            siteStatus
        ),
        React.createElement(
            'span',
            { 'class': 'productionStatus' },
            productionStatus === '1' ? React.createElement(
                'span',
                { 'class': 'material-icons', style: { color: "green" } },
                'factory'
            ) : React.createElement(
                'span',
                { 'class': 'material-icons' },
                'science'
            ),
            productionStatus === '1' ? "Production" : "Staging"
        ),
        React.createElement(
            'span',
            { 'class': 'emailStatus' },
            emailStatus === 'Enabled' ? React.createElement(
                'span',
                { 'class': 'material-icons', style: { color: "green" } },
                'check_circle'
            ) : React.createElement(
                'span',
                { 'class': 'material-icons', style: { color: "red" } },
                'error'
            ),
            emailStatus
        ),
        React.createElement(
            'span',
            { 'class': 'version' },
            siteVersion
        )
    ),
    React.createElement('br', null),
    domainStatusDropdown ? React.createElement(
        'div',
        { className: 'section' },
        React.createElement(
            'div',
            { 'class': 'sectionHead' },
            React.createElement(
                'span',
                { 'class': 'sectionTitle' },
                'Domain Info'
            )
        ),
        React.createElement('div', { dangerouslySetInnerHTML: { __html: domainStatusDropdown.outerHTML } }),
        React.createElement('div', { dangerouslySetInnerHTML: { __html: accordionDomainRecord.outerHTML } }),
        React.createElement('div', { dangerouslySetInnerHTML: { __html: sslSatusDropdown.outerHTML } }),
        React.createElement('div', { dangerouslySetInnerHTML: { __html: accordionSslValidation.outerHTML } }),
        React.createElement('div', { dangerouslySetInnerHTML: { __html: ELBImportStatusDropdown.outerHTML } }),
        React.createElement('div', { dangerouslySetInnerHTML: { __html: accordionElbImport.outerHTML } })
    ) : "",
    React.createElement(
        'div',
        { className: 'adminSection section' },
        React.createElement(
            'div',
            { 'class': 'sectionHead' },
            React.createElement(
                'span',
                { 'class': 'sectionTitle' },
                'Admin'
            ),
            React.createElement(
                'div',
                { 'class': 'actions' },
                React.createElement('div', { 'class': 'sectionAction adminBtnContainer' })
            )
        ),
        React.createElement(
            'div',
            { className: 'adminInfo' },
            React.createElement(
                'div',
                { 'class': 'section' },
                React.createElement(
                    'div',
                    { 'class': 'sectionHead' },
                    React.createElement(
                        'span',
                        { 'class': 'sectionTitle' },
                        'Username'
                    )
                ),
                adminUsername
            ),
            React.createElement(
                'div',
                { 'class': 'section' },
                React.createElement(
                    'div',
                    { 'class': 'sectionHead' },
                    React.createElement(
                        'span',
                        { 'class': 'sectionTitle' },
                        'Password'
                    )
                ),
                React.createElement(
                    'span',
                    { 'class': 'password' },
                    adminPass
                )
            ),
            React.createElement(
                'div',
                { 'class': 'section' },
                React.createElement(
                    'div',
                    { 'class': 'sectionHead' },
                    React.createElement(
                        'span',
                        { 'class': 'sectionTitle' },
                        'Email'
                    )
                ),
                adminEmail
            )
        ),
        React.createElement('div', { 'class': 'tempAdminSection', dangerouslySetInnerHTML: { __html: passwordSection.outerHTML } })
    ),
    React.createElement(
        'div',
        { className: 'section' },
        React.createElement(
            'div',
            { 'class': 'sectionHead' },
            React.createElement(
                'span',
                { 'class': 'sectionTitle' },
                'Info'
            )
        ),
        React.createElement('ul', { dangerouslySetInnerHTML: { __html: mainInfo.innerHTML } })
    ),
    plugins ? React.createElement(
        'div',
        { className: 'section plugins' },
        React.createElement(
            'div',
            { 'class': 'sectionHead' },
            React.createElement(
                'span',
                { 'class': 'sectionTitle' },
                'Plugins'
            ),
            React.createElement(
                'div',
                { 'class': 'actions' },
                editBtn ? React.createElement('div', { 'class': 'sectionAction', dangerouslySetInnerHTML: { __html: editBtn.outerHTML } }) : ""
            )
        ),
        React.createElement('ul', { dangerouslySetInnerHTML: { __html: plugins.innerHTML } })
    ) : "",
    React.createElement('br', null),
    React.createElement(
        'h3',
        null,
        'Advanced'
    ),
    React.createElement('div', { dangerouslySetInnerHTML: { __html: advSettings.outerHTML } }),
    jobOutput ? React.createElement('div', { dangerouslySetInnerHTML: { __html: jobOutput.outerHTML } }) : "",
    React.createElement(
        'style',
        { jsx: true },
        '\n            .titleBar {\n                display: flex;\n                justify-content: space-between;\n            }\n            .col-sm-9 > *:not(.reactRoot) {\n                display: none;\n            }       \n            .adminInfo {\n                display: flex;\n                justify-content: space-between;\n                gap: 1rem;\n            }\n            .adminInfo .section {\n                width: 100%;\n                margin-top: 2rem;\n                background: white;\n            }\n            .adminInfo .sectionTitle {\n                font-size: 0.75rem;\n            }\n            .password {\n                -webkit-text-security: disc;\n            }\n            .password:hover {\n                -webkit-text-security: unset;\n            }\n            .sectionTitle {\n                pointer-events: none;\n            }\n            .sites-custom-create-admin-user-info::before {\n                content: \'Temp Admin\';\n                position: absolute;\n                margin-top: -1.5rem;\n                font-weight: bold;\n            }\n            .sites-custom-create-admin-user-info {\n                margin-top: 2.5rem;\n                display: flex;\n                gap: 1rem;\n            }\n            .fa.fa-user.fa-fw {\n                display: none;\n            }\n            .sites-custom-create-admin-user-info .text-muted,\n            .sites-custom-create-admin-user-info .admin-expire {\n                display: none;\n            }\n            .admin-password.form-control {\n                height: unset !important;\n                background: white;\n                border: none;\n            }\n            .input-group-btn .btn {\n                border-radius: 0 0.25rem 0.25rem 0;\n                border: none;\n                border-left: 1px solid gainsboro;\n                transition: filter 0.2s ease;\n            }\n            .input-group-btn .btn:hover {\n                filter: brightness(0.9);\n            }\n            .sites-custom-create-admin-user-info strong {\n                background: white;\n                padding: 0.5rem;\n                border-radius: 0.5rem;\n            }\n            .sites-custom-create-admin-user-info span,\n            .sites-custom-create-admin-user-info div {\n                max-width: unset !important;\n            }\n            .sites-custom-create-admin-user-info > * {\n                width: 100% !important;\n            }\n            .status:before {\n                content: "Status";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;     \n                font-weight: bold;       \n            }\n            .version:before {\n                content: "Version";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;      \n                font-weight: bold;             \n            }\n            .emailStatus:before {\n                content: "Email";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;           \n                font-weight: bold;        \n            }\n            .productionStatus:before {\n                content: "Deployment";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;           \n                font-weight: bold;        \n            }\n        '
    )
), document.querySelector('.reactRoot'));

var adminBtnContainer = document.querySelector('.adminBtnContainer');
if (adminBtn) {
    adminBtnContainer.appendChild(adminBtn);
}
document.querySelector('span[data-action="copy-to-clipboard"] button').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('.admin-password').value);
});