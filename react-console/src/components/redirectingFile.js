import React, { Component } from "react";
import TaskPage from "./taskPage";
import BlankPage from "./blankPage";

export class RedirectingFile extends Component {
    constructor() {
        super();
        this.state = {
            subPage: "TASK_PAGE"
        };
    }

    redirectToBlankPage =()=>{
        this.setState({subPage: "BLANK_PAGE"})
    }

    render() {
        return (
            <React.Fragment>
                {this.state.subPage === "TASK_PAGE" && (
                <TaskPage
                    redirectToBlankPage={this.redirectToBlankPage}
                />
                )}{" "}
                {this.state.subPage === "BLANK_PAGE" && (
                    <BlankPage/>
                )}
            </React.Fragment>
        );
    }
}

export default RedirectingFile;