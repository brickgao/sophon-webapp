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


class DeployIndex extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            deploySummary: "",
            isMount: false,
        }
        this._getDeploySummary = this._getDeploySummary.bind(this)
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
                    <TableHeaderColumn>#</TableHeaderColumn>
                    <TableHeaderColumn>Task Name</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                    <TableHeaderColumn>Created</TableHeaderColumn>
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
        if (!this.state.isMount) {
            $.get(
                "/api/deploy",
                this._getDeploySummary
            )
        }

        let tableBody = []

        if (this.state.isMount) {
            for (let key of Object.keys(this.state.deploySummary)) {
                let val = this.state.deploySummary[key]
                let linkToDetail = "/deploy/" + key.toString()
                let statusIconDict = {
                    0: <TableRowColumn><FontIcon className="material-icons" color={Colors.grey400}>cached</FontIcon></TableRowColumn>,
                    1: <TableRowColumn><FontIcon className="material-icons" color={Colors.greenA400}>done</FontIcon></TableRowColumn>,
                    2: <TableRowColumn><FontIcon className="material-icons" color={Colors.red400}>error</FontIcon></TableRowColumn>,
                }
                let detailBtnDict = {
                    0: <TableRowColumn><RaisedButton label="Detail" disabled={true} /></TableRowColumn>,
                    1: <TableRowColumn><Link to={linkToDetail}><RaisedButton label="Detail" secondary={true} /></Link></TableRowColumn>,
                    2: <TableRowColumn><Link to={linkToDetail}><RaisedButton label="Detail" secondary={true} /></Link></TableRowColumn>,
                }

                tableBody.push(
                    <TableRow key={key}>
                        <TableRowColumn>{key}</TableRowColumn>
                        <TableRowColumn>{val["Taskname"]}</TableRowColumn>
                        {statusIconDict[val["Status"]]}
                        <TableRowColumn>{val["Created"]}</TableRowColumn>
                        {detailBtnDict[val["Status"]]}
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

    _getDeploySummary(data) {
        this.setState({deploySummary: data, isMount: true})
    }

}

export default DeployIndex
