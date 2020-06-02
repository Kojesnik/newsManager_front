import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginRedirect: false,
            lang: "Language"
        }
    }

    setLoginRedirect = () => {
        this.setState({loginRedirect: true});
    }

    renderRedirect = () => {
        if (this.state.loginRedirect) {
            return <Redirect to={{
                pathname: '/login'
              }} />
        }
    }

    logOut = () => {
        localStorage.removeItem("isLogged");
        localStorage.removeItem("username");
        this.setLoginRedirect();
    }

    handleFr = () => {
        this.setState({lang: "French"})
    }
    
    render() {
        const { t, i18n } = this.props;

        return(
            <div className="ui large menu appHeader">
                {this.renderRedirect()}
                <a href="/" className="aligned active item">{ t('logo') }</a>
                <div className="headerButtons ui secondary  menu">
                    <a href="/addAuthors" className="item">{ t('authors') }</a>
                    <a href="/addTags" className="item">{ t('tags') }</a>
                </div>
                <div className="right menu">
                    <div value={this.state.localisation} className="ui simple dropdown item">
                    <i class="globe icon" /><i class="dropdown icon"></i>
                        <div className="menu">
                            <a onClick={() => {i18n.changeLanguage('en');this.setState({lang: t('localisation.english')})}} key="en" href="#en" className="item">{ t('localisation.english') }</a>
                            <a onClick={() => {i18n.changeLanguage('ru');this.setState({lang: t('localisation.russian')})}} href="#ru" className="item">{ t('localisation.russian') }</a>
                            <a onClick={this.handleFr} href="#sp" className="item">{ t('localisation.french') }</a>
                        </div>
                    </div>
                    {localStorage.getItem("username") ? 
                    <div className="item">
                        Hello,  {localStorage.getItem("username")}
                    </div> : null
                    }
                    {localStorage.getItem("isLogged") ? 
                        <div className="item">
                            <div onClick={this.logOut} className="ui button"><i className="sign out alternate icon" /> { t('authorization.logout') }</div>
                        </div> 
                        :   
                        <Fragment>
                            <div className="item">
                                <button className="ui primary button"><i className="signup icon" /> { t('authorization.signup') }</button>
                            </div>
                            <div className="item">
                                <div onClick={this.setLoginRedirect} className="ui button"><i className="sign in icon" /> { t('authorization.login') }</div>
                            </div>
                        </Fragment>
                    }
                </div>
            </div>
        );
    }
}

export default withTranslation('translation')(Header);
