import React, { Fragment } from 'react';
import AuthorDataService from '../services/authorService';
import '../css/addAuthors.css';
import Header from '../components/header';

export default class AddAuthors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            authorToAdd: "",
            disabled: "disabled",
            updatingAuthor: {}
        }
    }

    componentDidMount() {
        this.refreshAuthors();
    }

    refreshAuthors() {
        AuthorDataService.retrieveAllAuthors().then(
          response => {
            let authorArray = [];
            response.data.map(author => {
                authorArray.push({id: author.id, name: author.name, surname: author.surname, disabled: true});
            })
            this.setState({ authors: authorArray });
          }
        )
    }

    handleAddInputChange = (event) => {
        this.setState({authorToAdd: event.target.value});
    }

    handleAddAuthor = () => {
        let author = this.state.authorToAdd;
        let name = author.split(' ')[0];
        let surname = author.split(' ')[1];
        AuthorDataService.addAuthor(name, surname).then(
            () => {
                this.refreshAuthors();
            }
        );
    }

    handleDelete = (id) => {
        AuthorDataService.deleteAuthorById(id).then(
            () => {
                this.refreshAuthors();
            }
        );
    }

    handleEdit = (id) => {
        let authorArray = this.state.authors;
        let name;
        let surname;
        for( let i = 0; i < authorArray.length; i++) { 
            if (authorArray[i].disabled === false) { 
                this.handleDiscard(authorArray[i].id);
                authorArray[i] = {id: authorArray[i].id, name: authorArray[i].name, surname: authorArray[i].surname, disabled: true};
            }
        }
        for( let i = 0; i < authorArray.length; i++) { 
            if (authorArray[i].id === id) { 
                name = authorArray[i].name;
                surname = authorArray[i].surname;
                authorArray[i] = {id: authorArray[i].id, name: authorArray[i].name, surname: authorArray[i].surname, disabled: false};
            }
        }
        this.setState({authors: authorArray, updatingAuthor: {name: name, surname: surname}});
    }

    handleDiscard = (id) => {
        let authorArray = this.state.authors;
        for( let i = 0; i < authorArray.length; i++) { 
            if (authorArray[i].id === id) { 
                authorArray[i] = {id: authorArray[i].id, name: this.state.updatingAuthor.name, surname: this.state.updatingAuthor.surname, disabled: true};
            }
        }
        this.setState({authors: authorArray});
    }

    handleEditInputChange = (event) => {
        let author = event.target.value;
        let name = author.split(' ')[0];
        let surname = author.split(' ')[1];
        let authorArray = this.state.authors;
        for( let i = 0; i < authorArray.length; i++) { 
            if (authorArray[i].disabled === false) { 
                authorArray[i] = {id: authorArray[i].id, name: name, surname: surname, disabled: false};
            }
        }
        this.setState({authors: authorArray});
    }

    handleSave = (id, name, surname) => {
        AuthorDataService.updateAuthor(id, name, surname).then(
          () => {
              this.refreshAuthors();
          }  
        );
    }

    render() {
        return(
            <Fragment>
                <Header />
                <div className="content">
                    <h2 className="ui header">Add/Edit Authors</h2>
                    <div className="tags">
                        {
                            this.state.authors.map(author => {
                                return (
                                    <div className="ui stackable center aligned grid">
                                        <div className="six wide column">
                                            <div className="ui grid">
                                                <div className="right aligned middle aligned four wide column">
                                                    <div className="ui label">
                                                        Author
                                                    </div>
                                                </div>
                                                <div className="middle aligned six wide column">
                                                    <div className="ui fluid input">
                                                        <input onChange={this.handleEditInputChange} value={author.name + ' ' + author.surname} disabled={author.disabled} type="text" />
                                                    </div>
                                                </div>
                                                <div className="right aligned middle aligned six wide column">
                                                    <div className="ui grid">
                                                        <div style={{display: "flex"}} className="sixteen wide column">
                                                            {author.disabled ?
                                                                <Fragment>
                                                                    <button onClick={() => this.handleEdit(author.id)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny violet basic button">Edit</button>
                                                                    <button  onClick={() => this.handleDelete(author.id)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny red basic button">Delete</button>
                                                                </Fragment>
                                                                :
                                                                <Fragment>
                                                                    <button onClick={() => this.handleSave(author.id, author.name, author.surname)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny violet basic button">Save</button>
                                                                    <button onClick={() => this.handleDiscard(author.id)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny red basic button">Discard</button>
                                                                </Fragment>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                            <div style={{marginTop: "100px"}} className="ui stackable center aligned grid">
                                <div className="seven wide column">
                                    <form onSubmit={this.handleAddAuthor} className="ui form">
                                        <div className="ui grid">
                                            <div className="right aligned middle aligned four wide column">
                                                <div style={{width: "90px"}} className="ui label">
                                                    Add Author
                                                </div>
                                            </div>
                                            <div className="middle aligned eight wide column">
                                                <div className="ui fluid input">
                                                    <input onChange={this.handleAddInputChange} value={this.state.title}  type="text" placeholder="Input author" />
                                                </div>
                                            </div>
                                            <div className="right aligned middle aligned four wide column">
                                                    <div className="ui grid">
                                                        <div style={{display: "flex"}} className="sixteen wide column">
                                                            <button style={{width: "80px"}} type="submit" className="tagsButton ui tiny green basic button">Add</button>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                </div>
                {/* <div className="addTagsContent">
                    <h1>Add/Edit Authors</h1>
                    <div>
                        {this.state.authors.map(author => {
                            return(
                                <div id="authorDiv">
                                    <label id="tagLabel">Author:</label>
                                    <input onChange={this.handleEditInputChange} id="tagInput" type="text" value={author.name + ' ' + author.surname} disabled={author.disabled} />
                                    {author.disabled ? 
                                    <div>
                                        <button onClick={() => this.handleEdit(author.id)} id="editTag" type="button">Edit</button>
                                        <button onClick={() => this.handleDelete(author.id)} id="discardTag" type="button">Delete</button>
                                    </div> :
                                    <div>
                                        <button onClick={() => this.handleSave(author.id, author.name, author.surname)} id="editTag" type="button">Save</button>
                                        <button onClick={() => this.handleDiscard(author.id)} id="discardTag" type="button">Discard</button>
                                    </div>}
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <div id="addtagDiv">
                            <form onSubmit={this.handleAddAuthor}>
                                <label id="tagLabel">Add Author:</label>
                                <input onChange={this.handleAddInputChange} id="addtagInput" type="text" value={this.state.title} />
                                <button id="editTag"  type="submit">Add</button>
                            </form>
                        </div>
                    </div>
                </div> */}
            </Fragment>
        );
    }
}