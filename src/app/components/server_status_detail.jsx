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
    render() {
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
            <h2>Orion - 192.168.1.12</h2>
        )
    }

    _getHostStatus() {
        let styles = {
            marginTop: "30px",
        }
        return (
            <div>
                <div style={styles}>
                    <span>Cpu Loads: 0.3</span>
                    <LinearProgress mode="determinate" value={30} />
                </div>
                <div style={styles}>
                    <span>Memory Usage: 2000 / 4000 MB</span>
                    <LinearProgress mode="determinate" value={50} />
                </div>
                <div style={styles}>
                    <span>Disk Usage: 35 / 40 GB</span>
                    <LinearProgress mode="determinate" color={Colors.red500} value={87} />
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
