import React from 'react';
import '../css/footer.css';

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {footerText: 'Copyright EPAM 2020. All Rights Reserved'};
    }

    render() {
        return(
        <div className="footer">
            <div class="ui horizontal divider">
                {this.state.footerText}
            </div>
        </div>
        );
    }
}