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
            isMount1: false,
            isMount2: false,
        }
        this._getAllServerStatus = this._getAllServerStatus.bind(this)
        this._getDetailServerStatus = this._getDetailServerStatus.bind(this)
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

    _getDetailServerStatus(detailServerStatus) {
        this.setState({
            detailServerStatus: detailServerStatus,
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
        return (
            <TableBody
             displayRowCheckbox={false}>
                <TableRow>
                    <TableRowColumn>11</TableRowColumn>
                    <TableRowColumn>root</TableRowColumn>
                    <TableRowColumn>1</TableRowColumn>
                    <TableRowColumn>1</TableRowColumn>
                    <TableRowColumn>11:11:11</TableRowColumn>
                    <TableRowColumn>/bin/placeholder</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>12</TableRowColumn>
                    <TableRowColumn>notroot</TableRowColumn>
                    <TableRowColumn>2</TableRowColumn>
                    <TableRowColumn>3</TableRowColumn>
                    <TableRowColumn>1:21:21</TableRowColumn>
                    <TableRowColumn>/bin/placeholder2</TableRowColumn>
                </TableRow>
                 <TableRow>
                    <TableRowColumn>100</TableRowColumn>
                    <TableRowColumn>root</TableRowColumn>
                    <TableRowColumn>2</TableRowColumn>
                    <TableRowColumn>3</TableRowColumn>
                    <TableRowColumn>0:11:11</TableRowColumn>
                    <TableRowColumn>/bin/placeholder3</TableRowColumn>
                </TableRow>
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
