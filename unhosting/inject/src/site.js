const infoParent = document.querySelector('.col-sm-9')

const siteTitle = infoParent.childNodes[0].textContent.split('Review: ')[1].trim();
const editBtn = infoParent.childNodes[2].querySelector('a')
const pluginsBtn = infoParent.childNodes[2].querySelector('a')
const stackStatus = infoParent.childNodes[9].querySelector('strong').textContent

const siteStatus = infoParent.textContent.split('deployment status: ')[1].split(' ')[0].trim()
const siteVersion = infoParent.textContent.split('checkout:: ')[1].split(' ')[0]

const adminBtn = infoParent.childNodes[4]
const passwordSection = infoParent.childNodes[5]
const adminUsername = infoParent.childNodes[19].innerHTML.split('admin username:</span> ')[1].split('<')[0]
const adminPass = infoParent.childNodes[19].innerHTML.split('data-password="')[1].split('"')[0]
const adminEmail = infoParent.childNodes[19].innerHTML.split('admin email:</span> ')[1].split('<')[0]

const domainStatus = infoParent.childNodes[11]
const SSLStatus = infoParent.childNodes[13]
const ELBStatus = infoParent.childNodes[15]

const mainInfo = infoParent.childNodes[19]
const plugins = infoParent.childNodes[20].querySelector('ul')

const advSettings = infoParent.childNodes[22]
const jobOutput = infoParent.childNodes[28]

infoParent.insertAdjacentHTML( 'afterbegin', "<div class='reactRoot'></div>" );

ReactDOM.render(
    <div class="reactInfo">
        <div class="titleBar">
            <h1>{siteTitle}</h1>
            <div dangerouslySetInnerHTML={{__html: editBtn.outerHTML}} />
        </div>
        <div class="infoCards">
            <span class="status">
                {siteStatus}
            </span>
            <span class="version">
                {siteVersion}
            </span>
        </div>
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
            <ul dangerouslySetInnerHTML={{__html: mainInfo.innerHTML}} />
        </div>
        <div className="section plugins">
            <div class='sectionHead'>
                <span class="sectionTitle">Plugins</span>
                <div class='actions'>
                    <div class='sectionAction' dangerouslySetInnerHTML={{__html: editBtn.outerHTML}}/>
                </div>
            </div>
            <ul dangerouslySetInnerHTML={{__html: plugins.innerHTML}} />
        </div><br />
        <h3>Advanced</h3>
        <div dangerouslySetInnerHTML={{__html: advSettings.outerHTML}} />
        <div dangerouslySetInnerHTML={{__html: jobOutput.outerHTML}} />
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
        `}</style>
    </div>,
    document.querySelector('.reactRoot')
);

const adminBtnContainer = document.querySelector('.adminBtnContainer')
adminBtnContainer.appendChild(adminBtn)
