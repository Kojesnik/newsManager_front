import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import '../css/addNews.css';
import TagDataService from '../services/tagService';
import AuthorDataService from '../services/authorService';
import NewsDataService from '../services/newsService';
import { Dropdown } from 'semantic-ui-react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';

export default class AddNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            tags: [],
            authors: [],
            authorValue: null,
            authorsValues: [],
            tagValue: {},
            tagValues: [],
            title: "",
            shorttext: "",
            fulltext: "",
            idToUpdate: this.props.location.state ? this.props.location.state.id : "",
            newsToUpdate: {},
            titleError: "",
            shorttextError: "",
            fulltextError: "",
            tagError: "",
            authorError: ""
        }
    }

    componentDidMount() {
        this.refreshTags();
        this.refreshAuthors();
        this.getNewsToUpdate();
    }

    getNewsToUpdate() {
        if (this.state.idToUpdate !== "") {
            NewsDataService.retrieveNewsById(this.state.idToUpdate).then(
                response => {
                    let news = response.data;
                    let author = response.data.author;
                    let authorArray = this.state.authorsValues;
                    authorArray.push(author);
                    this.setState({
                        title: news.title,
                        shorttext: news.shortText,
                        fulltext: news.fullText,
                        tagValues: news.tags,
                        authorsValues: authorArray
                    });
                }
            )
        }
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

    onTagChange = (e, data) => {
        let tagId;
        for (let i = 0; i < this.state.tags.length; i++) {
            if (this.state.tags[i].name === data.value) {
                tagId = this.state.tags[i].id;
            }
        }
        if (tagId === undefined) {
            this.setState({tagValue: {name: data.value}});
        } else {
            this.setState({tagValue: {id: tagId, name: data.value}});
        }
    }

    onAuthorChange = (e, data) => {
        let name = data.value.split(' ')[0];
        let surname = data.value.split(' ')[1];
        let authorId;
        for (let i = 0; i < this.state.authors.length; i++) {
            if (this.state.authors[i].name === name && this.state.authors[i].surname === surname) {
                authorId = this.state.authors[i].id;
            }
        }
        if (authorId === undefined) {
            this.setState({authorValue: {name: name, surname: surname}});
        } else {
            this.setState({authorValue: {id: authorId, name: name, surname: surname}});
        }
    }

    onTitleChange = (event) => {
        let value = event.target.value;
        this.setState({title: value});
    }

    onShorttextChange = (event) => {
        let value = event.target.value;
        this.setState({shorttext: value});
    }

    onFulltextChange = (event) => {
        let value = event.target.value;
        this.setState({fulltext: value});
    }

    onTagAdd = () => {
        let isValid = true;
        this.setState({tagError: ""})
        if (this.state.tagValue.name === undefined) {
            isValid = false;
            this.setState({tagError: "Please, define tag"})
        } else if (this.state.tagValue.name.length === 0 || this.state.tagValue.name.length > 30) {
            isValid = false;
            this.setState({tagError: "Tag length should be 1 - 30"})
        }
        if (isValid) {
            let tagArray = this.state.tagValues;
            tagArray.push(this.state.tagValue);
            this.setState({tagValues: tagArray});
        }
    }

    onAuthorAdd = () => {
        let isValid = true;
        this.setState({authorError: ""});
        if (this.state.authorValue === null || this.state.authorValue.name === undefined || this.state.authorValue.surname === undefined) {
            isValid = false;
            this.setState({authorError: "Please, define author"})
        } else if (this.state.authorValue.name.length === 0 || this.state.authorValue.name.length > 30) {
            isValid = false;
            this.setState({authorError: "Author name length should be 1 - 30"})
        } else if (this.state.authorValue.surname.length === 0 || this.state.authorValue.surname.length > 30) {
            isValid = false;
            this.setState({authorError: "Author surname length should be 1 - 30"})
        } else if (!this.state.authorValue.name.match("^[a-zA-Zа-яёА-ЯЁ]+$")) {
            isValid = false;
            this.setState({authorError: "Input correct author name"})
        } else if (!this.state.authorValue.surname.match("^[a-zA-Zа-яёА-ЯЁ]+$")) {
            isValid = false;
            this.setState({authorError: "Input correct author surname"})
        }
        if (isValid) {
            if (this.state.authorsValues.length != 0) {
                let authorArray = this.state.authorsValues;
                authorArray.pop();
                this.setState({authorsValues: authorArray});
            }
            let authorArray = this.state.authorsValues;
            authorArray.push(this.state.authorValue);
            this.setState({authorsValues: authorArray});
        }
    }

    onTagDelete = (name) => {
        let tagArray = this.state.tagValues;
        for( let i = 0; i < tagArray.length; i++) { 
            if (tagArray[i].name === name) { 
                tagArray.splice(i, 1); 
            }
        }
        this.setState({tagValues: tagArray});
    }

    onAuthorDelete = () => {
        let authorArray = this.state.authorsValues;
        authorArray.pop();
        this.setState({authorsValues: authorArray});
    }

    onSubmit = (event) => {
        this.setState({titleError: "", shorttextError: "", fulltextError: "", tagError: "", authorError: ""});
        let isValid = true;
        if (this.state.title.length === 0 || this.state.title.length > 30) {
            isValid = false;
            this.setState({titleError: "Title length should be 1 - 30"});
        }
        if (this.state.shorttext.length === 0 || this.state.shorttext.length > 100) {
            isValid = false;
            this.setState({shorttextError: "ShortText length should be 1 - 100"});
        }
        if (this.state.fulltext.length === 0 || this.state.fulltext.length > 2000) {
            isValid = false;
            this.setState({fulltextError: "FullText length should be 1 - 2000"});
        }
        if (this.state.tagValues[0] === undefined) {
            isValid = false;
            this.setState({tagError: "Input tags"});
        }
        if (this.state.authorsValues[0] === undefined) {
            isValid = false;
            this.setState({authorError: "Input author"});
        }
        if (isValid === true) {
            if (this.state.idToUpdate === "") {
                NewsDataService.createNews(this.state.title, this.state.shorttext, this.state.fulltext, this.state.authorsValues[0], this.state.tagValues);
                this.setState({redirect: true});
            } else {
                NewsDataService.updateNews(this.state.title, this.state.shorttext, this.state.fulltext, this.state.authorsValues[0], this.state.tagValues, this.state.idToUpdate);
            }
        }
        event.preventDefault();
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={{
            pathname: '/'
          }} />
        }
    }

    onTagDropAdd = (event, data) => {
        let tagArray = this.state.tags;
        tagArray.push({id: 0, name: data.value});
        this.setState({tags: tagArray});
        this.setState({tagValue: {name: data.value}});
    }

    onAuthorDropAdd = (event, data) => {
        let name = data.value.split(' ')[0];
        let surname = data.value.split(' ')[1];
        let authorArray = this.state.authors;
        authorArray.push({id: 0, name: name, surname: surname});
        this.setState({authors: authorArray});
        this.setState({authorValues: {name: name, surname: surname}});
    }

  render() {
    return(
        <Fragment>
            <Header />
            <div className="content">
            {this.renderRedirect()}
                <div className="ui center aligned grid">
                    <div className="column addNewsForm">
                        <h2 className="ui header">
                            {this.state.idToUpdate === "" ? "Add news" : "Update news"}
                        </h2>
                        <form onSubmit={this.onSubmit} className="ui form">
                                    <div>
                                        <div className="field">
                                            <label>Title</label>
                                            <div className="ui left input">
                                                <input onChange={this.onTitleChange} value={this.state.title} type="text" name="title" placeholder="Title" />
                                            </div>
                                            {this.state.titleError !== "" ? 
                                                <div style={{height: "50px"}} class="ui negative message">
                                                    <div style={{float: "left"}} class="header">
                                                        {this.state.titleError}
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                        <div className="field">
                                            <label>Short Text</label>
                                            <div className="ui left input">
                                                <textarea onChange={this.onShorttextChange} value={this.state.shorttext} name="shorttext" placeholder="Short Text" />
                                            </div>
                                            {this.state.shorttextError !== "" ? 
                                                <div style={{height: "50px"}} class="ui negative message">
                                                    <div style={{float: "left"}} class="header">
                                                        {this.state.shorttextError}
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                        <div className="field">
                                            <label>Full Text</label>
                                            <div className="ui left input">
                                                <textarea onChange={this.onFulltextChange} value={this.state.fulltext} name="fulltext" placeholder="Full Text" />
                                            </div>
                                            {this.state.fulltextError !== "" ? 
                                                <div style={{height: "50px"}} class="ui negative message">
                                                    <div style={{float: "left"}} class="header">
                                                        {this.state.fulltextError}
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                        <div className="ui two column left floated grid">
                                            <div className="ui six wide column">
                                                <button type="button" onClick={this.onTagAdd} class="circular ui orange basic icon button">
                                                    <i class="icon plus"></i>
                                                </button>
                                            </div>
                                            <div className="ui six wide column">
                                                <Dropdown
                                                name="sss"
                                                placeholder="Tags"
                                                search
                                                selection
                                                allowAdditions
                                                onAddItem={this.onTagDropAdd}
                                                value={this.state.tagValue.name}
                                                onChange={this.onTagChange}
                                                options={this.state.tags.map(tag => {
                                                    return(
                                                        {key: tag.id, text: tag.name, value: tag.name}
                                                    );
                                                })} 
                                                />
                                            </div>
                                            <div className="ui six wide column">
                                                {this.state.tagValues.map(tag => {
                                                    return (
                                                        <div className="addedTagBlock">
                                                            <a onClick={() => this.onTagDelete(tag.name)} class="ui label">
                                                                    {tag.name} 
                                                                    <i aria-hidden="true" class="delete icon"></i>
                                                            </a>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {this.state.tagError !== "" ? 
                                                <div style={{height: "50px"}} class="ui negative message">
                                                    <div style={{float: "left"}} class="header">
                                                        {this.state.tagError}
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                        <div className="ui two column left floated grid">
                                            <div className="ui six wide column">
                                                <button type="button" onClick={this.onAuthorAdd} class="circular ui violet basic icon button">
                                                    <i class="icon plus"></i>
                                                </button>
                                            </div>
                                            <div className="ui six wide column">
                                                <Dropdown
                                                name="sss"
                                                placeholder="Authors"
                                                search
                                                selection
                                                allowAdditions
                                                onAddItem={this.onAuthorDropAdd}
                                                value={this.state.authorValue ? this.state.authorValue.name + " " + this.state.authorValue.surname : ""}
                                                onChange={this.onAuthorChange}
                                                options={this.state.authors.map(author => {
                                                    return(
                                                        {key: author.id, text: author.name + " " + author.surname, value: author.name + " " + author.surname}
                                                    );
                                                })} 
                                                />
                                            </div>
                                            <div className="ui six wide column">
                                                {this.state.authorsValues.map(author => {
                                                    return (
                                                        <div className="addedTagBlock">
                                                            <a onClick={() => this.onAuthorDelete(author.name)} class="ui label">
                                                                    {author.name + " " + author.surname}
                                                                    <i aria-hidden="true" class="delete icon"></i>
                                                            </a>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {this.state.authorError !== "" ? 
                                                <div style={{height: "50px"}} class="ui negative message">
                                                    <div style={{float: "left"}} class="header">
                                                        {this.state.authorError}
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                        <div style={{paddingTop: "10px"}} className="ui two column center aligned grid">
                                            <div class="ui buttons">
                                                <button type="submit" class="ui positive button"><i className="plus icon" />Add</button>
                                                <div class="or"></div>
                                                <button class="ui button"><i className="times icon" />Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
  }

}