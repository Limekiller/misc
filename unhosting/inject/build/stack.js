var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var infoParent = document.querySelector('.col-sm-9');

var stackStatus = infoParent.querySelector('p a[href*="cloud_stacks/deploy"]').textContent;
var statusText = void 0;
var statusIconSpan = void 0;
if (stackStatus.includes('complete')) {
    statusText = 'Complete';
    statusIconSpan = React.createElement(
        'span',
        { 'class': 'material-icons', style: { color: "green" } },
        'check_circle'
    );
} else if (stackStatus.includes('failed')) {
    statusText = 'Failed';
    statusIconSpan = React.createElement(
        'span',
        { 'class': 'material-icons', style: { color: "red" } },
        'error'
    );
} else {
    statusText = 'Warning';
    statusIconSpan = React.createElement(
        'span',
        { 'class': 'material-icons', style: { color: "yellow" } },
        'warning'
    );
}

var stackTitle = infoParent.querySelector('h3').textContent.split('Stack:')[1].trim();
var accountId = document.querySelector('em').innerText;
var connectionLink = document.querySelector('a[href="/cp/cloud_connections/"]');
var ip = infoParent.textContent.split('IP: ')[1].split(' ')[0];
var size = infoParent.textContent.split('Size: ')[1].split(' ')[0];
var state = infoParent.textContent.split('State: ')[1].split(' ')[0];

var is_v2 = true;
if (ip) {
    is_v2 = false;
}

var domainHeader = document.evaluate("//strong[contains(., 'Domains')]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
var domains = void 0;
if (domainHeader) {
    domains = domainHeader.nextElementSibling;
}

var keysHeader = document.evaluate("//strong[contains(., 'Public Keys')]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
var keys = void 0;
if (keysHeader) {
    keys = keysHeader.nextElementSibling;
}

var deleteKeyBtn = infoParent.querySelector('.btn-danger');
var addKeyBtn = document.evaluate("//a[contains(., 'Add Public Keys')]", document, null, XPathResult.ANY_TYPE, null).iterateNext();

var stackInfo = infoParent.querySelectorAll('p')[2];
var stackInfoList = [];
for (var i = 0; i < stackInfo.childNodes.length; i += 4) {
    stackInfoList.push(React.createElement(
        'div',
        { 'class': 'stackInfoItem' },
        React.createElement(
            'strong',
            null,
            stackInfo.childNodes[i].innerHTML
        ),
        stackInfo.childNodes[i + 1].textContent.trim()
    ));
}

var storageHeader = document.evaluate("//strong[contains(., 'Storage')]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
var storage = {};
if (storageHeader) {
    var storageElem = storageHeader.nextElementSibling;
    var storageLines = storageElem.innerText.split('\n');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = storageLines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var line = _step.value;

            var obj = {};
            if (line.includes('/')) {
                obj['used'] = line.split('/')[0].trim().split(' ')[1];
                obj['total'] = line.split('/')[1].trim().split(' ')[0];
            } else {
                obj['total'] = line.split(' ')[1];
            }
            storage[line.split(":")[0]] = obj;
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
}

var stackButtons = [];
stackButtons.push(document.evaluate("//a[contains(., 'Go to stack deployment')]", document, null, XPathResult.ANY_TYPE, null).iterateNext());
stackButtons.push(document.evaluate("//button[contains(., 'RDS Stop')]", document, null, XPathResult.ANY_TYPE, null).iterateNext());
stackButtons.push(document.evaluate("//button[contains(., 'EC2 Stop')]", document, null, XPathResult.ANY_TYPE, null).iterateNext());
stackButtons.push(document.evaluate("//button[contains(., 'Deploy webconfig')]", document, null, XPathResult.ANY_TYPE, null).iterateNext());
var stackButtonString = "";
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    for (var _iterator2 = stackButtons[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var stackButton = _step2.value;

        stackButtonString += stackButton ? stackButton.outerHTML : "";
    }
} catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
        }
    } finally {
        if (_didIteratorError2) {
            throw _iteratorError2;
        }
    }
}

var ec2Form = document.querySelector('#plugin-update-form[action="/cp/cloud_stacks/ec2_update"]');
var rdsForm = document.querySelector('#plugin-update-form[action="/cp/cloud_stacks/rds_update"]');
var cronForm = document.querySelector('#lazycron-update-form');

infoParent.insertAdjacentHTML('afterbegin', "<div class='reactRoot'></div>");

var storageGraph = function (_React$Component) {
    _inherits(storageGraph, _React$Component);

    function storageGraph(props) {
        _classCallCheck(this, storageGraph);

        var _this = _possibleConstructorReturn(this, (storageGraph.__proto__ || Object.getPrototypeOf(storageGraph)).call(this, props));

        _this.getPercentUsed = function () {
            var percent = 100;
            if (_this.props.used) {
                percent = parseFloat(_this.props.used) / parseFloat(_this.props.total) * 100;
            }
            return parseInt(percent);
        };

        return _this;
    }

    _createClass(storageGraph, [{
        key: 'render',
        value: function render() {
            var percent = this.getPercentUsed();
            var color = percent > 80 && this.props.used ? 'red' : '#42a2dc';

            return React.createElement(
                'div',
                { 'class': 'storageGraph' },
                React.createElement(
                    'span',
                    { 'class': 'title' },
                    this.props.title
                ),
                React.createElement(
                    'div',
                    { 'class': 'graph', style: { background: 'conic-gradient(' + color + ' ' + percent + '%, transparent ' + percent + '%)' } },
                    React.createElement('div', { 'class': 'mask' }),
                    React.createElement(
                        'span',
                        { 'class': 'used' },
                        this.props.used
                    ),
                    this.props.used ? React.createElement(
                        'span',
                        { 'class': 'total' },
                        '/ ',
                        this.props.total
                    ) : React.createElement(
                        'span',
                        { 'class': 'total', style: { fontSize: '1.25rem', fontWeight: 'bold' } },
                        this.props.total
                    )
                ),
                React.createElement(
                    'style',
                    { jsx: true },
                    '\n                .storageGraph {\n                    text-align: center;\n                }\n                .title {\n                    font-weight: bold;\n                }\n                .graph {\n                    background-color: #d6d6d6 !important;\n                    margin-top: 0.5rem;\n                    width: 6rem;\n                    height: 6rem;\n                    border-radius: 99rem;\n                    display: flex;\n                    flex-direction: column;\n                    align-items: center;\n                    justify-content: center;\n                    line-height: 1rem;\n                }\n                .used {\n                    font-size: 1.25rem;\n                    font-weight: bold;\n                }\n                .total {\n                    font-size: 0.75rem;\n                }\n                .graph span {\n                    z-index: 1;\n                }\n                .mask {\n                    width: 5rem;\n                    height: 5rem;\n                    background: #eee;\n                    position: absolute;\n                    border-radius: 99rem;\n                }\n            '
                )
            );
        }
    }]);

    return storageGraph;
}(React.Component);

ReactDOM.render(React.createElement(
    'div',
    { 'class': 'reactInfo' },
    React.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement(
            'h1',
            null,
            stackTitle
        ),
        React.createElement(
            'span',
            null,
            '#',
            accountId
        )
    ),
    React.createElement(
        'h3',
        null,
        ip
    ),
    React.createElement(
        'div',
        { 'class': 'infoCards' },
        React.createElement(
            'span',
            { 'class': 'status' },
            statusIconSpan,
            statusText
        ),
        !is_v2 ? React.createElement(
            'span',
            { 'class': 'state' },
            state == 'running' ? React.createElement(
                'span',
                { 'class': 'material-icons', style: { color: "green" } },
                'check_circle'
            ) : React.createElement(
                'span',
                { 'class': 'material-icons', style: { color: "red" } },
                'error'
            ),
            state == 'running' ? "Running" : "Stopped"
        ) : "",
        React.createElement(
            'span',
            { 'class': 'size' },
            size
        )
    ),
    React.createElement(
        'div',
        { 'class': 'mainLists' },
        domains ? React.createElement(
            'div',
            { 'class': 'domains section' },
            React.createElement(
                'div',
                { 'class': 'sectionHead' },
                React.createElement(
                    'span',
                    { 'class': 'sectionTitle' },
                    'Domains'
                )
            ),
            React.createElement('div', { 'class': 'content', dangerouslySetInnerHTML: { __html: domains.innerHTML } })
        ) : "",
        keys ? React.createElement(
            'div',
            { 'class': 'keys section' },
            React.createElement(
                'div',
                { 'class': 'sectionHead' },
                React.createElement(
                    'span',
                    { 'class': 'sectionTitle' },
                    'Keys'
                ),
                React.createElement(
                    'div',
                    { 'class': 'actions' },
                    React.createElement('div', { 'class': 'sectionAction', dangerouslySetInnerHTML: { __html: addKeyBtn.outerHTML } }),
                    React.createElement('div', { 'class': 'sectionAction', dangerouslySetInnerHTML: { __html: deleteKeyBtn.outerHTML } })
                )
            ),
            React.createElement('div', { 'class': 'content', dangerouslySetInnerHTML: { __html: keys.innerHTML } })
        ) : ""
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
                'Info'
            )
        ),
        React.createElement(
            'div',
            { 'class': 'content mainInfo' },
            stackInfoList
        )
    ),
    Object.keys(storage).length > 0 ? React.createElement(
        'div',
        { 'class': 'section' },
        React.createElement(
            'div',
            { 'class': 'sectionHead' },
            React.createElement(
                'span',
                { 'class': 'sectionTitle' },
                'Storage'
            )
        ),
        React.createElement(
            'div',
            { 'class': 'content graphs' },
            Object.keys(storage).map(function (key) {
                return React.createElement(storageGraph, {
                    title: key,
                    used: storage[key]['used'],
                    total: storage[key]['total']
                });
            })
        )
    ) : "",
    React.createElement('div', {
        'class': 'stackButtons',
        dangerouslySetInnerHTML: { __html: stackButtonString }
    }),
    React.createElement('br', null),
    React.createElement(
        'h3',
        null,
        'Advanced'
    ),
    React.createElement('div', { dangerouslySetInnerHTML: { __html: ec2Form ? ec2Form.outerHTML : "" } }),
    React.createElement('div', { dangerouslySetInnerHTML: { __html: rdsForm ? rdsForm.outerHTML : "" } }),
    React.createElement('div', { dangerouslySetInnerHTML: { __html: cronForm ? cronForm.outerHTML : "" } }),
    is_v2 ? React.createElement(
        'style',
        { jsx: true },
        '\n            .mainLists div {\n                display: grid;\n                grid-template-columns: auto auto;\n            }\n        '
    ) : "",
    React.createElement(
        'style',
        { jsx: true },
        '\n            .mainLists {\n                display: flex;\n                gap: 1rem;\n            }\n            .mainLists > div {\n                width: 100%;\n            }\n            .content li {\n                list-style: none;\n                line-height: 1.75rem;\n            }\n            .mainInfo {\n                margin-top: 1rem;\n                display: grid;\n                grid-template-columns: auto auto;\n                gap: 0.5rem;\n            }\n            .stackInfoItem {\n                display: flex;\n                flex-direction: column;\n            }\n            .stackButtons {\n                margin-top: 1rem;\n                display: flex;\n                gap: 0.5rem;\n                justify-content: space-between;\n            }\n            .stackButtons .btn {\n                width: 100%;\n            }\n            .col-sm-9 > *:not(.reactRoot) {\n                display: none;\n            }           \n            .status:before {\n                content: "Status";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;     \n                font-weight: bold;       \n            }\n            .state:before {\n                content: "State";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;      \n                font-weight: bold;             \n            }\n            .size:before {\n                content: "Size";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;           \n                font-weight: bold;        \n            }\n            .graphs {\n                display: flex;\n                gap: 1rem;\n                justify-content: space-around;\n            }\n        '
    )
), document.querySelector('.reactRoot'));