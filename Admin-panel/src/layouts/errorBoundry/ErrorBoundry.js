import React, { Component } from "react";

export default class ErrorBoundry extends Component {

    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div className="d-flex justify-content-center align-items-center vh-100 ">
                <b>Something went wrong!</b> <br /><br /> <br />
                <b>Please try again</b>
            </div>;
        }
        return this.props.children;
    }
}
