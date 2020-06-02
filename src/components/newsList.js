import React from 'react';
import { Redirect } from 'react-router-dom';
import NewsDataService from '../services/newsService';
import { Dropdown } from 'semantic-ui-react';
import TagDataService from '../services/tagService';
import AuthorDataService from '../services/authorService';
import { withTranslation } from 'react-i18next';
import { Pagination } from 'semantic-ui-react'

class NewsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        redirect: false,
        updateRedirect: false,
        id: 0,
        news: [],
        tags: [],
        authors: [],
        authorValue: "",
        tagValue: [],
        pageNumber: 1,
        pageSize: 3,
        pageCount: "",
        isSearchCriteriaResult: false
    }
  }

  setRedirect = (newsId) => {
    this.setState({
      redirect: true,
      id: newsId
    })
  }

  setUpdateRedirect = (newsId, event) => {
    event.stopPropagation();
    this.setState({
      updateRedirect: true,
      id: newsId
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/news',
        state: { id: `${this.state.id}` }
      }} />
    }
    if (this.state.updateRedirect) {
      return <Redirect to={{
        pathname: '/addNews',
        state: { id: `${this.state.id}` }
      }} />
    }
  }

  componentDidMount() {
    if (this.state.isSearchCriteriaResult) {
      this.refreshCriteriaNews(this.state.pageNumber, this.state.pageSize);
    } else {
      this.refreshNews(this.state.pageNumber, this.state.pageSize);
    }
    this.refreshTags();
    this.refreshAuthors();
    this.refreshPageCount();
  }

  refreshPageCount() {
    if (this.state.isSearchCriteriaResult) {
      NewsDataService.retrieveCriteriaNewsCount(this.state.authorValue, this.state.tagValue).then(
        response => {
          this.setState({pageCount: Math.ceil(response.data/this.state.pageSize)});
        }
      )
    } else {
      NewsDataService.retrieveNewsCount().then(
        response => {
          this.setState({pageCount: Math.ceil(response.data/this.state.pageSize)});
        }
      )
    }
  }

  refreshNews(pageNumber, pageSize) {
    console.log(pageNumber, pageSize);
    NewsDataService.retrieveAllNews(pageNumber, pageSize).then(
      response => {
        console.log(response.data[0]);
        console.log(response.data[1]);
        this.setState({ news: response.data });
      }
    )
  }

  refreshCriteriaNews(pageNumber, pageSize) {
    NewsDataService.retrieveAllNewsByCriteria(this.state.authorValue, this.state.tagValue, pageNumber, pageSize).then(
      response => {
        this.setState({news: response.data, isSearchCriteriaResult: true});
        this.refreshPageCount();
      }
    )
  }

  refreshTags() {
    TagDataService.retrieveAllTags().then(
      response => {
        this.setState({ tags: response.data });
      }
    )
  }

  refreshAuthors() {
      AuthorDataService.retrieveAllAuthors().then(
        response => {
          this.setState({ authors: response.data });
        }
      )
  }

  onAuthorChange = (e, data) => {
    this.setState({authorValue: data.value});
  }

  onTagChange = (e, data) => {
    this.setState({tagValue: data.value});
  }

  onSubmit = (event) => {
    this.refreshCriteriaNews(this.state.pageNumber, this.state.pageSize);
    event.preventDefault();
  }

  onDelete = (id, event) => {
    event.stopPropagation();
    NewsDataService.deleteNewsById(id).then(
      () => {
        this.refreshNews(this.state.pageNumber, this.state.pageSize);
      }
    );
  }

  handleReset = () => {
    this.setState({tagValue: [], authorValue: ""});
  }

  handlePageChange = (event, {activePage}) => {
    this.setState({pageNumber: activePage});
    if (this.state.isSearchCriteriaResult) {
      this.refreshCriteriaNews(activePage, this.state.pageSize);
    } else {
      this.refreshNews(activePage, this.state.pageSize);
    }
  }

  handleThreePageSize = () => {
    this.setState({pageSize: 3, pageNumber: 1});
    if (this.state.isSearchCriteriaResult) {
      this.refreshCriteriaNews(1, 3);
    } else {
      this.refreshNews(1, 3);
    }
    this.refreshPageCount();
  }

  handleFivePageSize = () => {
    this.setState({pageSize: 5, pageNumber: 1});
    if (this.state.isSearchCriteriaResult) {
      this.refreshCriteriaNews(1, 5);
    } else {
      this.refreshNews(1, 5);
    }
    this.refreshPageCount();
  }

  handleTenPageSize = () => {
    this.setState({pageSize: 10, pageNumber: 1});
    if (this.state.isSearchCriteriaResult) {
      this.refreshCriteriaNews(this.state.pageNumber, 10);
    } else {
      this.refreshNews(1, 10);
    }
    this.refreshPageCount();
  }

  render() {

    const { t, i18n } = this.props;

        return(
          <div className="content">
            <div className="searchContent ui one column stackable center aligned page grid">
                {this.renderRedirect()}
                <form onSubmit={this.onSubmit}>
                  <div id="searchCriteria" className="ui two column grid">
                    <div class="twelve wide column">
                      <Dropdown onChange={this.onTagChange} value={this.state.tagValue} placeholder={t('tags')} fluid multiple search selection options={this.state.tags ? this.state.tags.map(tag => {
                        return({key: tag.id, text: tag.name, value: tag.name});
                        }): 'Undefined'} />
                    </div>
                    <div class="four wide column">
                        <div className="searchButton">
                          <button id="searchButton" className="ui violet basic button"><i className="search icon"></i> {t('search')}</button>
                        </div>
                    </div>
                    <div class="twelve wide column">
                      <Dropdown onChange={this.onAuthorChange} value={this.state.authorValue} placeholder={t('authors')} fluid selection search options={this.state.authors ? this.state.authors.map(author => {
                        return({key: author.id, text: author.name + ' ' + author.surname, value: author.name + " " + author.surname});
                        }): 'Undefined'} />
                    </div>
                    <div class="four wide column">
                        <div className="resetButton">
                          <button id="resetButton" onClick={this.handleReset} type="reset" className="ui red basic button"><i className="times icon"></i> {t('reset')}</button>
                        </div>  
                    </div>
                  </div>
                </form>
            </div>
            {this.renderRedirect()}
            <div className="newsList">
              {this.state.news.map(news => {
                return(
                  <div onClick={() => this.setRedirect(news.id)} className="newsBlock ui left aligned raised teal clearing  segment">
                      <div className="ui item">
                        <h2 className="ui header">
                          {news.title}
                        </h2>
                      </div>
                      <div className="creationDateBlock ui right floated item">
                        <div>{news.creationDate}</div>
                      </div>
                      <div className="ui item">
                        <div className="authorBlock">{news.author.name} {news.author.surname}</div>
                      </div>
                      <div className="shortTextBlock">
                        <div>{news.shortText}</div>
                      </div>
                      <div className="tagBlock">
                        <div>
                            {news.tags.map(tag => {
                                return (
                                    <div className="singleTagBlock">{tag.name} </div>
                                );
                            })}
                        </div>
                      </div>
                      <div className="newsBlockButtons">
                          <div className="newsBlockButton">
                            <button onClick={(event) => this.setUpdateRedirect(news.id, event)} id="editButton" className="ui teal basic button"><i className="edit outline icon"></i> {t('edit')}</button>
                          </div>
                          <div className="newsBlockButton">
                            <button onClick={(event) => this.onDelete(news.id, event)} id="deleteButton" className="ui red basic button"><i className="trash alternate outline icon"></i> {t('delete')}</button>
                          </div>
                      </div>
                  </div>
                );
              })}
            </div>
            <div style={{marginTop: "50px"}} className="ui stackable center aligned grid">
              <div className="five wide column">
                <div className="ui grid">
                  <div className="six wide right floated column">
                    <div className="ui secondary vertical pointing menu">
                      {this.state.pageSize === 3 ? <a onClick={this.handleThreePageSize} className="active item">3</a> : <a onClick={this.handleThreePageSize} className="item">3</a>}
                      {this.state.pageSize === 5 ? <a onClick={this.handleFivePageSize} className="active item">5</a> : <a onClick={this.handleFivePageSize} className="item">5</a>}
                      {this.state.pageSize === 10 ? <a onClick={this.handleTenPageSize} className="active item">10</a> : <a onClick={this.handleTenPageSize} className="item">10</a>}
                    </div>
                  </div>
                  <div className="ten wide column">
                    <Pagination
                      firstItem={null}
                      lastItem={null}
                      pointing
                      secondary
                      totalPages={this.state.pageCount}
                      onPageChange={this.handlePageChange}
                      activePage={this.state.pageNumber}
                    />  
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
}

export default withTranslation('translation')(NewsList);