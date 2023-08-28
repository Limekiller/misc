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
const ip = infoParent.childNodes[16].innerHTML.split('IP:</strong> ')[1].split('<br>')[0]
const size = infoParent.childNodes[16].innerHTML.split('Size:</strong> ')[1].split('<br>')[0]
const state = infoParent.childNodes[16].innerHTML.split('State:</strong> ')[1].split('<br>')[0]

const domains = infoParent.childNodes[8]
const keys = infoParent.childNodes[12]
const deleteKeyBtn = infoParent.childNodes[14]
const addKeyBtn = infoParent.childNodes[30]

const stackInfo = infoParent.childNodes[16]
let stackInfoList = []
for (let i = 0; i < stackInfo.childNodes.length; i += 4){
    stackInfoList.push(
        <div class="stackInfoItem">
            <strong>{stackInfo.childNodes[i].innerHTML}</strong>
            {stackInfo.childNodes[i+1].textContent.trim()}
        </div>
    )
}

const storage = infoParent.childNodes[20]

let stackButtons = []
for (let i = 32; i < 40; i += 2) {
    stackButtons.push(<div class="stackButton" dangerouslySetInnerHTML={{__html: infoParent.childNodes[i].outerHTML}}/>)
}

const ec2Form = infoParent.childNodes[40]
const rdsForm = infoParent.childNodes[44]
const cronForm = infoParent.childNodes[46]

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
            <div class="domains section">
                <div class='sectionHead'>
                    <span class="sectionTitle">Domains</span>
                </div>                
                <div class='content' dangerouslySetInnerHTML={{__html: domains.innerHTML}}/>
            </div>
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
        </div>
        <div class="section mainInfo">
            <div class='sectionHead'>
                <span class="sectionTitle">Info</span>
            </div>
            {stackInfoList}
        </div>
        <div class="section">
            <div class='sectionHead'>
                <span class="sectionTitle">Storage</span>
            </div>
            <div class='content' dangerouslySetInnerHTML={{__html: storage.innerHTML}}/>
        </div>
        <div class="stackButtons">
            {stackButtons.map(stackButton => {
                return stackButton
            })}
        </div>
        <br />
        <h3>Advanced</h3>
        <div dangerouslySetInnerHTML={{__html: ec2Form.outerHTML}} />
        <div dangerouslySetInnerHTML={{__html: rdsForm.outerHTML}} />
        <div dangerouslySetInnerHTML={{__html: cronForm.outerHTML}} />
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
            .stackButton {
                width: 100%;
            }
            .stackButton .btn {
                width: 100%;
                height: 100%;
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
