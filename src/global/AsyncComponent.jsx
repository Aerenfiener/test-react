import React from 'react';

export default class AsyncComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            component: null
        };
    }

    componentDidMount() {
        this.props.loader((componentModule) => {
            this.setState({
                component: componentModule.default
            });
        });
    }
    render() {
        if (this.state.component) {
            return <this.state.component/>
        }
        return <div></div>;
    }
}

