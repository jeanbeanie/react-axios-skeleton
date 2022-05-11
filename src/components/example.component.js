import React, { useState, useEffect } from "react";
import ExampleDataService from "../services/example.service";
import {useParams, useNavigate} from 'react-router-dom';

function Example(){
  let {id} = useParams();
  let navigate = useNavigate();

  const defaultExample = {
    id,
    title: "",
    description: "",
  };

  const [currentExample, setCurrentExample] = useState(defaultExample);
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    getExample(id);
  }, []);


  const onChangeTitle = (e) => {
    const title = e.target.value;
    setCurrentExample({...currentExample, title});
  }

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentExample({...currentExample, description})
  }

  const getExample = (id) => {
    ExampleDataService.get(id)
      .then(response => {
        setCurrentExample(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const updatePublished = (status) => {
    var data = {
      id,
      title: currentExample.title,
      description: currentExample.description,
      published: status
    };
    ExampleDataService.update(id, data)
      .then(response => {
        setCurrentExample({...data})
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const updateExample = () => {
    ExampleDataService.update(id, currentExample)
      .then(response => {
        console.log(response.data);
        setMessage("The example was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  }

  const deleteExample = () => {    
    ExampleDataService.delete(id)
      .then(response => {
        console.log(response.data);
        navigate('../examples')
      })
      .catch(e => {
        console.log(e);
      });
  }
  
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
                  onChange={onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentExample.description}
                  onChange={onChangeDescription}
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
                onClick={() => updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )}
            <button
              className="badge badge-danger mr-2"
              onClick={deleteExample}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={updateExample}
            >
              Update
            </button>
            <p>{message}</p>
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

export default Example;
