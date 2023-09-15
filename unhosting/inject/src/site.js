const infoParent = document.querySelector('.col-sm-9')

const siteTitle = infoParent.childNodes[0].textContent.split('Review: ')[1].trim();
const editBtn = infoParent.childNodes[2].querySelector('a')
const pluginsBtn = infoParent.childNodes[2].querySelector('a')

const siteStatus = infoParent.textContent.split('deployment status: ')[1].split("\n")[0].trim()
const siteVersion = infoParent.textContent.split('checkout:: ')[1].split(" ")[0].trim()
const emailStatus = infoParent.textContent.split('Email state: ')[1].split("Site admin")[0].trim()
const productionStatus = infoParent.textContent.split('Production site: ')[1].split(" ")[0].trim()

const domainStatusDropdown = infoParent.querySelector('.collapsed[href="#accordionDomainRecord"]')
const accordionDomainRecord = infoParent.querySelector('#accordionDomainRecord')
const sslSatusDropdown = infoParent.querySelector('.collapsed[href="#accordionSslValidation"]')
const accordionSslValidation = infoParent.querySelector('#accordionSslValidation')
const ELBImportStatusDropdown = infoParent.querySelector('.collapsed[href="#accordionElbImport"]')
const accordionElbImport = infoParent.querySelector('#accordionElbImport')

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

ReactDOM.render(
    <div class="reactInfo">
        <div class="titleBar">
            <h1>{siteTitle}</h1>
            {editBtn ?
                <div dangerouslySetInnerHTML={{__html: editBtn.outerHTML}} />
            : ""}
        </div>
        <h3><a target="_blank" href={`${url}/login/index.php?nosso=true&username=mus&saml=no`}>{url}</a></h3>
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
        {domainStatusDropdown ? <div className="section">
            <div class='sectionHead'>
                <span class="sectionTitle">Domain Info</span>
            </div>
            <div dangerouslySetInnerHTML={{__html: domainStatusDropdown.outerHTML}} />
            <div dangerouslySetInnerHTML={{__html: accordionDomainRecord.outerHTML}} />
            <div dangerouslySetInnerHTML={{__html: sslSatusDropdown.outerHTML}} />
            <div dangerouslySetInnerHTML={{__html: accordionSslValidation.outerHTML}} />
            <div dangerouslySetInnerHTML={{__html: ELBImportStatusDropdown.outerHTML}} />
            <div dangerouslySetInnerHTML={{__html: accordionElbImport.outerHTML}} />
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
            .adminInfo {
                display: flex;
                justify-content: space-between;
                gap: 1rem;
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