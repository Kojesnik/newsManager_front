import React from 'react';
import '../css/sidebar.css';
import { withTranslation } from 'react-i18next';

class Sidebar extends React.Component {

    render() {

        const { t, i18n } = this.props;

        return(
            <div className="sidebar">
                <div class="ui vertical text menu">
                    <div class="header item">Dashboard</div>
                    <a href="/addNews" class="item">{t('addNews')}</a>
                    <a href="/addAuthors" class="item">{t('addAuthors')}</a>
                    <a href="/addTags" class="item">{t('addTags')}</a>
                </div>
            </div>
        );
    }
}

export default withTranslation('translation')(Sidebar);