"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

document.querySelector('table').style.display = 'none';
document.querySelector('.col-sm-9').insertAdjacentHTML('beforeend', "<div class='reactRoot'></div>");

var stacks = {};
document.querySelectorAll('tbody tr').forEach(function (row) {
    var col0 = row.children[0];
    var title = col0.textContent;
    var id = col0.querySelector('a') ? col0.querySelector('a').href.split('/').slice(-1)[0] : null;
    var cloud = row.children[1].textContent;
    var status = row.children[2].textContent;
    var ec2 = row.children[3].textContent;
    var rds = row.children[4] ? row.children[4].textContent : null;
    stacks[id] = {
        title: title,
        cloud: cloud,
        status: status,
        ec2: ec2,
        rds: rds
    };
});

var stacksContainer = function (_React$Component) {
    _inherits(stacksContainer, _React$Component);

    function stacksContainer(props) {
        _classCallCheck(this, stacksContainer);

        var _this = _possibleConstructorReturn(this, (stacksContainer.__proto__ || Object.getPrototypeOf(stacksContainer)).call(this, props));

        _this.state = {
            stacks: props.stacks ? props.stacks : {}
        };
        return _this;
    }

    _createClass(stacksContainer, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { 'class': 'stacksContainer' },
                Object.keys(this.state.stacks).map(function (id) {
                    var stack = _this2.state.stacks[id];
                    return React.createElement(
                        'div',
                        { 'class': 'stack', key: id },
                        React.createElement(
                            'div',
                            { style: { display: 'flex', justifyContent: 'space-between' } },
                            React.createElement(
                                'a',
                                { href: '/cp/cloud_stacks/' + id },
                                React.createElement(
                                    'h3',
                                    null,
                                    stack.title
                                )
                            ),
                            stack.cloud
                        ),
                        React.createElement(
                            'div',
                            { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'bottom' } },
                            React.createElement(
                                'div',
                                { 'class': 'info' },
                                React.createElement(
                                    'span',
                                    { 'class': 'status' },
                                    stack.status === "deployment complete" ? React.createElement(
                                        'span',
                                        { 'class': 'material-icons', style: { color: 'green' } },
                                        'check_circle'
                                    ) : React.createElement(
                                        'span',
                                        { 'class': 'material-icons', style: { color: 'red' } },
                                        'error'
                                    ),
                                    stack.status
                                ),
                                React.createElement(
                                    'span',
                                    { 'class': 'ec2' },
                                    stack.ec2
                                ),
                                React.createElement(
                                    'span',
                                    { 'class': 'rds' },
                                    stack.ec2
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'options' },
                                React.createElement(
                                    'a',
                                    { href: '/cp/cloud_stacks/refresh/' + id },
                                    React.createElement(
                                        'span',
                                        { 'class': 'material-icons' },
                                        'refresh'
                                    )
                                ),
                                React.createElement(
                                    'a',
                                    { href: '/cp/cloud_stacks/delete/' + id },
                                    React.createElement(
                                        'span',
                                        { 'class': 'material-icons' },
                                        'delete_forever'
                                    )
                                )
                            )
                        )
                    );
                }),
                React.createElement(
                    'style',
                    { jsx: true },
                    '\n                .stacksContainer {\n                    margin-top: 1rem;\n                    display: flex;\n                    flex-direction: column;\n                    gap: 1rem;\n                }\n                .stack {\n                    background: #eee;\n                    border-radius: 0.5rem;\n                    padding: 1rem;\n                }\n                .stacksContainer h3 {\n                    color: #42a2dc;\n                }\n                .status {\n                    display: flex;\n                }\n                .status span:first-child {\n                    margin-right: 0.25rem;\n                }\n                .info {\n                    display: flex;\n                    margin-top: 1rem;\n                }\n                .info > span:not(:last-child):after {\n                    content: "\u2022";\n                    margin: 0 0.5rem;\n                }\n                .options {\n                    display: flex;\n                    gap: 0.5rem;\n                }\n                .options span {\n                    font-size: 2rem;\n                }\n                .options a:hover span {\n                    color: #42a2dc;\n                }\n            '
                )
            );
        }
    }]);

    return stacksContainer;
}(React.Component);

var root = ReactDOM.createRoot(document.querySelector('.reactRoot'));
root.render(React.createElement(stacksContainer, { stacks: stacks }));