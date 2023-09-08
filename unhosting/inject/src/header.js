"use strict"

let links = []
let reports = []
document.querySelectorAll('nav .dropdown-item').forEach(item => {
    if (item.innerText.includes('Report')) {
        reports.push({
            link: item.href,
            text: item.innerText.trim()
        })
    } else {
        links.push({
            link: item.href,
            text: item.innerText.trim()
        })
    }
})

document.querySelector('nav .dropdown-menu').style.display = 'none'
document.querySelector('nav').insertAdjacentHTML( 'beforeend', "<div class='reactHeader'></div>" );

class navbar extends React.Component {
    icons = {
        'users': 'people',
        'releases': 'new_releases',
        'config settings': 'build',
        'create a new user': 'person_add',
        'your settings': 'settings',
        'modify permissions': 'badge',
        'support portal': 'support',
        'logout': 'logout',
        'back to my account': 'arrow_back'
    }
    
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }

    render() {
        return <nav class="reactNav">
            {this.props.links.map(link => {
                const icon = this.icons[link.text.toLowerCase()]
                return <a href={link.link}>
                    <span class="material-icons">{icon}</span>
                    {link.text}
                </a>
            })}
            {reports.length > 0 ? <div class={`reports ${this.state.expanded ? 'expanded' : ''}`}>
                <button onClick={() => this.setState({expanded: !this.state.expanded})}>
                    Reports
                    <span class="arrow">▼</span>
                </button>
                {reports.map(report => {
                    return <a href={report.link}>
                        {report.text}
                    </a>
                })}
            </div>
            : ""}
            <style jsx>{`
                .reactNav {
                    display: flex;
                    position: fixed;
                    top: 1rem;
                    right: 17rem;
                    gap: 0.5rem;
                    flex-direction: column;
                }
                .reactNav a {
                    padding: 1rem;
                    border-radius: 1rem;
                    background: #eee;
                    color: black;
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
                .reactNav a:hover {
                    text-decoration: none;
                    filter: brightness(0.9);
                }
                .reports {
                    padding: 1rem;
                    background: white;
                    border: 2px solid #eee;
                    border-radius: 0.5rem;
                    line-height: 1.75rem;
                    margin-top: 0.75rem;
                }
                .reports a {
                    padding: 0;
                    background: 0;
                    color: #42a2dc;
                    display: none;
                }
                .reports a:hover {
                    text-decoration: underline;
                }
                .reports.expanded a {
                    display: flex;
                }
                .reports button {
                    background: none;
                    border: none;
                    padding: 0;
                    font-weight: bold;
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                }
                .reports.expanded .arrow {
                    transform: rotate(180deg);
                }

                @media screen and (max-width: 1650px) {
                    .reactNav {
                        right: 1rem;
                    }
                }
            `}</style>
        </nav>
    }
}

const headerRoot = ReactDOM.createRoot(document.querySelector('.reactHeader'))
headerRoot.render(React.createElement(navbar, {links: links}))