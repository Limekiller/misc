const infoParent = document.querySelector('.col-sm-9')

const stackStatus = infoParent.childNodes[2].querySelector('strong').textContent
let statusText
let statusIconSpan
if (stackStatus.includes('complete')) {
    statusText = 'Complete'
    statusIconSpan = <span class="material-icons" style={{color: "green"}}>check_circle</span>
} else if (stackStatus.includes('failed')) {
    statusText = 'Failed'
    statusIconSpan = <span class="material-icons" style={{color: "red"}}>error</span>
} else {
    statusText = 'Warning'
    statusIconSpan = <span class="material-icons" style={{color: "yellow"}}>warning</span>
}

const stackTitle = infoParent.childNodes[0].textContent.split('Stack:')[1].trim();
const ip = infoParent.textContent.split('IP: ')[1].split(' ')[0]
const size = infoParent.textContent.split('Size: ')[1].split(' ')[0]
const state = infoParent.textContent.split('State: ')[1].split(' ')[0]

const domainHeader = document.evaluate("//strong[contains(., 'Domains')]", document, null, XPathResult.ANY_TYPE, null ).iterateNext()
let domains
if (domainHeader) {
    domains = domainHeader.nextElementSibling
}

const keysHeader = document.evaluate("//strong[contains(., 'Public Keys')]", document, null, XPathResult.ANY_TYPE, null ).iterateNext()
let keys
if (keysHeader) {
    keys = keysHeader.nextElementSibling
}

const deleteKeyBtn = infoParent.querySelector('.btn-danger')
const addKeyBtn = document.evaluate("//a[contains(., 'Add Public Keys')]", document, null, XPathResult.ANY_TYPE, null ).iterateNext()

const stackInfo = infoParent.querySelectorAll('p')[2]
let stackInfoList = []
for (let i = 0; i < stackInfo.childNodes.length; i += 4){
    stackInfoList.push(
        <div class="stackInfoItem">
            <strong>{stackInfo.childNodes[i].innerHTML}</strong>
            {stackInfo.childNodes[i+1].textContent.trim()}
        </div>
    )
}

const storageHeader = document.evaluate("//strong[contains(., 'Storage')]", document, null, XPathResult.ANY_TYPE, null ).iterateNext()
const storage = storageHeader.nextElementSibling

let stackButtons = []
stackButtons.push(document.evaluate("//a[contains(., 'Go to stack deployment')]", document, null, XPathResult.ANY_TYPE, null ).iterateNext())
stackButtons.push(document.evaluate("//button[contains(., 'RDS Stop')]", document, null, XPathResult.ANY_TYPE, null ).iterateNext())
stackButtons.push(document.evaluate("//button[contains(., 'EC2 Stop')]", document, null, XPathResult.ANY_TYPE, null ).iterateNext())
stackButtons.push(document.evaluate("//button[contains(., 'Deploy webconfig')]", document, null, XPathResult.ANY_TYPE, null ).iterateNext())
let stackButtonString = ""
for (let stackButton of stackButtons) {
    stackButtonString += stackButton ? stackButton.outerHTML : ""
}

const ec2Form = document.querySelector('#plugin-update-form[action="/cp/cloud_stacks/ec2_update"]')
const rdsForm = document.querySelector('#plugin-update-form[action="/cp/cloud_stacks/rds_update"]')
const cronForm = document.querySelector('#lazycron-update-form')

infoParent.insertAdjacentHTML( 'afterbegin', "<div class='reactRoot'></div>" );

ReactDOM.render(
    <div class="reactInfo">
        <h1>{stackTitle}</h1>
        <h3>{ip}</h3>
        <div class="infoCards">
            <span class="status">
                {statusIconSpan}
                {statusText}
            </span>
            <span class="state">
                {state == 'running' ? 
                    <span class="material-icons" style={{color: "green"}}>check_circle</span> : 
                    <span class="material-icons" style={{color: "red"}}>error</span>
                }
                {state == 'running' ? "Running" : "Stopped"}
            </span>
            <span class="size">{size}</span>
        </div>
        <div class="mainLists">
            {domains ?
                <div class="domains section">
                    <div class='sectionHead'>
                        <span class="sectionTitle">Domains</span>
                    </div>                
                    <div class='content' dangerouslySetInnerHTML={{__html: domains.innerHTML}}/>
                </div>
            : ""}
            {keys ?
                <div class="keys section">
                    <div class='sectionHead'>
                        <span class="sectionTitle">Keys</span>
                        <div class='actions'>
                            <div class='sectionAction' dangerouslySetInnerHTML={{__html: addKeyBtn.outerHTML}}/>
                            <div class='sectionAction' dangerouslySetInnerHTML={{__html: deleteKeyBtn.outerHTML}}/>
                        </div>
                    </div>                
                    <div class='content' dangerouslySetInnerHTML={{__html: keys.innerHTML}}/>
                </div>
            : ""}
        </div>
        <div class="section">
            <div class='sectionHead'>
                <span class="sectionTitle">Info</span>
            </div>
            <div class='content mainInfo'>{stackInfoList}</div>
        </div>
        <div class="section">
            <div class='sectionHead'>
                <span class="sectionTitle">Storage</span>
            </div>
            <div class='content' dangerouslySetInnerHTML={{__html: storage.innerHTML}}/>
        </div>
        <div 
            class="stackButtons" 
            dangerouslySetInnerHTML={{__html: stackButtonString}}
        />
        <br />
        <h3>Advanced</h3>
        <div dangerouslySetInnerHTML={{__html: ec2Form ? ec2Form.outerHTML : ""}} />
        <div dangerouslySetInnerHTML={{__html: rdsForm ? rdsForm.outerHTML : ""}} />
        <div dangerouslySetInnerHTML={{__html: cronForm ? cronForm.outerHTML : ""}} />
        <style jsx>{`
            .mainLists {
                display: grid;
                grid-template-columns: auto auto;
                gap: 1rem;
            }
            .content li {
                list-style: none;
                line-height: 1.75rem;
            }
            .mainInfo {
                margin-top: 1rem;
                display: grid;
                grid-template-columns: auto auto;
                gap: 0.5rem;
            }
            .stackInfoItem {
                display: flex;
                flex-direction: column;
            }
            .stackButtons {
                margin-top: 1rem;
                display: flex;
                gap: 0.5rem;
                justify-content: space-between;
            }
            .stackButtons .btn {
                width: 100%;
            }
            .col-sm-9 > *:not(.reactRoot) {
                display: none;
            }           
            .status:before {
                content: "Status";
                position: absolute;
                top: -1.8rem;
                left: 0;     
                font-weight: bold;       
            }
            .state:before {
                content: "State";
                position: absolute;
                top: -1.8rem;
                left: 0;      
                font-weight: bold;             
            }
            .size:before {
                content: "Size";
                position: absolute;
                top: -1.8rem;
                left: 0;           
                font-weight: bold;        
            }
        `}</style>
    </div>,
    document.querySelector('.reactRoot')
);
