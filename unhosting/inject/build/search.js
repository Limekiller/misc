"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var infoParent = document.querySelector('.col-md-9');
infoParent.insertAdjacentHTML('afterbegin', "<div class='reactRoot'></div>");

var helpText = document.querySelector('#searchhelp').innerHTML;

var searchContainer = function (_React$Component) {
    _inherits(searchContainer, _React$Component);

    function searchContainer(props) {
        _classCallCheck(this, searchContainer);

        var _this = _possibleConstructorReturn(this, (searchContainer.__proto__ || Object.getPrototypeOf(searchContainer)).call(this, props));

        _this.fetchResults = function () {
            var tokens = getTokens();
            fetch('/spark/kiosk/users/search', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "X-CSRF-TOKEN": tokens.csrf,
                    "X-XSRF-TOKEN": tokens.xsrf,
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: JSON.stringify({
                    query: '*' + _this.state.query + '*'
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                _this.setState({ results: data });
            });
        };

        _this.state = {
            query: "",
            helpActive: false,
            results: []
        };
        return _this;
    }

    _createClass(searchContainer, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { 'class': 'searchContainer' },
                React.createElement(
                    'label',
                    { 'for': 'user' },
                    'Search users'
                ),
                React.createElement(
                    'div',
                    { 'class': 'flexContainer' },
                    React.createElement('input', {
                        type: 'text',
                        id: 'user',
                        name: 'user',
                        'class': 'search',
                        onKeyUp: function onKeyUp(e) {
                            _this2.setState({ query: e.target.value });window.setTimeout(_this2.fetchResults, 250);
                        }
                    }),
                    React.createElement(
                        'button',
                        { 'class': 'searchBtn btn btn-primary', onClick: this.fetchResults },
                        'Search'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', onClick: function onClick() {
                                return _this2.setState({ helpActive: !_this2.state.helpActive });
                            }, 'class': 'help' },
                        React.createElement(
                            'span',
                            { 'class': 'material-icons', style: { color: "rgb(94, 94, 94)" } },
                            'help'
                        )
                    ),
                    React.createElement('div', {
                        'class': 'helpText ' + (this.state.helpActive ? 'active' : ''),
                        dangerouslySetInnerHTML: { __html: helpText }
                    })
                ),
                React.createElement(
                    'div',
                    { 'class': 'resultContainer' },
                    this.state.results.map(function (result) {
                        return React.createElement(
                            'div',
                            { 'class': 'result' },
                            React.createElement(
                                'span',
                                { 'class': 'name' },
                                result.firstname,
                                ' ',
                                result.lastname
                            ),
                            React.createElement(
                                'span',
                                { 'class': 'email' },
                                result.email
                            ),
                            React.createElement(
                                'a',
                                { href: '/spark/kiosk/users/impersonate/' + result.id },
                                React.createElement(
                                    'button',
                                    { 'class': 'btn btn-primary' },
                                    'Access'
                                )
                            )
                        );
                    })
                ),
                React.createElement(
                    'style',
                    { jsx: true },
                    '\n                .flexContainer {\n                    display: flex;\n                    align-items: center;\n                    position: relative;\n                }\n                .resultContainer {\n                    display: grid;\n                    grid-template-columns: auto auto auto;\n                    gap: 1rem;\n                    margin-top: 1rem;\n                }\n                .result {\n                    padding: 1rem;\n                    background: #eee;\n                    border-radius: 0.5rem;\n                    display: flex;\n                    flex-direction: column;\n                }\n                .result button {\n                    width: 100%;\n                    margin-top: 1rem;\n                }\n                .name {\n                    font-weight: bold;\n                }\n                .help {\n                    margin-left: 1rem;\n                }\n                .search {\n                    border-radius: 0.25rem 0 0 0.25rem;\n                }\n                .searchBtn {\n                    border-radius: 0 0.25rem 0.25rem 0;\n                    height: 40px;\n                }\n                #users {\n                    display: none;\n                }\n                .helpText {\n                    position: absolute;\n                    width: 290px;\n                    top: 2rem;\n                    right: -16px;\n                    background: #eee;\n                    transform: scale(0.9);\n                    padding: 0.5rem;\n                    border-radius: 0.25rem;\n                    opacity: 0;\n                    pointer-events: none;\n                    border: 1px solid gainsboro;\n                }\n                .helpText li {\n                    padding: 0;\n                    background: none;\n                    list-style: default;\n                }\n                .helpText:before {\n                    content: \'\';\n                    width: 20px;\n                    height: 20px;\n                    background: #eee;\n                    position: absolute;\n                    display: block;\n                    top: -10px;\n                    transform: rotate(-45deg);\n                    right: 4px;\n                    border: 1px solid gainsboro;\n                    border-bottom: 0;\n                    border-left: 0;\n                }\n                .helpText.active {\n                    opacity: 1;\n                }\n                .tab-content {\n                    display: none;\n                }\n            '
                )
            );
        }
    }]);

    return searchContainer;
}(React.Component);

var root = ReactDOM.createRoot(document.querySelector('.reactRoot'));
root.render(React.createElement(searchContainer));