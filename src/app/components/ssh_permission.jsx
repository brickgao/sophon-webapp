import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import {
    FontIcon,
    Styles,
    Table,
    TableBody,
    TableFooter,
    TableHeader, 
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    RaisedButton,
} from 'material-ui'

const { Colors } = Styles


class SSHPermission extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            SSHPermissionStatus: "",
            isMount: false,
        }
        this._getSSHPermissionStatus = this._getSSHPermissionStatus.bind(this)
        this._updateSSHPermissionStatus = this._updateSSHPermissionStatus.bind(this)
        this._requestPermission = this._requestPermission.bind(this)
    }

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

    _getSSHPermissionStatus(data) {
        this.setState({SSHPermissionStatus: data, isMount: true})
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
                    <TableHeaderColumn>Has Permission</TableHeaderColumn>
                    <TableHeaderColumn>Operation</TableHeaderColumn>
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
       if (!this.state.isMount) {
            $.get(
                "/api/host/ssh_permission",
                this._getSSHPermissionStatus
            )
        }
        let tableBody = []

        if (this.state.isMount) {
            for (let key of Object.keys(this.state.SSHPermissionStatus)) {
                let val = this.state.SSHPermissionStatus[key]
                let hasPermissionIconDict = {
                    true: <TableRowColumn><FontIcon className="material-icons" color={Colors.greenA400}>vpn_key</FontIcon></TableRowColumn>,
                    false: <TableRowColumn><FontIcon className="material-icons" color={Colors.red400}>clear</FontIcon></TableRowColumn>,
                }
                let operationBtnDict = {
                    false: <TableRowColumn><RaisedButton label="Request Permssion" secondary={true} onTouchTap={this._requestPermission(key, this)} /></TableRowColumn>,
                    true:  <TableRowColumn><RaisedButton label="Request Permssion" disabled={true} /></TableRowColumn>,
                }

                tableBody.push(
                    <TableRow key={key}>
                        <TableRowColumn>{key}</TableRowColumn>
                        <TableRowColumn>{val["Hostname"]}</TableRowColumn>
                        <TableRowColumn>{val["IP"]}</TableRowColumn>
                        {hasPermissionIconDict[val["Has Permission"]]}
                        {operationBtnDict[val["Has Permission"]]}
                    </TableRow>
                )
            }
        }

        return (
            <TableBody
             displayRowCheckbox={false}>
                {tableBody}
            </TableBody>
        )
    }

    _updateSSHPermissionStatus(host_id) {
        let modifiedStatus = this.state.SSHPermissionStatus
        modifiedStatus[host_id]["Has Permission"] = true
        this.setState({SSHPermissionStatus: modifiedStatus})
    }

    _requestPermission(host_id, obj) {
        return function() {
            $.ajax({
                url: "/api/host/ssh_permission",
                data: {
                    host_id: host_id,
                    has_permission: "true",
                },
                type: "PATCH",
                dataType: "text",
                success: function(data) {
                    obj._updateSSHPermissionStatus(host_id)
                },
            })
        }
    }
}

export default SSHPermission
