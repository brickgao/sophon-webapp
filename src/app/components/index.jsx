import React from 'react'
import { render } from 'react-dom'


class Index extends React.Component {


    render() {
        let directory_tree = "├── deploy\n│   └── sample.conf\n├── README.md\n├── requirements.txt\n└── sample\n    ├── ...\n    ├── ...\n"

        return (
            <div>
                <h1>Welcome to Sophon</h1>
                <p>A simple IT automation web service based on Ansible</p>
                <h3>Support system</h3>
                <p>Debian / Ubuntu</p>
                <h3>Server</h3>
                <p>
                    You could get the brief view of servers from this tabs,
                    which includes disk usage, memory usage, cpu loads and etc.
                </p>
                <p>For OPs, you could add server from this tab.</p>
                <h3>SSH Permission</h3>
                <p>You could get the SSH permission here.</p>
                <h3>Deploy</h3>
                <p>You could use this tab to deploy projects and get the result of deployment.</p>
                <p>Language support: Python</p>
                <p>The structures of project should look like this:</p>
                <pre>
{directory_tree}
                </pre>
                <p>The config which named "deploy/{"{"}entry_point{"}"}.conf" is the config of supervisor.</p>
                <p>"requirements.txt" should include the dependencies of the project.</p>
                <p>You could get the example from <a href="https://github.com/TheSophon/sophon-deploy-sample">TheSophon/sophon-deploy-sample</a>.</p>
                <h3>Docker</h3>
                <p>
                    You could get the result of "docker ps" from this tabs,
                    which includes uptime, ports and etc.
                </p>
            </div>
        )
    }

}

export default Index
