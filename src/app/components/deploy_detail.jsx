import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import {
    Checkbox,
    Dialog,
    FontIcon,
    FlatButton,
    Styles,
    TextField,
    RaisedButton,
} from 'material-ui'

const { Colors } = Styles


class DeployDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: parseInt(this.props.params.id),
            isMount: false,
            serverStatus: "",
            deployDetail: "",
        }
        this._getDeployDetail = this._getDeployDetail.bind(this)
        this._getServerStatus = this._getServerStatus.bind(this)
    }

    render() {
        if (!this.state.isMount) {
            $.get(
                "/api/deploy/" + this.state.id,
                this._getDeployDetail
            )
            $.get(
                "/api/host/status",
                this._getServerStatus
            )
 
        }

        return (
            <div>
                {this._getDetailHeader()}
                {this._getDetailBody()}
            </div>
        )
    }

    _getDeployDetail(data) {
        this.setState({deployDetail: data, isMount: true})
    }

    _getServerStatus(data) {
        this.setState({serverStatus: data, isMount: true})
    }

    _getDetailHeader() {
        return (
            <h2>{this.state.deployDetail["Taskname"]}</h2>
        )
    }

    _getDetailBody() {

        let status2str = {
            0: "Pending",
            1: "Success",
            2: "Failed",
        }
        let hosts = []

        if (this.state.isMount) {
            for (let i = 0; i < this.state.deployDetail["Hosts"].length; ++ i) {
                let host_id = this.state.deployDetail["Hosts"][i]
                let val = this.state.serverStatus[host_id]
                let host = val["Hostname"] + "(" + val["IP"] + ")"
                hosts.push(
                    <div>
                    <span key={i}>{host}</span>
                    </div>
                )
            }
        }
        
        return (
            <div>
                <p>{"Status: " + status2str[this.state.deployDetail["Status"]]}</p>
                <p>{"Created: " + this.state.deployDetail["Created"]}</p>
                <p>{"Repo URI: " + this.state.deployDetail["Repo URI"]}</p>
                <p>{"Entry Point: " + this.state.deployDetail["Entry Point"]}</p>
                <p>{"Hosts: "}</p>
                {hosts}
                <p>{"Msg: "}</p>
                {this.state.deployDetail["Msg"]}
            </div>
        )
    }
}

export default DeployDetail
