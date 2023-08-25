console.log('running...')
const infoParent = document.querySelector('.col-sm-9')
const domains = infoParent.childNodes[8]
const keys = infoParent.childNodes[12]
infoParent.innerHTML = ''

ReactDOM.render(
    <div>
        <div class="mainLists">
            <div class="domains">
                <span class="listHead">Domains</span>
                {domains.innerHTML}
            </div>
            <div class="keys">
                <span class="listHead">Public Keys</span>
                {keys.innerHTML}
            </div>
        </div>
    </div>,
    infoParent
);
