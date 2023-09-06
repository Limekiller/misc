"use strict"

document.querySelector('table').style.display = 'none'
document.querySelector('.col-sm-9').insertAdjacentHTML( 'beforeend', "<div class='reactRoot'></div>" );

class sitesContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: "",
            sites: props.sites ? props.sites : {}
        }
    }

    getLastPage = () => {
        let page = 1
        const pageLinks = document.querySelectorAll('.page-item a')
        for (let item of pageLinks) {
            const pageNum = item.href.split('page=')[1]
            if (parseInt(pageNum) > page) {
                page = pageNum
            }
        }
        return page
    }

    componentDidMount() {
        const page = this.getLastPage()
        for (let i = 1; i <= page; i++) {
            fetch(`/home?page=${i}`)
            .then(response => response.text())
            .then(data => {
                const sites = this.state.sites
                const dom = new DOMParser().parseFromString(data, 'text/html')
                dom.querySelectorAll('tbody tr').forEach(row => {
                    const id = row.children[5].children[0].href.split('/').slice(-1)[0]
                    sites[id] = {
                        "name": row.children[0].innerText.trim(),
                        "domain": row.children[1].innerText.trim(),
                        "status": row.children[2].innerText.trim(),
                        "app": row.children[3].innerText.trim(),
                        "stack": row.children[4].innerText.trim(),
                    }
                })   
                this.setState({sites: sites}) 
            })
        }
    }

    render() {
        return <div class="sitesContainer">
            <label for="filterSites">Filter sites</label>
            <input onKeyUp={(e) => this.setState({query: e.target.value})} class="filterSites" type='text' name="filterSites" />
            {Object.keys(this.state.sites).map(id => {
                const site = this.state.sites[id]
                if (!this.state.query || site.name.includes(this.state.query) || site.domain.includes(this.state.query)) {
                    return <div class='site' key={id}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <a href={`/cp/sites/${id}`}><h3 class='name'>{site.name}</h3></a>
                            <a target="_blank" href={`http://${site.domain}`}><span class='link'>{site.domain}</span></a>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem'}}>
                            <div class="info">
                                <span class="status">
                                    {site.status === "complete" ?
                                    <span class="material-icons" style={{color: 'green'}}>check_circle</span>
                                    :  <span class="material-icons" style={{color: 'red'}}>error</span>
                                    }
                                    {site.status}
                                </span>
                                <span class="app">{site.app}</span>
                                <span class="stack">{site.stack}</span>
                            </div>
                            <div class="options">
                                <a href={`/cp/sites/edit/${id}`}><span class="material-icons">settings</span></a>
                                <a href={`/cp/sites/restore/${id}`}><span class="material-icons">restore</span></a>
                                <a href={`/cp/sites/delete/${id}`}><span class="material-icons">delete_forever</span></a>
                            </div>
                        </div>
                    </div>
                }
            })}
            <style jsx>{`
                .sitesContainer {
                    margin-top: 1rem;
                }
                .site {
                    background: #eee;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin: 1rem 0;
                    height: 7.5rem;
                }
                .info {
                    display: flex;
                }
                .info span:not(.material-icons) {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                .info span:not(:last-child):not(.material-icons):after {
                    content: "•";
                    margin: 0 0.5rem;
                }
                .link {
                    display: flex;
                    gap: 0.25rem;
                    color: #42a2dc;
                }
                .link * {
                    color: #42a2dc;
                }
                .name {
                    color: #42a2dc;
                    text-decoration: none;
                }
                .options {
                    display: flex;
                    gap: 0.5rem;
                }
                .options span {
                    font-size: 2rem;
                }
                .options a:hover span {
                    color: #42a2dc;
                }
            `}</style>
        </div>
    }
}

const root = ReactDOM.createRoot(document.querySelector('.reactRoot'))
root.render(React.createElement(sitesContainer))