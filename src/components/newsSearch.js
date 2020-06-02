import { Dropdown } from 'semantic-ui-react';
import React from 'react';
import '../css/newsSearch.css';
import TagDataService from '../services/tagService';
import AuthorDataService from '../services/authorService';
import { Redirect } from 'react-router-dom';

export default class NewsSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            tags: [],
            authors: [],
            authorValue: ""
        }
    }

    componentDidMount() {
        this.refreshTags();
        this.refreshAuthors();
    }

    setRedirect = () => {
        this.setState({
          redirect: true,
        })
    }
    
    refreshTags() {
        TagDataService.retrieveAllTags().then(
          response => {
            this.setState({ tags: response.data })
          }
        )
    }

    refreshAuthors() {
        AuthorDataService.retrieveAllAuthors().then(
          response => {
            this.setState({ authors: response.data })
          }
        )
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={{
            pathname: '/',
            state: { author: 'AUTHOR' }
          }} />
        }
      }

    onAuthorChange = (e, data) => {
        this.setState({authorValue: data.value});
    }

    render() {
        return(
            <div className="searchContent">
                {this.renderRedirect()}
                <form onSubmit={this.setRedirect}>
                    <div>
                        <button type="submit" className="searchButton">Search</button>
                    </div>
                    <div id="drop">
                        <Dropdown placeholder='Tags' fluid multiple selection options={this.state.tags ? this.state.tags.map(tag => {
                return({key: tag.id, text: tag.name, value: tag.name});
            }): 'Jopa'} />
                    </div>
                    <div>
                        <button className="resetButton" type="reset">Reset</button>
                    </div>
                    <div id="drop">
                        <Dropdown onChange={this.onAuthorChange} placeholder='Author' fluid selection options={this.state.authors ? this.state.authors.map(author => {
                return({key: author.id, text: author.name + ' ' + author.surname, value: author.name + " " + author.surname});
            }): 'Jopa'} />
                    </div>
                </form>
            </div>
        );
    }
}