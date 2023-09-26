import React, { useState, useEffect } from 'react'
import './form.style.css'
export default function FormComponent(props) {
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    address:''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with data:', formData);
  };
  useEffect(() => {
    setFormData({
      latitude: props.Latitude,
      longitude:props.Longitude,
      address:props.address
    });
  }, [props]);
  return (
    <div className="Form-container">
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="latitude">Latitude:</label>
          <input type="text" id="latitude" name="latitude" placeholder="Latitude" value={formData.latitude}
            onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="longitude">Longitude:</label>
          <input type="text" id="longitude" name="longitude" placeholder="Longitude" value={formData.longitude}
            onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="longitude">Address:</label>
          <input type="text" id="address" name="address" placeholder="Address" value={formData.address}
            onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>


  )
}
