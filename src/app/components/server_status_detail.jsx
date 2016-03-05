import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import {
    LinearProgress,
    Styles,
    Table,
    TableBody,
    TableFooter,
    TableHeader, 
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui'

const { Colors } = Styles


class ServerStatusDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: parseInt(this.props.params.id),
            hostname: "",
            ip: "",
            cpuLoad: 0.0,
            memoryUsage: [0, 0],
            diskUsage: [0, 0],
            detailServerStatus: "",
            severProcessStatus: "",
            isMount1: false,
            isMount2: false,
        }
        this._getAllServerStatus = this._getAllServerStatus.bind(this)
        this._getServerProcessStatus = this._getServerProcessStatus.bind(this)
    }

    _getAllServerStatus(allServerStatus) {
        this.setState({
            hostname: allServerStatus[this.state.id]["Hostname"],
            ip: allServerStatus[this.state.id]["IP"],
            cpuLoad: allServerStatus[this.state.id]["CPU Load"],
            memoryUsage: allServerStatus[this.state.id]["Memory Usage"],
            diskUsage: allServerStatus[this.state.id]["Disk Usage"],
            isMount1: true,
        })
    }

    _getServerProcessStatus(severProcessStatus) {
        this.setState({
            severProcessStatus: severProcessStatus,
            isMount2: true,
        })
    }

    render() {
        if (!this.state.isMount1) {
            $.get(
                "/api/host/status",
                this._getAllServerStatus
            )
        }
        if (!this.state.isMount2) {
            $.get(
                "/api/host/" + this.props.params.id + "/process_status",
                this._getServerProcessStatus
            )
        }

        return (
            <div>
                {this._getHeader()}
                {this._getHostStatus()}
                {this._getProcessStatus()}
            </div>
        )
    }

    _getHeader() {
        return (
            <h2>{this.state.hostname} - {this.state.ip}</h2>
        )
    }

    _getHostStatus() {
        let styles = {
            marginTop: "30px",
        }
        let cpuLoadProcessColor = Colors.lightBlue400
        let memoryUsageProcessColor = Colors.lightBlue400
        let diskUsageProcessColor = Colors.lightBlue400
        let memoryUsageProcess = this.state.memoryUsage[0] / this.state.memoryUsage[1]
        let diskUsageProcess = this.state.diskUsage[0] / this.state.diskUsage[1]

        if (this.state.cpuLoad > 0.8) {
            cpuLoadProcessColor = Colors.red500
        }
        if (memoryUsageProcess > 0.8) {
            memoryUsageProcessColor = Colors.red500
        }
        if (diskUsageProcess > 0.8) {
            diskUsageProcessColor = Colors.red500
        }
        
        return (
            <div>
                <div style={styles}>
                    <span>Cpu Loads: {this.state.cpuLoad}</span>
                    <LinearProgress mode="determinate" color={cpuLoadProcessColor}
                                    value={this.state.cpuLoad * 100} />
                </div>
                <div style={styles}>
                    <span>Memory Usage: {this.state.memoryUsage[0]} / {this.state.memoryUsage[1]} MB</span>
                    <LinearProgress mode="determinate" color={memoryUsageProcessColor}
                                    value={memoryUsageProcess * 100} />
                </div>
                <div style={styles}>
                    <span>Disk Usage: {this.state.diskUsage[0]} / {this.state.diskUsage[1]} GB</span>
                    <LinearProgress mode="determinate" color={diskUsageProcessColor}
                                    value={diskUsageProcess * 100} />
                </div>
            </div>
        )
    }

    _getProcessStatus() {
        let styles = {
            marginTop: '30px',
        }
        return (
            <div style={styles}>
                <span>Process Status:</span>
                <Table
                 selectable={false}
                 height='60%'>
                    {this._getProcessStatusHeader()}
                    {this._getProcessStatusBody()}
                    {this._getProcessStatusFooter()}
                </Table>
            </div>
        )
    }

    _getProcessStatusHeader() {
        return (
            <TableHeader
             adjustForCheckbox={false}
             displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>PID</TableHeaderColumn>
                    <TableHeaderColumn>USER</TableHeaderColumn>
                    <TableHeaderColumn>MEM%</TableHeaderColumn>
                    <TableHeaderColumn>CPU%</TableHeaderColumn>
                    <TableHeaderColumn>TIME</TableHeaderColumn>
                    <TableHeaderColumn>COMMAND</TableHeaderColumn>
                </TableRow>
            </TableHeader>
        )
    }

    _getProcessStatusBody() {

        let processStatusBody = []

        if (this.state.isMount2) {
            for (let singleProcessStatus of JSON.parse(this.state.severProcessStatus)) {
                processStatusBody.push(
                    <TableRow key={singleProcessStatus["PID"]}>
                        <TableRowColumn>{singleProcessStatus["PID"]}</TableRowColumn>
                        <TableRowColumn>{singleProcessStatus["User"]}</TableRowColumn>
                        <TableRowColumn>{singleProcessStatus["Memory Usage"]}</TableRowColumn>
                        <TableRowColumn>{singleProcessStatus["CPU Usage"]}</TableRowColumn>
                        <TableRowColumn>{singleProcessStatus["Time"]}</TableRowColumn>
                        <TableRowColumn>{singleProcessStatus["Command"]}</TableRowColumn>
                    </TableRow>
                )
            }
        }
        
        return (
            <TableBody
             displayRowCheckbox={false}>
                {processStatusBody}
            </TableBody>
        )
    }

    _getProcessStatusFooter() {
        return (
            <TableFooter></TableFooter>
        )
    }
}

export default ServerStatusDetail
