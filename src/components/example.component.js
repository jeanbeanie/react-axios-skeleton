import React, { Component } from "react";
import ExampleDataService from "../services/example.service";
export default class Example extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getExample = this.getExample.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateExample = this.updateExample.bind(this);
    this.deleteExample = this.deleteExample.bind(this);
    this.state = {
      currentExample: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }
  componentDidMount() {
    this.getExample(this.props.match.params.id);
  }
  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(function(prevState) {
      return {
        currentExample: {
          ...prevState.currentExample,
          title: title
        }
      };
    });
  }
  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentExample: {
        ...prevState.currentExample,
        description: description
      }
    }));
  }
  getExample(id) {
    ExampleDataService.get(id)
      .then(response => {
        this.setState({
          currentExample: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updatePublished(status) {
    var data = {
      id: this.state.currentExample.id,
      title: this.state.currentExample.title,
      description: this.state.currentExample.description,
      published: status
    };
    ExampleDataService.update(this.state.currentExample.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentExample: {
            ...prevState.currentExample,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updateExample() {
    ExampleDataService.update(
      this.state.currentExample.id,
      this.state.currentExample
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The example was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteExample() {    
    ExampleDataService.delete(this.state.currentExample.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/examples')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
const { currentExample } = this.state;
    return (
      <div>
        {currentExample ? (
          <div className="edit-form">
            <h4>Example</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentExample.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentExample.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentExample.published ? "Published" : "Pending"}
              </div>
            </form>
            {currentExample.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteExample}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateExample}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Example...</p>
          </div>
        )}
      </div>
    );
  }
}
