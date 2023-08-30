"use strict"

const infoParent = document.querySelector('.col-md-9')
infoParent.insertAdjacentHTML( 'afterbegin', "<div class='reactRoot'></div>" );

const helpText = document.querySelector('#searchhelp').innerHTML

class searchContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: "",
            helpActive: false,
            results: []
        }
    }

    fetchResults = () => {
        const tokens = getTokens()
        fetch('/spark/kiosk/users/search', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "X-CSRF-TOKEN": tokens.csrf,
                "X-XSRF-TOKEN": tokens.xsrf,
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify({
                query: this.state.query
            })
        }).then(response => response.json())
        .then(data => {
            this.setState({results: data})
        })
    }

    render() {
        return <div class="searchContainer">
                <label for='user'>Search users</label>
                <div class='flexContainer'>
                    <input 
                        type='text' 
                        id='user' 
                        name='user' 
                        class='search'
                        onKeyUp={(e) => {this.setState({query: e.target.value}); window.setTimeout(this.fetchResults, 250)}}
                    />
                    <button class='searchBtn btn btn-primary' onClick={this.fetchResults}>Search</button>
                    <a href="#" onClick={() => this.setState({helpActive: !this.state.helpActive})} class='help'>
                        <span class="material-icons" style={{color: "rgb(94, 94, 94)"}}>help</span>
                    </a>
                    <div 
                        class={`helpText ${this.state.helpActive ? 'active' : ''}`} 
                        dangerouslySetInnerHTML={{__html: helpText}} 
                    />
                </div>
                <div class="resultContainer">
                    {this.state.results.map(result => {
                        return <div class="result">
                            <span class="name">{result.firstname} {result.lastname}</span>
                            <span class="email">{result.email}</span>
                            <a href={`/spark/kiosk/users/impersonate/${result.id}`}><button class='btn btn-primary'>Access</button></a>
                        </div>
                    })}
                </div>
            <style jsx>{`
                .flexContainer {
                    display: flex;
                    align-items: center;
                    position: relative;
                }
                .resultContainer {
                    display: grid;
                    grid-template-columns: auto auto auto;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .result {
                    padding: 1rem;
                    background: #eee;
                    border-radius: 0.5rem;
                    display: flex;
                    flex-direction: column;
                }
                .result button {
                    width: 100%;
                    margin-top: 1rem;
                }
                .name {
                    font-weight: bold;
                }
                .help {
                    margin-left: 1rem;
                }
                .search {
                    border-radius: 0.25rem 0 0 0.25rem;
                }
                .searchBtn {
                    border-radius: 0 0.25rem 0.25rem 0;
                    height: 40px;
                }
                #users {
                    display: none;
                }
                .helpText {
                    position: absolute;
                    width: 290px;
                    top: 2rem;
                    right: -16px;
                    background: #eee;
                    transform: scale(0.9);
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    opacity: 0;
                    pointer-events: none;
                    border: 1px solid gainsboro;
                }
                .helpText li {
                    padding: 0;
                    background: none;
                    list-style: default;
                }
                .helpText:before {
                    content: '';
                    width: 20px;
                    height: 20px;
                    background: #eee;
                    position: absolute;
                    display: block;
                    top: -10px;
                    transform: rotate(-45deg);
                    right: 4px;
                    border: 1px solid gainsboro;
                    border-bottom: 0;
                    border-left: 0;
                }
                .helpText.active {
                    opacity: 1;
                }
                .tab-content {
                    display: none;
                }
            `}</style>
        </div>
    }
}

const root = ReactDOM.createRoot(document.querySelector('.reactRoot'))
root.render(React.createElement(searchContainer))