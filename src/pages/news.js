import React, { Fragment } from 'react';
import NewsDataService from '../services/newsService';
import '../css/news.css';
import { Redirect } from 'react-router-dom';
import Header from '../components/header';
import { withTranslation } from 'react-i18next';

class News extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: {}, 
            updateRedirect: false,
            redirect: false
        }
    }

    componentDidMount() {
        this.refreshNews();
    }
    
    refreshNews() {
        NewsDataService.retrieveNewsById(this.props.location.state.id).then(
          response => {
            this.setState({ news: response.data})
          }
        )
    }

    setUpdateRedirect = (newsId, event) => {
        event.stopPropagation();
        this.setState({
          updateRedirect: true,
          id: newsId
        });
    }

    setRedirect = () => {
        this.setState({redirect: true});
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{
              pathname: '/'
            }} />
          }
        if (this.state.updateRedirect) {
          return <Redirect to={{
            pathname: '/addNews',
            state: { id: `${this.state.id}` }
          }} />
        }
      }

    onDelete = (id, event) => {
        event.stopPropagation();
        NewsDataService.deleteNewsById(id).then(
          () => {
            this.setRedirect();
          }
        );
      }

    render() {

        const { t, i18n } = this.props;

        return(
            <Fragment>
                <Header />
                <div className="content">
                {this.renderRedirect()}
                    <div className="ui center aligned grid">
                        <div className="ui ten wide column">
                            <div className="singleNewsBlock ui left aligned raised teal clearing  segment">
                                <div className="ui right floated item">
                                    <div>
                                        <button onClick={this.setRedirect} class="mini ui red basic button"><i className="times icon" /> {t('close')}</button>
                                    </div>
                                </div>
                                <div className="ui item">
                                    <h2 className="ui header">
                                    {this.state.news.title}
                                    </h2>
                                </div>
                                <div className="singleCreationDateBlock ui right floated item">
                                    <div>{this.state.news.creationDate}</div>
                                </div>
                                <div className="ui item">
                                    <div className="singleAuthorBlock">{this.state.news.author ? this.state.news.author.name : "Undefined"} {this.state.news.author ? this.state.news.author.surname : "Undefined"}</div>
                                </div>
                                <div className="fullTextBlock">
                                    <div>{this.state.news.fullText}</div>
                                </div>
                                <div className="singleNewsTagBlock">
                                    <div>
                                        {this.state.news.tags ? this.state.news.tags.map(tag => {
                                            return (
                                                <div className="singleTagBlock">{tag.name} </div>
                                            );
                                        }) : "Undefined"}
                                    </div>
                                </div>
                                <div className="newsBlockButtons">
                                    <div className="newsBlockButton">
                                        <button onClick={(event) => this.setUpdateRedirect(this.props.location.state.id, event)} id="editButton" className="ui teal basic button"><i className="edit outline icon"></i> {t('edit')}</button>
                                    </div>
                                    <div className="newsBlockButton">
                                        <button onClick={(event) => this.onDelete(this.props.location.state.id, event)} id="deleteButton" className="ui red basic button"><i className="trash alternate outline icon"></i> {t('delete')}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

}

export default withTranslation('translation')(News);