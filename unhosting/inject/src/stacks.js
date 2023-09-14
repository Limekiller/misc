"use strict"

document.querySelector('table').style.display = 'none'
document.querySelector('.col-sm-9').insertAdjacentHTML( 'beforeend', "<div class='reactRoot'></div>" );

let stacks = {}
document.querySelectorAll('tbody tr').forEach(row => {
    const col0 = row.children[0]
    const title = col0.textContent
    const id = col0.querySelector('a') ? col0.querySelector('a').href.split('/').slice(-1)[0] : null
    const cloud = row.children[1].textContent
    const status = row.children[2].textContent
    const ec2 = row.children[3].textContent
    const rds = row.children[4] ? row.children[4].textContent : null
    stacks[id] = {
        title: title,
        cloud: cloud,
        status: status,
        ec2: ec2,
        rds: rds
    }
})

class stacksContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stacks: props.stacks ? props.stacks : {}
        }
    }

    render() {
        return <div class="stacksContainer">
            {Object.keys(this.state.stacks).map(id => {
                const stack = this.state.stacks[id]
                return <div class='stack' key={id}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <a href={`/cp/cloud_stacks/${id}`}><h3>{stack.title}</h3></a>
                        {stack.cloud}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'bottom'}}>
                        <div class='info'>
                            <span class='status'>
                                {stack.status === "deployment complete" ?
                                <span class="material-icons" style={{color: 'green'}}>check_circle</span>
                                :  <span class="material-icons" style={{color: 'red'}}>error</span>
                                }
                                {stack.status}
                            </span>
                            <span class='ec2'>{stack.ec2}</span>
                            <span class='rds'>{stack.ec2}</span>
                        </div>
                        <div class='options'>
                            <a href={`/cp/cloud_stacks/refresh/${id}`}><span class="material-icons">refresh</span></a>
                            <a href={`/cp/cloud_stacks/delete/${id}`}><span class="material-icons">delete_forever</span></a>
                        </div>
                    </div>
                </div>
            })}
            <style jsx>{`
                .stacksContainer {
                    margin-top: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .stack {
                    background: #eee;
                    border-radius: 0.5rem;
                    padding: 1rem;
                }
                .stacksContainer h3 {
                    color: #42a2dc;
                }
                .status {
                    display: flex;
                }
                .status span:first-child {
                    margin-right: 0.25rem;
                }
                .info {
                    display: flex;
                    margin-top: 1rem;
                }
                .info > span:not(:last-child):after {
                    content: "•";
                    margin: 0 0.5rem;
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
root.render(React.createElement(stacksContainer, {stacks: stacks}))