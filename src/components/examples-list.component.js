import React, {useState, useEffect} from 'react';
import ExampleDataService from "../services/example.service";
import { Link } from "react-router-dom";

function ExamplesList(){
  const [searchTitle, setSearchTitle] = useState("");
  const [examples, setExamples] = useState([]);
  const [currentExample, setCurrentExample] = useState(null);
  const [currentIndex, setCurrentIndex] = useState("");

  useEffect(() => {
    retrieveExamples();
  }, []);

  const retrieveExamples = () => {
    ExampleDataService.getAll()
      .then(response => {
        setExamples(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  const handleChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  }

  const handleSearchTitleSubmit = (e) => {
    setCurrentExample(null);
    ExampleDataService.findByTitle(searchTitle)
      .then(response => {
        setExamples(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveExample = (example, index) => {
    setCurrentExample(example);
    setCurrentIndex(index);
  };

  const removeAllExamples = () => {
    ExampleDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    setCurrentExample(null);
    setCurrentIndex(-1);
  };
    
  return (
      <div className="list row">
        <div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for example OBJ by title"
              value={searchTitle}
              onChange={handleChangeSearchTitle}
            />
            <div>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleSearchTitleSubmit}
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
                  onClick={() => setActiveExample(example, index)}
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
            onClick={removeAllExamples}
          >
            Remove All Example OBJS
          </button>
      </div>
    );
};  

export default ExamplesList;
