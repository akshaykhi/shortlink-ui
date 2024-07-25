import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';


const FormComponent = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
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
    const { employeeId, description, linkname } = formData;
    const errors = {};

    if (!employeeId) {
      errors.employeeId = 'Employee ID is required';
    } else if (!/^\d+$/.test(employeeId)) {
      errors.employeeId = 'Employee ID must be a number';
    } else if (employeeId.length < 5 && employeeId.length >= 10) {
      errors.employeeId = 'Employee ID must be greater than 5 and less than 10 digits';
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
    
  //  axios.get('https://eighth-duality-422111-h3.df.r.appspot.com/Go/hello')
  // .then(response => {
  //   // Handle success
  //   console.log("data fetched successfully........")
  //   console.log(response.data);
  // })
  // .catch(error => {
  //   console.error('Error fetching data:', error);
  // });

  axios.post('https://eighth-duality-422111-h3.df.r.appspot.com/go/create', {
    employeeId : formData.employeeId,
    destinationUrl: formData.destinationUrl,
    shortLink : formData.linkname,
    description: formData.description
  })
    .then(response => {
      // Handle success
      console.log("Data posted successfully........");
      console.log(response.data);
    })
    .catch(error => {
      // Handle error
      console.error('Error posting data:', error);
    });



    console.log(formData);
    setFormData({
        employeeId: '',
        destinationUrl: '',
        description: '',
        linkname:''
    });
  };

  return (
    <div className="form-container">
        <h1 id ="header">Create New Go Link</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="employeeId">Employee Id:</label>
        <input
          type="text"
          id="employeeId"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
        />
    {errors.employeeId && <span className="error">{errors.employeeId}</span>}
  
      <label htmlFor="destinationUrl">Destination URL:</label>
        <input
          type="text"
          id="destinationUrl"
          name="destinationUrl"
          value={formData.destinationUrl}
          onChange={handleChange}
          required
        />
          <div className="form-group">
          <label htmlFor="linkname">Link Name</label>
          <input
            type="text"
            id="linkname"
            name="linkname"
            value={formData.linkname}
            onChange={handleChange}
            required
            pattern="go/.*"
            placeholder="go/"
          />
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
