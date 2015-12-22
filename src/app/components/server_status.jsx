import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader, 
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    RaisedButton,
} from 'material-ui'


class ServerStatus extends React.Component {
    render() {
        return(
            <Table
             selectable={false}
             height='80%'>
                {this._getTableHeader()}
                {this._getTableBody()}
                {this._getTableFooter()}
            </Table>
        )
    }

    _getTableHeader() {
        return (
            <TableHeader
             adjustForCheckbox={false}
             displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>#</TableHeaderColumn>
                    <TableHeaderColumn>Hostname</TableHeaderColumn>
                    <TableHeaderColumn>IP Address</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                    <TableHeaderColumn>CPU Loads</TableHeaderColumn>
                    <TableHeaderColumn>Memory Usage</TableHeaderColumn>
                    <TableHeaderColumn>Disk Usage</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
            </TableHeader>
        )
    }

    _getTableFooter() {
        return (
            <TableFooter></TableFooter>
        )
    }

    _getTableBody() {
        return (
            <TableBody
             displayRowCheckbox={false}>
                <TableRow>
                    <TableRowColumn>1</TableRowColumn>
                    <TableRowColumn>Marvin</TableRowColumn>
                    <TableRowColumn>123.456.78.1</TableRowColumn>
                    <TableRowColumn>Active</TableRowColumn>
                    <TableRowColumn>0.2</TableRowColumn>
                    <TableRowColumn>2000000 / 8030376 MB</TableRowColumn>
                    <TableRowColumn>20 / 80 GB</TableRowColumn>
                    <TableRowColumn><RaisedButton label="Detail" secondary={true} /></TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>2</TableRowColumn>
                    <TableRowColumn>Orion</TableRowColumn>
                    <TableRowColumn>123.456.78.2</TableRowColumn>
                    <TableRowColumn>Active</TableRowColumn>
                    <TableRowColumn>0.1</TableRowColumn>
                    <TableRowColumn>3000000 / 8030376 MB</TableRowColumn>
                    <TableRowColumn>15 / 80 GB</TableRowColumn>
                    <TableRowColumn><RaisedButton label="Detail" secondary={true} /></TableRowColumn>
                </TableRow>
                 <TableRow>
                    <TableRowColumn>3</TableRowColumn>
                    <TableRowColumn>Alice</TableRowColumn>
                    <TableRowColumn>123.456.78.4</TableRowColumn>
                    <TableRowColumn>Down</TableRowColumn>
                    <TableRowColumn>0</TableRowColumn>
                    <TableRowColumn>0 / 0 MB</TableRowColumn>
                    <TableRowColumn>0 / 0 GB</TableRowColumn>
                    <TableRowColumn><RaisedButton label="Disable" disabled={true} /></TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>4</TableRowColumn>
                    <TableRowColumn>Bob</TableRowColumn>
                    <TableRowColumn>123.456.78.5</TableRowColumn>
                    <TableRowColumn>Active</TableRowColumn>
                    <TableRowColumn>0.8</TableRowColumn>
                    <TableRowColumn>70000000 / 8030376 MB</TableRowColumn>
                    <TableRowColumn>40 / 80 GB</TableRowColumn>
                    <TableRowColumn><RaisedButton label="Detail" secondary={true} /></TableRowColumn>
                </TableRow>
            </TableBody>
        )
    }

}

export default ServerStatus
