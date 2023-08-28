var infoParent = document.querySelector('.col-sm-9');

var siteTitle = infoParent.childNodes[0].textContent.split('Review: ')[1].trim();
var editBtn = infoParent.childNodes[2].querySelector('a');
var pluginsBtn = infoParent.childNodes[2].querySelector('a');
var stackStatus = infoParent.childNodes[9].querySelector('strong').textContent;

var siteStatus = infoParent.textContent.split('deployment status: ')[1].split(' ')[0].trim();
var siteVersion = infoParent.textContent.split('checkout:: ')[1].split(' ')[0];

var adminBtn = infoParent.childNodes[4];
var passwordSection = infoParent.childNodes[5];
var adminUsername = infoParent.childNodes[19].innerHTML.split('admin username:</span> ')[1].split('<')[0];
var adminPass = infoParent.childNodes[19].innerHTML.split('data-password="')[1].split('"')[0];
var adminEmail = infoParent.childNodes[19].innerHTML.split('admin email:</span> ')[1].split('<')[0];

var domainStatus = infoParent.childNodes[11];
var SSLStatus = infoParent.childNodes[13];
var ELBStatus = infoParent.childNodes[15];

var mainInfo = infoParent.childNodes[19];
var plugins = infoParent.childNodes[20].querySelector('ul');

var advSettings = infoParent.childNodes[22];
var jobOutput = infoParent.childNodes[28];

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
        React.createElement('div', { dangerouslySetInnerHTML: { __html: editBtn.outerHTML } })
    ),
    React.createElement(
        'div',
        { 'class': 'infoCards' },
        React.createElement(
            'span',
            { 'class': 'status' },
            siteStatus
        ),
        React.createElement(
            'span',
            { 'class': 'version' },
            siteVersion
        )
    ),
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
        React.createElement('ul', { dangerouslySetInnerHTML: { __html: mainInfo.innerHTML } })
    ),
    React.createElement(
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
                React.createElement('div', { 'class': 'sectionAction', dangerouslySetInnerHTML: { __html: editBtn.outerHTML } })
            )
        ),
        React.createElement('ul', { dangerouslySetInnerHTML: { __html: plugins.innerHTML } })
    ),
    React.createElement('br', null),
    React.createElement(
        'h3',
        null,
        'Advanced'
    ),
    React.createElement('div', { dangerouslySetInnerHTML: { __html: advSettings.outerHTML } }),
    React.createElement('div', { dangerouslySetInnerHTML: { __html: jobOutput.outerHTML } }),
    React.createElement(
        'style',
        { jsx: true },
        '\n            .titleBar {\n                display: flex;\n                justify-content: space-between;\n            }\n            .col-sm-9 > *:not(.reactRoot) {\n                display: none;\n            }       \n            .adminInfo {\n                display: flex;\n                justify-content: space-between;\n                gap: 1rem;\n            }\n            .adminInfo .section {\n                width: 100%;\n                margin-top: 2rem;\n                background: white;\n            }\n            .adminInfo .sectionTitle {\n                font-size: 0.75rem;\n            }\n            .password {\n                -webkit-text-security: disc;\n            }\n            .password:hover {\n                -webkit-text-security: unset;\n            }\n            .sectionTitle {\n                pointer-events: none;\n            }\n            .sites-custom-create-admin-user-info::before {\n                content: \'Temp Admin\';\n                position: absolute;\n                margin-top: -1.5rem;\n                font-weight: bold;\n            }\n            .sites-custom-create-admin-user-info {\n                margin-top: 2.5rem;\n                display: flex;\n                gap: 1rem;\n            }\n            .fa.fa-user.fa-fw {\n                display: none;\n            }\n            .sites-custom-create-admin-user-info .text-muted,\n            .sites-custom-create-admin-user-info .admin-expire {\n                display: none;\n            }\n            .admin-password.form-control {\n                height: unset !important;\n                background: white;\n                border: none;\n            }\n            .input-group-btn .btn {\n                border-radius: 0 0.25rem 0.25rem 0;\n                border: none;\n                border-left: 1px solid gainsboro;\n                transition: filter 0.2s ease;\n            }\n            .input-group-btn .btn:hover {\n                filter: brightness(0.9);\n            }\n            .sites-custom-create-admin-user-info strong {\n                background: white;\n                padding: 0.5rem;\n                border-radius: 0.5rem;\n            }\n            .sites-custom-create-admin-user-info span,\n            .sites-custom-create-admin-user-info div {\n                max-width: unset !important;\n            }\n            .sites-custom-create-admin-user-info > * {\n                width: 100% !important;\n            }\n        '
    )
), document.querySelector('.reactRoot'));

var adminBtnContainer = document.querySelector('.adminBtnContainer');
adminBtnContainer.appendChild(adminBtn);