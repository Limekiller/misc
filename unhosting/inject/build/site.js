var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var infoParent = document.querySelector('.col-sm-9');

var siteTitle = infoParent.childNodes[0].textContent.split('Review: ')[1].trim();
var editBtn = infoParent.childNodes[2].querySelector('a');
var pluginsBtn = infoParent.childNodes[2].querySelector('a');

var siteStatus = infoParent.textContent.split('deployment status: ')[1].split("\n")[0].trim();
var siteVersion = infoParent.textContent.split('checkout:: ')[1].split(" ")[0].trim();
var emailStatus = infoParent.textContent.split('Email state: ')[1].split("Site admin")[0].trim();
var productionStatus = infoParent.textContent.split('Production site: ')[1].split(" ")[0].trim();

var domainStatusDropdown = infoParent.querySelector('.collapsed[href="#accordionDomainRecord"]');
var domainStatus = infoParent.textContent.split('Domain record status: ')[1].split('\n')[0] == 'Pass' ? 'check_circle' : 'error';

var domainTarget = infoParent.querySelector('#accordionDomainRecord') ? infoParent.querySelector('#accordionDomainRecord').querySelector('strong').innerText : null;
var accordionDomainRecord = infoParent.querySelector('#accordionDomainRecord');
var domainForm = infoParent.querySelector('#site_domain_record_run');

var sslStatus = infoParent.textContent.split('SSL certificate status: ')[1].split('\n')[0] == 'Pass' ? 'check_circle' : 'error';
var accordionSslValidation = infoParent.querySelector('#accordionSslValidation');
var sslName = accordionSslValidation ? accordionSslValidation.querySelectorAll('.breakword')[0].innerText : null;
var sslValue = accordionSslValidation ? accordionSslValidation.querySelectorAll('.breakword')[1].innerText : null;

var sslStatusDropdown = infoParent.querySelector('#accordionSslValidation div');
if (sslStatusDropdown) {
    sslStatusDropdown.removeChild(sslStatusDropdown.children[0]);
    sslStatusDropdown.removeChild(sslStatusDropdown.children[0]);
}

var ELBImportStatusDropdown = infoParent.querySelector('.collapsed[href="#accordionElbImport"]');
var elbStatus = infoParent.textContent.split('ELB import status: ')[1].split(' ')[0] == 'Pass' ? 'check_circle' : 'error';
var accordionElbImport = infoParent.querySelector('#accordionElbImport');
var elbForm = infoParent.querySelector('#site_elb_import_run');

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

var dropdown = function (_React$Component) {
    _inherits(dropdown, _React$Component);

    function dropdown(props) {
        _classCallCheck(this, dropdown);

        var _this = _possibleConstructorReturn(this, (dropdown.__proto__ || Object.getPrototypeOf(dropdown)).call(this, props));

        _this.componentDidMount = function () {
            var openHeight = document.querySelector('#dropdown-' + _this.props.id).clientHeight;
            _this.setState({ openHeight: openHeight, open: false });
        };

        _this.state = { open: true, openHeight: 0 };
        return _this;
    }

    _createClass(dropdown, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { id: 'dropdown-' + this.props.id, 'class': 'reactDropdown ' + (this.state.open ? 'open' : "") },
                React.createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: "row-reverse" } },
                    React.createElement(
                        'span',
                        { 'class': 'material-icons toggle', onClick: function onClick() {
                                return _this2.setState({ open: !_this2.state.open });
                            } },
                        'chevron_right'
                    ),
                    React.createElement('div', { 'class': 'title', style: { display: 'flex', alignItems: 'center' }, dangerouslySetInnerHTML: { __html: this.props.title } })
                ),
                React.createElement(
                    'div',
                    { 'class': 'content' },
                    this.props.children
                ),
                React.createElement(
                    'style',
                    { jsx: true },
                    '\n                .reactDropdown {\n                    margin-bottom: 1rem;\n                    border-radius: 0.5rem;\n                    padding: 1rem;\n                    border: 1px solid #eee;\n                    transition: background 0.2s ease, height 0.4s cubic-bezier(0.25, 1, 0.5, 1);\n                    overflow: hidden;\n                    height: ' + (this.state.openHeight ? '4rem' : 'auto') + ';\n                }\n                .reactDropdown * {\n                    word-wrap: anywhere;\n                }\n                .content {\n                    display: none;\n                }\n                #dropdown-' + this.props.id + '.open {\n                    background: #eee;\n                    height: ' + (this.state.openHeight ? this.state.openHeight + 'px' : 'auto') + ';\n                }\n                .open .content {\n                    display: unset;\n                }\n                .open .toggle {\n                    transform: rotate(90deg);\n                }\n                .reactDropdown .toggle {\n                    background: #eee;\n                    padding: 0.25rem;\n                    border-radius: 99rem;\n                    margin-right: 0.5rem;\n                    transition: transform 0.2s ease;\n                }\n                .title * {\n                    margin: 0;\n                }\n            '
                )
            );
        }
    }]);

    return dropdown;
}(React.Component);

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
        React.createElement(
            'div',
            { style: { display: 'flex', gap: '0.5rem' } },
            editBtn ? React.createElement('div', { dangerouslySetInnerHTML: { __html: editBtn.outerHTML } }) : "",
            infoParent.querySelector('a[href*="/local/muse"]') ? React.createElement(
                'a',
                {
                    href: url + '/local/muse',
                    target: '_blank',
                    'class': 'btn btn-primary',
                    style: {
                        color: '#f98113',
                        border: '1px solid #f98113',
                        background: 'white',
                        height: 'fit-content'
                    }
                },
                'Instant Login'
            ) : ""
        )
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
        { className: 'domainInfo' },
        React.createElement(dropdown, { id: 'domain', title: '<h5>\n                <span class="material-icons" style="color: ' + (domainStatus == "check_circle" ? 'green' : 'orange') + '">' + domainStatus + '</span>\n                <span class="material-icons">language</span> \n                Domain\n            </h5>' }, React.createElement(
            'div',
            null,
            React.createElement('br', null),
            React.createElement(
                'span',
                null,
                'In order to point your domain at our servers, please create a DNS record as follows:'
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(
                'table',
                null,
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            'Type'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Host'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Value'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            null,
                            'CNAME'
                        ),
                        React.createElement(
                            'td',
                            null,
                            url.split('/').slice(-1)[0],
                            '.'
                        ),
                        React.createElement(
                            'td',
                            null,
                            domainTarget,
                            '.'
                        )
                    )
                )
            ),
            React.createElement('br', null),
            React.createElement('div', { dangerouslySetInnerHTML: { __html: domainForm.outerHTML } })
        )),
        React.createElement(dropdown, { id: 'ssl', title: '<h5>\n                <span class="material-icons" style="color: ' + (sslStatus == "check_circle" ? 'green' : 'orange') + '">' + sslStatus + '</span>\n                <span class="material-icons">lock</span> \n                SSL Certificate\n            </h5>' }, React.createElement(
            'div',
            null,
            React.createElement('br', null),
            React.createElement(
                'span',
                null,
                'In order to verify your domain with Amazon to generate an SSL certificate, please create a DNS record as follows:'
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(
                'table',
                null,
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            'Type'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Host'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Value'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            null,
                            'CNAME'
                        ),
                        React.createElement(
                            'td',
                            null,
                            sslName
                        ),
                        React.createElement(
                            'td',
                            null,
                            sslValue
                        )
                    )
                )
            ),
            React.createElement('div', { dangerouslySetInnerHTML: { __html: sslStatusDropdown.innerHTML } })
        )),
        React.createElement(dropdown, { id: 'lb', title: '<h5>\n                <span class="material-icons" style="color: ' + (elbStatus == "check_circle" ? 'green' : 'orange') + '">' + elbStatus + '</span>\n                <span class="material-icons">dns</span> \n                Load Balancer Import\n            </h5>' }, React.createElement(
            'div',
            null,
            React.createElement('br', null),
            React.createElement(
                'span',
                null,
                'This check ensures the SSL certificate has been imported into the elastic load balancer.'
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement('div', { dangerouslySetInnerHTML: { __html: elbForm.outerHTML } })
        ))
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
        '\n            .titleBar {\n                display: flex;\n                justify-content: space-between;\n            }\n            .col-sm-9 > *:not(.reactRoot) {\n                display: none;\n            }       \n            .adminInfo {\n                display: flex;\n                justify-content: space-between;\n                gap: 1rem;\n            }\n            .domainInfo {\n                margin-bottom: 2rem;\n            }\n            .adminInfo .section {\n                width: 100%;\n                margin-top: 2rem;\n                background: white;\n            }\n            .adminInfo .sectionTitle {\n                font-size: 0.75rem;\n            }\n            .password {\n                -webkit-text-security: disc;\n            }\n            .password:hover {\n                -webkit-text-security: unset;\n            }\n            .sectionTitle {\n                pointer-events: none;\n            }\n            .sites-custom-create-admin-user-info::before {\n                content: \'Temp Admin\';\n                position: absolute;\n                margin-top: -1.5rem;\n                font-weight: bold;\n            }\n            .sites-custom-create-admin-user-info {\n                margin-top: 2.5rem;\n                display: flex;\n                gap: 1rem;\n            }\n            .fa.fa-user.fa-fw {\n                display: none;\n            }\n            .sites-custom-create-admin-user-info .text-muted,\n            .sites-custom-create-admin-user-info .admin-expire {\n                display: none;\n            }\n            .admin-password.form-control {\n                height: unset !important;\n                background: white;\n                border: none;\n            }\n            .input-group-btn .btn {\n                border-radius: 0 0.25rem 0.25rem 0;\n                border: none;\n                border-left: 1px solid gainsboro;\n                transition: filter 0.2s ease;\n            }\n            .input-group-btn .btn:hover {\n                filter: brightness(0.9);\n            }\n            .sites-custom-create-admin-user-info strong {\n                background: white;\n                padding: 0.5rem;\n                border-radius: 0.5rem;\n            }\n            .sites-custom-create-admin-user-info span,\n            .sites-custom-create-admin-user-info div {\n                max-width: unset !important;\n            }\n            .sites-custom-create-admin-user-info > * {\n                width: 100% !important;\n            }\n            .status:before {\n                content: "Status";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;     \n                font-weight: bold;       \n            }\n            .version:before {\n                content: "Version";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;      \n                font-weight: bold;             \n            }\n            .emailStatus:before {\n                content: "Email";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;           \n                font-weight: bold;        \n            }\n            .productionStatus:before {\n                content: "Deployment";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;           \n                font-weight: bold;        \n            }\n            td, th {\n                padding: 0.5rem;\n                border: 1px solid gainsboro;\n\n            }\n        '
    )
), document.querySelector('.reactRoot'));

var adminBtnContainer = document.querySelector('.adminBtnContainer');
if (adminBtn) {
    adminBtnContainer.appendChild(adminBtn);
}
document.querySelector('span[data-action="copy-to-clipboard"] button').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('.admin-password').value);
});