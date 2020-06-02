import React, { Fragment } from 'react';
import '../css/addTags.css';
import TagDataService from '../services/tagService';
import Header from '../components/header';

export default class AddTags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            tagToAdd: "",
            disabled: "disabled",
            updatingTagName: ""
        }
    }

    componentDidMount() {
        this.refreshTags();
    }

    refreshTags() {
        TagDataService.retrieveAllTags().then(
          response => {
            let tagArray = [];
            response.data.map(tag => {
                tagArray.push({id: tag.id, name: tag.name, disabled: true});
            })
            this.setState({ tags: tagArray });
          }
        )
    }

    handleAddInputChange = (event) => {
        this.setState({tagToAdd: event.target.value});
    }

    handleEditInputChange = (event) => {
        let tagArray = this.state.tags;
        for( let i = 0; i < tagArray.length; i++) { 
            if (tagArray[i].disabled === false) { 
                tagArray[i] = {id: tagArray[i].id, name: event.target.value, disabled: false};
            }
        }
        this.setState({tags: tagArray});
    }

    handleAddTag = () => {
        TagDataService.addTag(this.state.tagToAdd).then(
            () => {
                this.refreshTags();
            }
        );
    }

    handleEdit = (name) => {
        let tagArray = this.state.tags;
        for( let i = 0; i < tagArray.length; i++) { 
            if (tagArray[i].disabled === false) { 
                this.handleDiscard(tagArray[i].name);
                tagArray[i] = {id: tagArray[i].id, name: tagArray[i].name, disabled: true};
            }
        }
        for( let i = 0; i < tagArray.length; i++) { 
            if (tagArray[i].name === name) { 
                tagArray[i] = {id: tagArray[i].id, name: name, disabled: false};
            }
        }
        this.setState({tags: tagArray, updatingTagName: name});
    }

    handleDiscard = (name) => {
        let tagArray = this.state.tags;
        for( let i = 0; i < tagArray.length; i++) { 
            if (tagArray[i].name === name) { 
                tagArray[i] = {id: tagArray[i].id, name: this.state.updatingTagName, disabled: true};
            }
        }
        this.setState({tags: tagArray});
    }

    handleSave = (id, name) => {
        TagDataService.updateTag(id, name).then(
          () => {
              this.refreshTags();
          }  
        );
    }

    handleDelete = (id) => {
        TagDataService.deleteTagById(id).then(
            () => {
                this.refreshTags();
            }
        );
    }

    render() {
        return(
            <Fragment>
                <Header />
                <div className="content">
                    <h2 className="ui header">Add/Edit Tags</h2>
                    <div className="tags">
                        {
                            this.state.tags.map(tag => {
                                return (
                                    <div className="ui stackable center aligned grid">
                                        <div className="six wide column">
                                            <div className="ui grid">
                                                <div className="right aligned middle aligned four wide column">
                                                    <div className="ui label">
                                                        Tag
                                                    </div>
                                                </div>
                                                <div className="middle aligned six wide column">
                                                    <div className="ui fluid input">
                                                        <input onChange={this.handleEditInputChange} value={tag.name} disabled={tag.disabled} type="text" />
                                                    </div>
                                                </div>
                                                <div className="right aligned middle aligned six wide column">
                                                    <div className="ui grid">
                                                        <div style={{display: "flex"}} className="sixteen wide column">
                                                            {tag.disabled ?
                                                                <Fragment>
                                                                    <button onClick={() => this.handleEdit(tag.name)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny violet basic button">Edit</button>
                                                                    <button onClick={() => this.handleDelete(tag.id)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny red basic button">Delete</button>
                                                                </Fragment>
                                                                :
                                                                <Fragment>
                                                                    <button onClick={() => this.handleSave(tag.id, tag.name)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny violet basic button">Save</button>
                                                                    <button onClick={() => this.handleDiscard(tag.name)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny red basic button">Discard</button>
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
                                    <form onSubmit={this.handleAddTag} className="ui form">
                                        <div className="ui grid">
                                            <div className="right aligned middle aligned four wide column">
                                                <div style={{width: "70px"}} className="ui label">
                                                    Add Tag
                                                </div>
                                            </div>
                                            <div className="middle aligned eight wide column">
                                                <div className="ui fluid input">
                                                    <input onChange={this.handleAddInputChange} value={this.state.tagToAdd}  type="text" placeholder="Input tag" />
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
            </Fragment>
        );
    }

}