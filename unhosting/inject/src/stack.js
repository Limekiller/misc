const infoParent = document.querySelector('.col-sm-9')

const stackStatus = infoParent.querySelector('p a[href*="cloud_stacks/deploy"]').textContent
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

const stackTitle = infoParent.querySelector('h3').textContent.split('Stack:')[1].trim();
const accountId = document.querySelector('em').innerText
const connectionLink = document.querySelector('a[href="/cp/cloud_connections/"]')
const ip = infoParent.textContent.split('IP: ')[1].split(' ')[0]
const size = infoParent.textContent.split('Size: ')[1].split(' ')[0]
const state = infoParent.textContent.split('State: ')[1].split(' ')[0]

let is_v2 = true
if (ip) {
    is_v2 = false
}

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
let storage = {}
if (storageHeader) {
    const storageElem = storageHeader.nextElementSibling
    const storageLines = storageElem.innerText.split('\n')
    for (let line of storageLines) {
        let obj = {}
        if (line.includes('/')) {
            obj['used'] = line.split('/')[0].trim().split(' ')[1]
            obj['total'] = line.split('/')[1].trim().split(' ')[0]
        } else {
            obj['total'] = line.split(' ')[1]
        }
        storage[line.split(":")[0]] = obj
    }
}

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

class storageGraph extends React.Component {
    constructor(props) {
        super(props)
    }

    getPercentUsed = () => {
        let percent = 100
        if (this.props.used) {
            percent = (parseFloat(this.props.used) / parseFloat(this.props.total)) * 100
        }
        return parseInt(percent)
    }


    render() {
        const percent = this.getPercentUsed()
        const color = percent > 80 && this.props.used ? 'red' : '#42a2dc'

        return <div class="storageGraph">
            <span class='title'>{this.props.title}</span>
            <div class='graph' style={{background: `conic-gradient(${color} ${percent}%, transparent ${percent}%)`}}>
                <div class='mask' />
                <span class='used'>{this.props.used}</span>
                {this.props.used ?
                    <span class='total'>/ {this.props.total}</span>
                    : <span class='total' style={{fontSize: '1.25rem', fontWeight: 'bold'}}>{this.props.total}</span>
                }
            </div>
            <style jsx>{`
                .storageGraph {
                    text-align: center;
                }
                .title {
                    font-weight: bold;
                }
                .graph {
                    background-color: #d6d6d6 !important;
                    margin-top: 0.5rem;
                    width: 6rem;
                    height: 6rem;
                    border-radius: 99rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    line-height: 1rem;
                }
                .used {
                    font-size: 1.25rem;
                    font-weight: bold;
                }
                .total {
                    font-size: 0.75rem;
                }
                .graph span {
                    z-index: 1;
                }
                .mask {
                    width: 5rem;
                    height: 5rem;
                    background: #eee;
                    position: absolute;
                    border-radius: 99rem;
                }
            `}</style>
        </div>
    }
}

ReactDOM.render(
    <div class="reactInfo">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1>{stackTitle}</h1>
            <span>#{accountId}</span>
        </div>
        <h3>{ip}</h3>
        <div class="infoCards">
            <span class="status">
                {statusIconSpan}
                {statusText}
            </span>
            {!is_v2 ? 
                <span class="state">
                    {state == 'running' ? 
                        <span class="material-icons" style={{color: "green"}}>check_circle</span> : 
                        <span class="material-icons" style={{color: "red"}}>error</span>
                    }
                    {state == 'running' ? "Running" : "Stopped"}
                </span>
            : ""}
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
        {Object.keys(storage).length > 0  ? 
            <div class="section">
                <div class='sectionHead'>
                    <span class="sectionTitle">Storage</span>
                </div>
                <div class='content graphs'>
                    {Object.keys(storage).map(key => {
                        return React.createElement(storageGraph, {
                            title: key,
                            used: storage[key]['used'],
                            total: storage[key]['total']
                        })
                    })}
                </div>
            </div>
        : "" }
        <div 
            class="stackButtons" 
            dangerouslySetInnerHTML={{__html: stackButtonString}}
        />
        <br />
        <h3>Advanced</h3>
        <div dangerouslySetInnerHTML={{__html: ec2Form ? ec2Form.outerHTML : ""}} />
        <div dangerouslySetInnerHTML={{__html: rdsForm ? rdsForm.outerHTML : ""}} />
        <div dangerouslySetInnerHTML={{__html: cronForm ? cronForm.outerHTML : ""}} />
        {is_v2 ? <style jsx>{`
            .mainLists div {
                display: grid;
                grid-template-columns: auto auto;
            }
        `}</style>: ""}
        <style jsx>{`
            .mainLists {
                display: flex;
                gap: 1rem;
            }
            .mainLists > div {
                width: 100%;
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
            .graphs {
                display: flex;
                gap: 1rem;
                justify-content: space-around;
            }
        `}</style>
    </div>,
    document.querySelector('.reactRoot')
);
