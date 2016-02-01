import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import {
    FontIcon,
    Table,
    TableBody,
    TableFooter,
    TableHeader, 
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    RaisedButton,
} from 'material-ui'


class DockersStatus extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dockersStatus: "",
            isMount: false,
        }
        this._getDockersStatus = this._getDockersStatus.bind(this)
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

    _getTableHeader() {
        return (
            <TableHeader
             adjustForCheckbox={false}
             displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>Container ID</TableHeaderColumn>
                    <TableHeaderColumn>Hostname</TableHeaderColumn>
                    <TableHeaderColumn>IP Address</TableHeaderColumn>
                    <TableHeaderColumn>Image</TableHeaderColumn>
                    <TableHeaderColumn>Command</TableHeaderColumn>
                    <TableHeaderColumn>Created</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                    <TableHeaderColumn>Ports</TableHeaderColumn>
                    <TableHeaderColumn>Names</TableHeaderColumn>
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
                "/api/host/dockers_status",
                this._getDockersStatus
            )
        }

        let tableBody = []
        let key = 0

        if (this.state.isMount) {
            for (let dockerStatus of JSON.parse(this.state.dockersStatus)) {
                tableBody.push(
                    <TableRow key={key}>
                        <TableRowColumn>{dockerStatus["Container ID"]}</TableRowColumn>
                        <TableRowColumn>{dockerStatus["Hostname"]}</TableRowColumn>
                        <TableRowColumn>{dockerStatus["IP"]}</TableRowColumn>
                        <TableRowColumn>{dockerStatus["Image"]}</TableRowColumn>
                        <TableRowColumn>{dockerStatus["Command"]}</TableRowColumn>
                        <TableRowColumn>{dockerStatus["Created"]}</TableRowColumn>
                        <TableRowColumn>{dockerStatus["Status"]}</TableRowColumn>
                        <TableRowColumn>{dockerStatus["Ports"]}</TableRowColumn>
                        <TableRowColumn>{dockerStatus["Names"]}</TableRowColumn>
                    </TableRow>
                )
                key += 1
            }
        }

        return (
            <TableBody
             displayRowCheckbox={false}>
                {tableBody}
            </TableBody>
        )
    }

    _getDockersStatus(data) {
        this.setState({dockersStatus: data, isMount: true})
    }

}

export default DockersStatus
