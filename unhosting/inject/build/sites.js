"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

document.querySelector('table').style.display = 'none';
document.querySelector('.col-sm-9').insertAdjacentHTML('beforeend', "<div class='reactRoot'></div>");

var sitesContainer = function (_React$Component) {
    _inherits(sitesContainer, _React$Component);

    function sitesContainer(props) {
        _classCallCheck(this, sitesContainer);

        var _this = _possibleConstructorReturn(this, (sitesContainer.__proto__ || Object.getPrototypeOf(sitesContainer)).call(this, props));

        _this.getLastPage = function () {
            var page = 1;
            var pageLinks = document.querySelectorAll('.page-item a');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = pageLinks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var pageNum = item.href.split('page=')[1];
                    if (parseInt(pageNum) > page) {
                        page = pageNum;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return page;
        };

        _this.getSites = function () {
            var page = _this.getLastPage();
            for (var i = 1; i <= page; i++) {
                fetch('/home?page=' + i).then(function (response) {
                    return response.text();
                }).then(function (data) {
                    var sites = _this.state.sites;
                    var dom = new DOMParser().parseFromString(data, 'text/html');
                    dom.querySelectorAll('tbody tr').forEach(function (row) {
                        console.log(row);
                        if (!row.children[6].children[0]) {
                            return;
                        }
                        var id = row.children[6].children[0].href.split('/').slice(-1)[0];
                        sites[id] = {
                            "name": row.children[0].innerText.trim(),
                            "domain": row.children[1].innerText.trim(),
                            "status": row.children[2].innerText.trim(),
                            "app": row.children[3].innerText.trim(),
                            "stack": row.children[4].innerText.trim(),
                            "production": row.children[0].querySelector('i') ? true : false,
                            "slot": row.children[5].innerText.trim()
                        };
                    });
                    _this.setState({ sites: sites });
                });
            }
        };

        _this.state = {
            query: "",
            sites: props.sites ? props.sites : {}
        };
        return _this;
    }

    _createClass(sitesContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getSites();
            window.setInterval(this.getSites, 10000);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { 'class': 'sitesContainer' },
                React.createElement(
                    'label',
                    { 'for': 'filterSites' },
                    'Filter sites'
                ),
                React.createElement('input', { onKeyUp: function onKeyUp(e) {
                        return _this2.setState({ query: e.target.value });
                    }, 'class': 'filterSites', type: 'text', name: 'filterSites' }),
                Object.keys(this.state.sites).map(function (id) {
                    var site = _this2.state.sites[id];

                    var icon = null;
                    if (site.app === 'moodle') {
                        icon = 'https://raw.githubusercontent.com/Limekiller/misc/master/unhosting/inject/images/moodle.png';
                    } else if (site.app === 'workplace') {
                        icon = 'https://raw.githubusercontent.com/Limekiller/misc/master/unhosting/inject/images/workplace.png';
                    }

                    if (!_this2.state.query || site.name.includes(_this2.state.query) || site.domain.includes(_this2.state.query)) {
                        return React.createElement(
                            'div',
                            { 'class': 'site', key: id },
                            React.createElement(
                                'div',
                                { style: { display: 'flex', justifyContent: 'space-between' } },
                                React.createElement(
                                    'a',
                                    { href: '/cp/sites/' + id },
                                    React.createElement(
                                        'h3',
                                        { 'class': 'name' },
                                        site.name
                                    )
                                ),
                                React.createElement(
                                    'a',
                                    { target: '_blank', href: 'http://' + site.domain },
                                    React.createElement(
                                        'span',
                                        { 'class': 'link' },
                                        site.domain
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { style: { display: 'flex', justifyContent: 'space-between', marginTop: '1rem' } },
                                React.createElement(
                                    'div',
                                    { 'class': 'info' },
                                    React.createElement(
                                        'span',
                                        { 'class': 'status' },
                                        site.status === "complete" ? React.createElement(
                                            'span',
                                            { 'class': 'material-icons', style: { color: 'green' } },
                                            'check_circle'
                                        ) : React.createElement(
                                            'span',
                                            { 'class': 'material-icons', style: { color: 'red' } },
                                            'error'
                                        ),
                                        site.status
                                    ),
                                    React.createElement(
                                        'span',
                                        { 'class': 'app' },
                                        icon ? React.createElement('img', { src: icon }) : "",
                                        site.app
                                    ),
                                    React.createElement(
                                        'span',
                                        { 'class': 'production' },
                                        site.production ? React.createElement(
                                            'span',
                                            { 'class': 'material-icons', style: { color: '#f97d0d' } },
                                            'factory'
                                        ) : React.createElement(
                                            'span',
                                            { 'class': 'material-icons' },
                                            'science'
                                        ),
                                        site.production ? 'Production' : 'Staging'
                                    ),
                                    React.createElement(
                                        'span',
                                        { 'class': 'stack' },
                                        site.stack
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'options' },
                                    React.createElement(
                                        'a',
                                        { href: '/cp/sites/edit/' + id },
                                        React.createElement(
                                            'span',
                                            { 'class': 'material-icons' },
                                            'settings'
                                        )
                                    ),
                                    React.createElement(
                                        'a',
                                        { href: '/cp/sites/restore/' + id },
                                        React.createElement(
                                            'span',
                                            { 'class': 'material-icons' },
                                            'restore'
                                        )
                                    ),
                                    React.createElement(
                                        'a',
                                        { href: '/cp/sites/delete/' + id },
                                        React.createElement(
                                            'span',
                                            { 'class': 'material-icons' },
                                            'delete_forever'
                                        )
                                    )
                                )
                            )
                        );
                    }
                }),
                React.createElement(
                    'style',
                    { jsx: true },
                    '\n                .sitesContainer {\n                    margin-top: 1rem;\n                }\n                .site {\n                    background: #eee;\n                    border-radius: 0.5rem;\n                    padding: 1rem;\n                    margin: 1rem 0;\n                    height: 7.5rem;\n                }\n                .info {\n                    display: flex;\n                }\n                .info span:not(.material-icons) {\n                    display: flex;\n                    align-items: center;\n                    gap: 0.25rem;\n                }\n                .info span:not(:last-child):not(.material-icons):after {\n                    content: "\u2022";\n                    margin: 0 0.5rem;\n                }\n                .link {\n                    display: flex;\n                    gap: 0.25rem;\n                    color: #42a2dc;\n                }\n                .link * {\n                    color: #42a2dc;\n                }\n                .name {\n                    color: #42a2dc;\n                    text-decoration: none;\n                }\n                .options {\n                    display: flex;\n                    gap: 0.5rem;\n                }\n                .options span {\n                    font-size: 2rem;\n                }\n                .options a:hover span {\n                    color: #42a2dc;\n                }\n                .app img {\n                    width: 1.25rem;\n                }\n            '
                )
            );
        }
    }]);

    return sitesContainer;
}(React.Component);

var root = ReactDOM.createRoot(document.querySelector('.reactRoot'));
root.render(React.createElement(sitesContainer));