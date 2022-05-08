import React, { Component } from "react";
import ExampleDataService from "../services/example.service";
import { Link } from "react-router-dom";

export default class ExamplesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveExamples = this.retrieveExamples.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveExample = this.setActiveExample.bind(this);
    this.removeAllExamples = this.removeAllExamples.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.state = {
      examples: [],
      currentExample: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }
  componentDidMount() {
    this.retrieveExamples();
  }
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }
  retrieveExamples() {
    ExampleDataService.getAll()
      .then(response => {
        this.setState({
          examples: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveExamples();
    this.setState({
      currentExample: null,
      currentIndex: -1
    });
  }
  setActiveExample(example, index) {
    this.setState({
      currentExample: example,
      currentIndex: index
    });
  }
  removeAllExamples() {
    ExampleDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchTitle() {
    ExampleDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          examples: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchTitle, examples, currentExample, currentIndex } = this.state;
    return (
      <div className="list row">
        <div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for example OBJ by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div>
          <h4>List of Example OBJS</h4>
          <ul className="list-group">
            {examples &&
              examples.map((example, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveExample(example, index)}
                  key={index}
                >
                  {example.title}
                </li>
              ))}
          </ul>
        </div>
        <div>
          {currentExample ? (
            <div>
              <h4>Example OBJ Details</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentExample.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentExample.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentExample.published ? "Published" : "Pending"}
              </div>
              <Link
                to={"/examples/" + currentExample.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Example...</p>
            </div>
          )}
        </div>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllExamples}
          >
            Remove All Example OBJS
          </button>
      </div>
    );
  }
}
