import React from 'react';
import UserDataService from '../services/userService';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            sucsessRedirect: false
        }
    }

    setSuccessRedirect = () => {
        this.setState({sucsessRedirect: true});
    }

    renderRedirect = () => {
        if (this.state.sucsessRedirect) {
            return <Redirect to={{
                pathname: '/',
                render: true
              }} />
        }
    }

    onUsernameChange = (event, data) => {
        let value = event.target.value;
        this.setState({username: value});
    }

    onPasswordChange = (event, data) => {
        let value = event.target.value;
        this.setState({password: value});
    }

    checkUser = () => {
        let username = this.state.username;
        let password = this.state.password;
        if (username === "") {
            username = "1";
        }
        if (password === "") {
            password = "1";
        }
        UserDataService.checkUser(username, password).then(
            response => {
                if (response.data) {
                    localStorage.setItem("isLogged", true);
                    localStorage.setItem("username", username);
                    this.setSuccessRedirect();
                }
            }
        )
    }

    render() {

        const { t, i18n } = this.props;

        return(
                <div className="loginContent">
                    {this.renderRedirect()}
                    <div className="ui center aligned grid">
                        <div className="column loginColumn">
                            <h2 className="ui header">
                                {t('Log-in to your account')}
                            </h2>
                            <form onSubmit={this.checkUser} className="ui form">
                                <div>
                                    <div className="field">
                                        <label>{t('username')}</label>
                                        <div className="ui left icon input">
                                            <i className="user icon"></i>
                                            <input onChange={this.onUsernameChange} value={this.state.username} type="text" name="login" placeholder={t('username')} />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>{t('password')}</label>
                                        <div className="ui left icon input">
                                            <i className="lock icon"></i>
                                            <input onChange={this.onPasswordChange} value={this.state.password} type="password" name="password" placeholder={t('password')} />
                                        </div>
                                    </div>
                                    <div className="ui one column center aligned grid">
                                        <div className="ui ten wide column">
                                            <div class="ui buttons">
                                                <button type="button" onClick={this.checkUser} class="ui positive button"><i className="sign in icon" />{t('authorization.login')}</button>
                                                <div class="or"></div>
                                                <button class="ui button"><i className="times icon" />{t('cancel')}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        );
    }
}

export default withTranslation('translation')(LoginForm);