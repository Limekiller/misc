"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var links = [];
var reports = [];
document.querySelectorAll('nav .dropdown-item').forEach(function (item) {
    if (item.innerText.includes('Report')) {
        reports.push({
            link: item.href,
            text: item.innerText.trim()
        });
    } else {
        links.push({
            link: item.href,
            text: item.innerText.trim()
        });
    }
});

document.querySelector('nav .dropdown-menu').style.display = 'none';
document.querySelector('nav').insertAdjacentHTML('beforeend', "<div class='reactHeader'></div>");

var navbar = function (_React$Component) {
    _inherits(navbar, _React$Component);

    function navbar(props) {
        _classCallCheck(this, navbar);

        var _this = _possibleConstructorReturn(this, (navbar.__proto__ || Object.getPrototypeOf(navbar)).call(this, props));

        _this.icons = {
            'users': 'people',
            'releases': 'new_releases',
            'config settings': 'build',
            'create a new user': 'person_add',
            'your settings': 'settings',
            'modify permissions': 'badge',
            'support portal': 'support',
            'logout': 'logout',
            'back to my account': 'arrow_back'
        };

        _this.state = {
            expanded: false
        };
        return _this;
    }

    _createClass(navbar, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'nav',
                { 'class': 'reactNav' },
                this.props.links.map(function (link) {
                    var icon = _this2.icons[link.text.toLowerCase()];
                    return React.createElement(
                        'a',
                        { href: link.link },
                        React.createElement(
                            'span',
                            { 'class': 'material-icons' },
                            icon
                        ),
                        link.text
                    );
                }),
                reports.length > 0 ? React.createElement(
                    'div',
                    { 'class': 'reports ' + (this.state.expanded ? 'expanded' : '') },
                    React.createElement(
                        'button',
                        { onClick: function onClick() {
                                return _this2.setState({ expanded: !_this2.state.expanded });
                            } },
                        'Reports',
                        React.createElement(
                            'span',
                            { 'class': 'arrow' },
                            '\u25BC'
                        )
                    ),
                    reports.map(function (report) {
                        return React.createElement(
                            'a',
                            { href: report.link },
                            report.text
                        );
                    })
                ) : "",
                React.createElement(
                    'style',
                    { jsx: true },
                    '\n                .reactNav {\n                    display: flex;\n                    position: fixed;\n                    top: 1rem;\n                    right: 17rem;\n                    gap: 0.5rem;\n                    flex-direction: column;\n                }\n                .reactNav a {\n                    padding: 1rem;\n                    border-radius: 1rem;\n                    background: #eee;\n                    color: black;\n                    display: flex;\n                    gap: 0.5rem;\n                    align-items: center;\n                }\n                .reactNav a:hover {\n                    text-decoration: none;\n                    filter: brightness(0.9);\n                }\n                .reports {\n                    padding: 1rem;\n                    background: white;\n                    border: 2px solid #eee;\n                    border-radius: 0.5rem;\n                    line-height: 1.75rem;\n                    margin-top: 0.75rem;\n                }\n                .reports a {\n                    padding: 0;\n                    background: 0;\n                    color: #42a2dc;\n                    display: none;\n                }\n                .reports a:hover {\n                    text-decoration: underline;\n                }\n                .reports.expanded a {\n                    display: flex;\n                }\n                .reports button {\n                    background: none;\n                    border: none;\n                    padding: 0;\n                    font-weight: bold;\n                    display: flex;\n                    width: 100%;\n                    justify-content: space-between;\n                }\n                .reports.expanded .arrow {\n                    transform: rotate(180deg);\n                }\n\n                @media screen and (max-width: 1650px) {\n                    .reactNav {\n                        right: 1rem;\n                    }\n                }\n            '
                )
            );
        }
    }]);

    return navbar;
}(React.Component);

var headerRoot = ReactDOM.createRoot(document.querySelector('.reactHeader'));
headerRoot.render(React.createElement(navbar, { links: links }));