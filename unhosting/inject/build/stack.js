var infoParent = document.querySelector('.col-sm-9');

var stackStatus = infoParent.childNodes[2].querySelector('strong').textContent;
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

var stackTitle = infoParent.childNodes[0].textContent.split('Stack:')[1].trim();
var ip = infoParent.textContent.split('IP: ')[1].split(' ')[0];
var size = infoParent.textContent.split('Size: ')[1].split(' ')[0];
var state = infoParent.textContent.split('State: ')[1].split(' ')[0];

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
var storage = storageHeader.nextElementSibling;

var stackButtons = [];
stackButtons.push(document.evaluate("//a[contains(., 'Go to stack deployment')]", document, null, XPathResult.ANY_TYPE, null).iterateNext());
stackButtons.push(document.evaluate("//button[contains(., 'RDS Stop')]", document, null, XPathResult.ANY_TYPE, null).iterateNext());
stackButtons.push(document.evaluate("//button[contains(., 'EC2 Stop')]", document, null, XPathResult.ANY_TYPE, null).iterateNext());
stackButtons.push(document.evaluate("//button[contains(., 'Deploy webconfig')]", document, null, XPathResult.ANY_TYPE, null).iterateNext());
var stackButtonString = "";
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = stackButtons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var stackButton = _step.value;

        stackButtonString += stackButton ? stackButton.outerHTML : "";
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

var ec2Form = document.querySelector('#plugin-update-form[action="/cp/cloud_stacks/ec2_update"]');
var rdsForm = document.querySelector('#plugin-update-form[action="/cp/cloud_stacks/rds_update"]');
var cronForm = document.querySelector('#lazycron-update-form');

infoParent.insertAdjacentHTML('afterbegin', "<div class='reactRoot'></div>");

ReactDOM.render(React.createElement(
    'div',
    { 'class': 'reactInfo' },
    React.createElement(
        'h1',
        null,
        stackTitle
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
        React.createElement(
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
        ),
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
    React.createElement(
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
        React.createElement('div', { 'class': 'content', dangerouslySetInnerHTML: { __html: storage.innerHTML } })
    ),
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
    React.createElement(
        'style',
        { jsx: true },
        '\n            .mainLists {\n                display: grid;\n                grid-template-columns: auto auto;\n                gap: 1rem;\n            }\n            .content li {\n                list-style: none;\n                line-height: 1.75rem;\n            }\n            .mainInfo {\n                margin-top: 1rem;\n                display: grid;\n                grid-template-columns: auto auto;\n                gap: 0.5rem;\n            }\n            .stackInfoItem {\n                display: flex;\n                flex-direction: column;\n            }\n            .stackButtons {\n                margin-top: 1rem;\n                display: flex;\n                gap: 0.5rem;\n                justify-content: space-between;\n            }\n            .stackButtons .btn {\n                width: 100%;\n            }\n            .col-sm-9 > *:not(.reactRoot) {\n                display: none;\n            }           \n            .status:before {\n                content: "Status";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;     \n                font-weight: bold;       \n            }\n            .state:before {\n                content: "State";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;      \n                font-weight: bold;             \n            }\n            .size:before {\n                content: "Size";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;           \n                font-weight: bold;        \n            }\n        '
    )
), document.querySelector('.reactRoot'));