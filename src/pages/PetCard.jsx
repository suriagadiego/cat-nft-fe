// PetCard.jsx
import React, { useState } from 'react';

const PetCard = ({ pet, fetchPets }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [editedPet, setEditedPet] = useState({ ...pet });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPet({ ...editedPet, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here
    setIsLoading(true);
    const response = await fetch(`http://127.0.0.1:8000/mint/update/${pet.uuid}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        },
        body: JSON.stringify(editedPet),
    });
    setIsLoading(false);
    if (response) {
        fetchPets();
    }
    setIsEditable(false); // Disable edit mode after submitting the form
  };

  return (
    <div className="pet-card" key={pet.id}>
        <div style={{ textAlign: 'right' }}>
          <button onClick={() => setIsEditable(!isEditable)}>{isEditable ? 'Cancel' : 'Edit'}</button>
        </div>
        {!isEditable ? (
          <>
            {pet.image_url && (
              <img className="pet-image" src={pet.image_url} alt={pet.cat_name} width={200} height={200} />
            )}
            <h3 className="pet-name">{pet.cat_name}</h3>
            <p className="pet-info">Breed: {pet.breed}</p>
            <p className="pet-info">{pet.description}</p>
          </>
        ) : (
            <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="cat_name">Name:</label>
              <input
                type="text"
                id="cat_name"
                name="cat_name"
                value={editedPet.cat_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="breed">Breed:</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={editedPet.breed}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={editedPet.description}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</button>
          </form>
        )}
      </div>
  );
};

export default PetCard;
