import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';


const FormComponent = () => {
  const [formData, setFormData] = useState({
    emoplyeeId: '',
    destinationUrl: '',
    description: '',
    linkname:''

  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const { emoplyeeId, description, linkname } = formData;
    const errors = {};

    if (!emoplyeeId) {
      errors.emoplyeeId = 'Employee ID is required';
    } else if (!/^\d+$/.test(emoplyeeId)) {
      errors.emoplyeeId = 'Employee ID must be a number';
    } else if (emoplyeeId.length < 5 && emoplyeeId.length >= 10) {
      errors.emoplyeeId = 'Employee ID must be greater than 5 and less than 10 digits';
    }
    if(description.length > 40){
        errors.description = 'Description cannot be more than 40 characters'
    }
    if(linkname.length>10){
    errors.linkname = 'LinkName cannot be more than 10 characters';
    }
    return errors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
   axios.get('https://eighth-duality-422111-h3.df.r.appspot.com/Go/hello')
  .then(response => {
    // Handle success
    console.log("data fetched successfully........")
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

    console.log(formData);
    setFormData({
        emoplyeeId: '',
        destinationUrl: '',
        description: '',
        linkname:''
    });
  };

  return (
    <div className="form-container">
        <h1 id ="header">Create New Go Link</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="emoplyeeId">Employee Id:</label>
        <input
          type="text"
          id="emoplyeeId"
          name="emoplyeeId"
          value={formData.emoplyeeId}
          onChange={handleChange}
          required
        />
    {errors.emoplyeeId && <span className="error">{errors.emoplyeeId}</span>}
  
      <label htmlFor="destinationUrl">Destination URL:</label>
        <input
          type="text"
          id="destinationUrl"
          name="destinationUrl"
          value={formData.destinationUrl}
          onChange={handleChange}
          required
        />
          <div className="linkname-group">
            <div className="linkname-label">
              <button>GO/</button>
            </div>
            <div className="linkname-input">
              <input
                type="text"
                id="linkname"group
                name="linkname"
                value={formData.linkname}
                onChange={handleChange}
                required
              />
          </div>
          </div>
     {errors.linkname && <span className="error">{errors.linkname}</span>}
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
{errors.description && <span className="error">{errors.description}</span>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
