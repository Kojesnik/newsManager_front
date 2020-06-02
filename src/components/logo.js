import React from 'react';

export default class Logo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {logoText: 'News Portal'};
    }

    render() {
        return(
            <a href="/" className="logo">{this.state.logoText}</a>
        );
    }
}