import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import {
    Checkbox,
    Dialog,
    FontIcon,
    FlatButton,
    Styles,
    Table,
    TableBody,
    TableFooter,
    TableHeader, 
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TextField,
    RaisedButton,
} from 'material-ui'

const { Colors } = Styles


class DeployIndex extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checkboxsCount: {},
            dialogOpen: false,
            entryPointErrorText: "",
            hostsErrorText: "",
            repoURIErrorText: "",
            serverStatus: "",
            tasknameErrorText: "",
            tableBody: "",
            isMount: false,
        }
        this._getDeploySummary = this._getDeploySummary.bind(this)
        this._getServerStatus = this._getServerStatus.bind(this)
        this._handleNewDeploy = this._handleNewDeploy.bind(this)
        this._updateDeploySummary = this._updateDeploySummary.bind(this)
    }

    render() {
        return(
            <div>
                {this._getNewDeployDialog()}
                <Table
                 selectable={false}
                 height='80%'>
                    {this._getTableHeader()}
                    {this._getTableBody()}
                    {this._getTableFooter()}
                </Table>
            </div>
        )
    }

    _handleDialogOpen = () => {
        this.setState({dialogOpen: true})
    }
  
    _handleDialogClose = () => {
        this.setState({
            checkboxsCount: {},
            dialogOpen: false,
            tasknameErrorText: "",
            repoURIErrorText: "",
            entryPointErrorText: "",
            hostsErrorText: "",
        })
    }

    _handleNewDeploy() {
        let taskname = $("#taskname").val()
        let repo_uri = $("#repo_uri").val()
        let entry_point = $("#entry_point").val()
        let hosts = []

        for (let key of Object.keys(this.state.checkboxsCount)) {
            let val = this.state.checkboxsCount[key]
            if (val % 2 === 1)
                hosts.push(parseInt(key))
        }

        try {
            this.setState({
                tasknameErrorText: "",
                repoURIErrorText: "",
                entryPointErrorText: "",
                hostsErrorText: "",
            })
        }
        finally {
            if (taskname === "") {
                this.setState({tasknameErrorText: "Please input task name"})
            }
            else if (repo_uri === "") {
                this.setState({repoURIErrorText: "Please input repo URI"})
            }
            else if (entry_point === "") {
                this.setState({entryPointErrorText: "Please input entry point"})
            }
            else if (hosts.length === 0) {
                this.setState({hostsErrorText: "Please select hosts"})
            }
            else {
                $.post(
                    "/api/deploy",
                    {
                        taskname: taskname,
                        repo_uri: repo_uri,
                        entry_point: entry_point,
                        hosts: "[" + hosts.toString() + "]",
                    },
                    this._updateDeploySummary
                )
                this._handleDialogClose()
            }
        }
    }

    _getNewDeployDialog() {
        const actions = [
            <FlatButton
             label="Cancel"
             secondary={true}
             onTouchTap={this._handleDialogClose}
            />,
            <FlatButton
             label="Deploy"
             primary={true}
             keyboardFocused={true}
             onTouchTap={this._handleNewDeploy}
            />,
        ];

        return (
            <div>
                <RaisedButton label="NewDeploy" secondary={true} onTouchTap={this._handleDialogOpen} />
                <Dialog
                 title="New Deploy Task"
                 actions={actions}
                 modal={false}
                 open={this.state.dialogOpen}
                 onRequestClose={this._handleDialogClose}
                >
                    {this._getDialogBody()}
                </Dialog>
            </div>
        )
    }

    _getDialogBody() {
        
        let checkboxs = []

        if (this.state.isMount) {
            for (let key of Object.keys(this.state.serverStatus)) {
                let val = this.state.serverStatus[key]
                let label = val["Hostname"] + "(" + val["IP"] + ")"

                checkboxs.push(
                    <Checkbox
                     key={key}
                     label={label}
                     onCheck={this._updateCheckboxsCount(key, this)}
                     value={key}
                    />
                )
            }
        }

        return (
            <div>
                <span>Task Name</span><br/>
                <TextField
                 id="taskname"
                 errorText={this.state.tasknameErrorText}
                 hintText="Task Name"
                /><br/>
                <span>Repo URI</span><br/>
                <TextField
                 id="repo_uri"
                 errorText={this.state.repoURIErrorText}
                 hintText="Repo URI"
                /><br/>
                <span>Entry Point</span><br/>
                <TextField
                 id="entry_point"
                 errorText={this.state.entryPointErrorText}
                 hintText="Entry Point"
                /><br/>
                <span>Hosts</span>{ " " }<span style={{color: Colors.red500}}>{this.state.hostsErrorText}</span><br/>
                {checkboxs}
            </div>
        )
    }

    _incCheckboxsCount(key) {
        let checkboxsCount = this.state.checkboxsCount

        if (key in this.state.checkboxsCount)
            checkboxsCount[key] += 1
        else
            checkboxsCount[key] = 1

        this.setState({checkboxsCount: checkboxsCount})
    }

    _updateCheckboxsCount(key, obj) {
        return (
            function() {
                obj._incCheckboxsCount(key)
            }
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
            $.get(
                "/api/host/status",
                this._getServerStatus
            )
        }

        return (
            <TableBody
             displayRowCheckbox={false}>
                {this.state.tableBody}
            </TableBody>
        )
    }

    _getSingleTableRow(key, val) {
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

        return (
            <TableRow key={key}>
                <TableRowColumn>{key}</TableRowColumn>
                <TableRowColumn>{val["Taskname"]}</TableRowColumn>
                {statusIconDict[val["Status"]]}
                <TableRowColumn>{val["Created"]}</TableRowColumn>
                {detailBtnDict[val["Status"]]}
            </TableRow>
        )
    }

    _getDeploySummary(data) {
        let tableBody = []

        for (let key of Object.keys(data)) {
            let val = data[key]
            tableBody.push(
                this._getSingleTableRow(key, val)
            )
        }

        this.setState({tableBody: tableBody, isMount: true})
    }

    _updateDeploySummary(data) {
        let tableBody = this.state.tableBody

        for (let key of Object.keys(data)) {
            let val = data[key]
            tableBody.push(
                this._getSingleTableRow(key, val)
            )
        }
        
        this.setState({tableBody: tableBody})
    }

    _getServerStatus(data) {
        this.setState({serverStatus: data})
    }

}

export default DeployIndex
