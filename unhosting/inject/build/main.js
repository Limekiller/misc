console.log('running...');
var infoParent = document.querySelector('.col-sm-9');
var domains = infoParent.childNodes[8];
var keys = infoParent.childNodes[12];
infoParent.innerHTML = '';

ReactDOM.render(React.createElement(
    'div',
    null,
    React.createElement(
        'div',
        { 'class': 'mainLists' },
        React.createElement(
            'div',
            { 'class': 'domains' },
            React.createElement(
                'span',
                { 'class': 'listHead' },
                'Domains'
            ),
            domains.innerHTML
        ),
        React.createElement(
            'div',
            { 'class': 'keys' },
            React.createElement(
                'span',
                { 'class': 'listHead' },
                'Public Keys'
            ),
            keys.innerHTML
        )
    )
), infoParent);