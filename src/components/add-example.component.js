import React, {useState} from 'react';
import ExampleDataService from "../services/example.service";

function AddExample(){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
 
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const saveExample = () => {
    const data = { title, description};
    ExampleDataService.create(data)
      .then(response => {
        setSubmitted(true); 
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const clearExample = () => {
    setTitle("");
    setDescription("");
    setSubmitted(false);
  };

  return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={clearExample}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Example OBJ Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={handleChangeTitle}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Example OBJ Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={handleChangeDescription}
                name="description"
              />
            </div>
            <button onClick={saveExample} className="btn btn-success">
              Submit New Example OBJ
            </button>
          </div>
        )}
      </div>

  );

}

export default AddExample;
