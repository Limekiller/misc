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
var ip = infoParent.childNodes[16].innerHTML.split('IP:</strong> ')[1].split('<br>')[0];
var size = infoParent.childNodes[16].innerHTML.split('Size:</strong> ')[1].split('<br>')[0];
var state = infoParent.childNodes[16].innerHTML.split('State:</strong> ')[1].split('<br>')[0];

var domains = infoParent.childNodes[8];
var keys = infoParent.childNodes[12];
var deleteKeyBtn = infoParent.childNodes[14];
var addKeyBtn = infoParent.childNodes[30];

var stackInfo = infoParent.childNodes[16];
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

var storage = infoParent.childNodes[20];

var stackButtons = [];
for (var _i = 32; _i < 40; _i += 2) {
    stackButtons.push(React.createElement('div', { 'class': 'stackButton', dangerouslySetInnerHTML: { __html: infoParent.childNodes[_i].outerHTML } }));
}

var ec2Form = infoParent.childNodes[40];
var rdsForm = infoParent.childNodes[44];
var cronForm = infoParent.childNodes[46];

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
        React.createElement(
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
        ),
        React.createElement(
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
        )
    ),
    React.createElement(
        'div',
        { 'class': 'section mainInfo' },
        React.createElement(
            'div',
            { 'class': 'sectionHead' },
            React.createElement(
                'span',
                { 'class': 'sectionTitle' },
                'Info'
            )
        ),
        stackInfoList
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
    React.createElement(
        'div',
        { 'class': 'stackButtons' },
        stackButtons.map(function (stackButton) {
            return stackButton;
        })
    ),
    React.createElement('br', null),
    React.createElement(
        'h3',
        null,
        'Advanced'
    ),
    React.createElement('div', { dangerouslySetInnerHTML: { __html: ec2Form.outerHTML } }),
    React.createElement('div', { dangerouslySetInnerHTML: { __html: rdsForm.outerHTML } }),
    React.createElement('div', { dangerouslySetInnerHTML: { __html: cronForm.outerHTML } }),
    React.createElement(
        'style',
        { jsx: true },
        '\n            .mainLists {\n                display: grid;\n                grid-template-columns: auto auto;\n                gap: 1rem;\n            }\n            .content li {\n                list-style: none;\n                line-height: 1.75rem;\n            }\n            .mainInfo {\n                margin-top: 1rem;\n                display: grid;\n                grid-template-columns: auto auto;\n                gap: 0.5rem;\n            }\n            .stackInfoItem {\n                display: flex;\n                flex-direction: column;\n            }\n            .stackButtons {\n                margin-top: 1rem;\n                display: flex;\n                gap: 0.5rem;\n                justify-content: space-between;\n            }\n            .stackButton {\n                width: 100%;\n            }\n            .stackButton .btn {\n                width: 100%;\n                height: 100%;\n            }\n            .col-sm-9 > *:not(.reactRoot) {\n                display: none;\n            }           \n            .status:before {\n                content: "Status";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;     \n                font-weight: bold;       \n            }\n            .state:before {\n                content: "State";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;      \n                font-weight: bold;             \n            }\n            .size:before {\n                content: "Size";\n                position: absolute;\n                top: -1.8rem;\n                left: 0;           \n                font-weight: bold;        \n            }\n        '
    )
), document.querySelector('.reactRoot'));