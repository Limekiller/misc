const infoParent = document.querySelector('.col-sm-9')

const siteTitle = infoParent.textContent.split('Review: ')[1].split(' ')[0].trim()
const editBtn = infoParent.childNodes[2].querySelector('a')
const pluginsBtn = infoParent.childNodes[2].querySelector('a')

const siteStatus = infoParent.textContent.split('deployment status: ')[1].split("\n")[0].trim()
const siteVersion = infoParent.textContent.split('checkout:: ')[1].split(" ")[0].trim()
const emailStatus = infoParent.textContent.split('Email state: ')[1].split("Site admin")[0].trim()
const productionStatus = infoParent.textContent.split('Production site: ')[1].split(" ")[0].trim()
const stack = infoParent.textContent.split('Cloud stack: ')[1].split(' ')[0].trim()
const slot = infoParent.textContent.split('Slot: ')[1].split(' ')[0].trim()

const domainStatusDropdown = infoParent.querySelector('.collapsed[href="#accordionDomainRecord"]')
const domainStatus = infoParent.textContent.split('Domain record status: ')[1].split('\n')[0] == 'Pass' ? 'check_circle' : 'error'

const domainTarget = infoParent.querySelector('#accordionDomainRecord') ? 
    infoParent.querySelector('#accordionDomainRecord').querySelector('strong').innerText : null
const accordionDomainRecord = infoParent.querySelector('#accordionDomainRecord')
const domainForm = infoParent.querySelector('#site_domain_record_run')

const sslStatus = infoParent.textContent.split('SSL certificate status: ')[1].split('\n')[0] == 'Pass' ? 'check_circle' : 'error'
const accordionSslValidation = infoParent.querySelector('#accordionSslValidation')
const breakword = accordionSslValidation ? accordionSslValidation.querySelectorAll('.breakword') : null
const sslName = accordionSslValidation && breakword.length ? accordionSslValidation.querySelectorAll('.breakword')[0].innerText : null
const sslValue = accordionSslValidation && breakword.length ? accordionSslValidation.querySelectorAll('.breakword')[1].innerText : null

let sslStatusDropdown = infoParent.querySelector('#accordionSslValidation div')
if (sslStatusDropdown) {
    sslStatusDropdown.removeChild(sslStatusDropdown.children[0])
    sslStatusDropdown.removeChild(sslStatusDropdown.children[0])
}


const ELBImportStatusDropdown = infoParent.querySelector('.collapsed[href="#accordionElbImport"]')
const elbStatus = infoParent.textContent.split('ELB import status: ')[1].split(' ')[0] == 'Pass' ? 'check_circle' : 'error'
const accordionElbImport = infoParent.querySelector('#accordionElbImport')
const elbForm = infoParent.querySelector('#site_elb_import_run')

const mainInfo = document.querySelector('.col-sm-9 > ul') 
const url = mainInfo.textContent.split('URL: ')[1].split(' ')[0]

const adminBtn = infoParent.querySelector('.sites-custom-create-admin')
const passwordSection = infoParent.childNodes[5]
const adminUsername = mainInfo.innerHTML.split('admin username:</span> ')[1].split('<')[0]
const adminPass = mainInfo.innerHTML.split('data-password="')[1].split('"')[0]
const adminEmail = mainInfo.innerHTML.split('admin email:</span> ')[1].split('<')[0]

const plugins = infoParent.querySelector('.plugins ul')

const advSettings = infoParent.querySelector('#accordionAdvancedSettings')
const jobOutput = infoParent.querySelector('#accordionJobOutput')

infoParent.insertAdjacentHTML( 'afterbegin', "<div class='reactRoot'></div>" );

class dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {open: true, openHeight: 0}
    }

    componentDidMount = () => {
        const openHeight = document.querySelector(`#dropdown-${this.props.id}`).clientHeight
        this.setState({openHeight: openHeight, open: false})
    }

    render() {
        return <div id={`dropdown-${this.props.id}`} class={`reactDropdown ${this.state.open ? 'open' : ""}`}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: "row-reverse"}}>
                <span class="material-icons toggle" onClick={() => this.setState({open: !this.state.open})}>chevron_right</span>
                <div class='title' style={{display: 'flex', alignItems: 'center'}} dangerouslySetInnerHTML={{__html: this.props.title}}/>
            </div>
            <div class='content'>
                {this.props.children}
            </div>
            <style jsx>{`
                .reactDropdown {
                    margin-bottom: 1rem;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    border: 1px solid #eee;
                    transition: background 0.2s ease, height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
                    overflow: hidden;
                    height: ${this.state.openHeight ? '4rem' : 'auto'};
                }
                .reactDropdown * {
                    word-wrap: anywhere;
                }
                .content {
                    display: none;
                }
                #dropdown-${this.props.id}.open {
                    background: #eee;
                    height: ${this.state.openHeight ? this.state.openHeight + 'px' : 'auto'};
                }
                .open .content {
                    display: unset;
                }
                .open .toggle {
                    transform: rotate(90deg);
                }
                .reactDropdown .toggle {
                    background: #eee;
                    padding: 0.25rem;
                    border-radius: 99rem;
                    margin-right: 0.5rem;
                    transition: transform 0.2s ease;
                }
                .title * {
                    margin: 0;
                }
            `}</style>
        </div>
    }
}

ReactDOM.render(
    <div class="reactInfo">
        <div class="titleBar">
            <h1>{siteTitle}</h1>
            <div style={{display: 'flex', gap: '0.5rem'}}>
                {editBtn ?
                    <div dangerouslySetInnerHTML={{__html: editBtn.outerHTML}} />
                : ""}
                {infoParent.querySelector('a[href*="/local/muse"]') ? 
                    <a 
                        href={`${url}/local/muse`}
                        target="_blank"
                        class="btn btn-primary"
                        style={{
                            color: '#f98113',
                            border: '1px solid #f98113',
                            background: 'white',
                            height: 'fit-content'
                        }}
                    >
                        Instant Login
                    </a>
                : ""}
            </div>
        </div>
        <div class='titleBar'>
            <h3><a target="_blank" href={`${url}/login/index.php?nosso=true&username=mus&saml=no`}>{url}</a></h3>
            <div class='infoChip'>
                <span>{stack}</span>
                <div style={{height: '100%', width: '2px', background: 'white'}}></div>
                <span>{(1e3 + slot + '').slice(-3)}</span>
            </div>
        </div>
        <br />
        <div class="infoCards">
            <span class="status">
                {siteStatus === 'complete' ?
                    <span class="material-icons" style={{color: "green"}}>check_circle</span> : 
                    <span class="material-icons" style={{color: "red"}}>error</span>
                }
                {siteStatus}
            </span>
            <span class="productionStatus">
                {productionStatus === '1' ?
                    <span class="material-icons" style={{color: "green"}}>factory</span> : 
                    <span class="material-icons">science</span>
                }
                {productionStatus === '1' ? "Production" : "Staging"}
            </span>
            <span class="emailStatus">
                {emailStatus === 'Enabled' ?
                    <span class="material-icons" style={{color: "green"}}>check_circle</span> : 
                    <span class="material-icons" style={{color: "red"}}>error</span>
                }
                {emailStatus}
            </span>
            <span class="version">
                {siteVersion}
            </span>
        </div><br />
        {domainStatusDropdown ? <div className="domainInfo">

            {React.createElement(dropdown, {id: 'domain', title: `<h5>
                <span class="material-icons" style="color: ${domainStatus == "check_circle" ? 'green' : 'orange'}">${domainStatus}</span>
                <span class="material-icons">language</span> 
                Domain
            </h5>`}, <div><br />
                <span>In order to point your domain at our servers, please create a DNS record as follows:</span><br /><br />
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Host</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CNAME</td>
                            <td>{url.split('/').slice(-1)[0]}.</td>
                            <td>{domainTarget}.</td>
                        </tr>
                    </tbody>
                </table><br />
                <div dangerouslySetInnerHTML={{__html: domainForm.outerHTML}} />
            </div>)}

            {React.createElement(dropdown, {id: 'ssl', title: `<h5>
                <span class="material-icons" style="color: ${sslStatus == "check_circle" ? 'green' : 'orange'}">${sslStatus}</span>
                <span class="material-icons">lock</span> 
                SSL Certificate
            </h5>`}, <div><br />
                <span>In order to verify your domain with Amazon to generate an SSL certificate, please create a DNS record as follows:</span><br /><br />
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Host</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CNAME</td>
                            <td>{sslName}</td>
                            <td>{sslValue}</td>
                        </tr>
                    </tbody>
                </table>
                <div dangerouslySetInnerHTML={{__html: sslStatusDropdown.innerHTML}} />
            </div>)}

            {React.createElement(dropdown, {id: 'lb', title: `<h5>
                <span class="material-icons" style="color: ${elbStatus == "check_circle" ? 'green' : 'orange'}">${elbStatus}</span>
                <span class="material-icons">dns</span> 
                Load Balancer Import
            </h5>`}, <div>
                <br />
                <span>This check ensures the SSL certificate has been imported into the elastic load balancer.</span><br /><br />
                <div dangerouslySetInnerHTML={{__html: elbForm.outerHTML}} />
            </div>)}
        </div> : "" }
        <div className="adminSection section">
            <div class='sectionHead'>
                <span class="sectionTitle">Admin</span>
                <div class='actions'>
                    <div class='sectionAction adminBtnContainer'/>
                </div>
            </div>
            <div className='adminInfo'>
                <div class='section'>
                    <div class='sectionHead'>
                        <span class="sectionTitle">Username</span>
                    </div>
                    {adminUsername}
                </div>
                <div class='section'>
                    <div class='sectionHead'>
                        <span class="sectionTitle">Password</span>
                    </div>
                    <span class="password">{adminPass}</span>
                </div>
                <div class='section'>
                    <div class='sectionHead'>
                        <span class="sectionTitle">Email</span>
                    </div>
                    {adminEmail}
                </div>
            </div>
            <div class="tempAdminSection" dangerouslySetInnerHTML={{__html: passwordSection.outerHTML}} />
        </div>
        <div className="section">
            <div class='sectionHead'>
                <span class="sectionTitle">Info</span>
            </div>
            <ul dangerouslySetInnerHTML={{__html: mainInfo.innerHTML}} />
        </div>
        {plugins ?
            <div className="section plugins">
                <div class='sectionHead'>
                    <span class="sectionTitle">Plugins</span>
                    <div class='actions'>
                        {editBtn ?
                            <div class="sectionAction" dangerouslySetInnerHTML={{__html: editBtn.outerHTML}} />
                        : ""}                
                    </div>
                </div>
                <ul dangerouslySetInnerHTML={{__html: plugins.innerHTML}} />
            </div>
        : "" }
        <br />
        <h3>Advanced</h3>
        <div dangerouslySetInnerHTML={{__html: advSettings.outerHTML}} />
        {jobOutput ? <div dangerouslySetInnerHTML={{__html: jobOutput.outerHTML}} /> : "" }
        <style jsx>{`
            .titleBar {
                display: flex;
                justify-content: space-between;
            }
            .col-sm-9 > *:not(.reactRoot) {
                display: none;
            }       
            .infoChip {
                padding: 0.5rem 1rem;
                background: #eee;
                border-radius: 99rem;
                display: flex;
                gap: 0.5rem;
            }
            .adminInfo {
                display: flex;
                justify-content: space-between;
                gap: 1rem;
            }
            .domainInfo {
                margin-bottom: 2rem;
            }
            .adminInfo .section {
                width: 100%;
                margin-top: 2rem;
                background: white;
            }
            .adminInfo .sectionTitle {
                font-size: 0.75rem;
            }
            .password {
                -webkit-text-security: disc;
            }
            .password:hover {
                -webkit-text-security: unset;
            }
            .sectionTitle {
                pointer-events: none;
            }
            .sites-custom-create-admin-user-info::before {
                content: 'Temp Admin';
                position: absolute;
                margin-top: -1.5rem;
                font-weight: bold;
            }
            .sites-custom-create-admin-user-info {
                margin-top: 2.5rem;
                display: flex;
                gap: 1rem;
            }
            .fa.fa-user.fa-fw {
                display: none;
            }
            .sites-custom-create-admin-user-info .text-muted,
            .sites-custom-create-admin-user-info .admin-expire {
                display: none;
            }
            .admin-password.form-control {
                height: unset !important;
                background: white;
                border: none;
            }
            .input-group-btn .btn {
                border-radius: 0 0.25rem 0.25rem 0;
                border: none;
                border-left: 1px solid gainsboro;
                transition: filter 0.2s ease;
            }
            .input-group-btn .btn:hover {
                filter: brightness(0.9);
            }
            .sites-custom-create-admin-user-info strong {
                background: white;
                padding: 0.5rem;
                border-radius: 0.5rem;
            }
            .sites-custom-create-admin-user-info span,
            .sites-custom-create-admin-user-info div {
                max-width: unset !important;
            }
            .sites-custom-create-admin-user-info > * {
                width: 100% !important;
            }
            .status:before {
                content: "Status";
                position: absolute;
                top: -1.8rem;
                left: 0;     
                font-weight: bold;       
            }
            .version:before {
                content: "Version";
                position: absolute;
                top: -1.8rem;
                left: 0;      
                font-weight: bold;             
            }
            .emailStatus:before {
                content: "Email";
                position: absolute;
                top: -1.8rem;
                left: 0;           
                font-weight: bold;        
            }
            .productionStatus:before {
                content: "Deployment";
                position: absolute;
                top: -1.8rem;
                left: 0;           
                font-weight: bold;        
            }
            td, th {
                padding: 0.5rem;
                border: 1px solid gainsboro;

            }
        `}</style>
    </div>,
    document.querySelector('.reactRoot')
);

const adminBtnContainer = document.querySelector('.adminBtnContainer')
if (adminBtn) {
    adminBtnContainer.appendChild(adminBtn)
}
document.querySelector('span[data-action="copy-to-clipboard"] button').addEventListener('click', () => {
    navigator.clipboard.writeText(document.querySelector('.admin-password').value)
})