import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const PetCreation = () => {
  const [formData, setFormData] = useState({
    cat_name: '',
    breed: '',
    description: '',
    image_url: ''
  });
  const [created, setCreated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const breeds = [
    'Domestic Cat',
    'Shorthair',
    'Longhair',
    'Siamese',
    'Bengal',
    'Sphinx',
    'Burmese',
    'Ragdoll',
    'Persian',
    'Maine Coon',
    'British Shorthair',
    'Scottish Fold',
    'Exotic Shorthair',
    'Himalayan',
    'Birman',
    'Devon Rex',
    'Sphynx'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/mint/register_cat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Reset form after successful creation
        setFormData({
          cat_name: '',
          breed: '',
          description: '',
          image_url: ''
        });
        const mintCat = async () => {
          const response = await fetch('http://localhost:3000/api/mint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          console.log(response);
        }
        mintCat();
        navigate('/list-pets');
        setCreated(true);
      }
    } catch (error) {
      console.error('Pet creation failed:', error);
      setError('Pet creation failed');
    }
  };

  if (created) {
    return (
      <div>
        <p>Pet creation successful!</p>
      </div>
    );
  } else {
    return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ width: '400px', margin: '0 auto', textAlign: 'left' }}>
      <h2>Cat Registration</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="cat_name">Cat Name:</label>
        <input
          type="text"
          id="cat_name"
          name="cat_name"
          value={formData.cat_name}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="breed">Breed:</label>
        <select
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          style={{ padding: '1rem 0.5rem', width: '100%' }}
        >
          <option value="">Select a breed</option>
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>{breed}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="image_url">Image URL:</label>
        <input
          type="text"
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
        />
      </div>
      <button type="submit" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Create a cat</button>
    </form>

    );
  }
};

export default PetCreation;
