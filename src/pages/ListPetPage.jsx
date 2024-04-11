import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';

const PetsList = () => {
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [order, setOrder] = useState('cat_name');
  const [formData, setFormData] = useState({
    keyword: '',
    breed: 'All',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

    const fetchPets = async (page) => {
        setIsLoading(true);
        let queryParams = `page=${currentPage}`;

        if (formData.keyword !== '' && formData.keyword) {
            queryParams += `&cat_name=${formData.keyword}`;
        }
        if (formData.breed !== '' && formData.breed) {
            if (formData.breed !== 'All') {
                queryParams += `&breed=${formData.breed}`;
            }
        }
        queryParams += `&sort_by=${order}`;

        const response = await fetch(`http://127.0.0.1:8000/mint/list_my_cats/?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            },
        });
        if (response) {
            const data = await response.json();
            setPets(data.results);
            setTotalPages(Math.ceil(data.count / 5)); // Assuming count is in response
        }
        setIsLoading(false);
    };

  useEffect(() => {
    fetchPets(currentPage);
  }, [currentPage]);



const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const breeds = [
    'All',
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

  return (
    <div>
        <div style={{ display: 'flex', gap: '0.5rem'}}>
            <div style={{ marginRight: '20px'}}>
                <input type="text" id="keyword" 
                    name="keyword"
                    value={formData.keyword}
                    placeholder="Enter keyword..." 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <select id="breed" 
                    onChange={handleChange}
                    name="breed"
                    value={formData.breed}
                >
                    {breeds.map((breed, index) => (
                        <option key={index} value={breed}>{breed}</option>
                    ))}
                </select>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem'}}>
                <button onClick={() => fetchPets(currentPage)}>Filter</button>
                <button onClick={() => {
                    if (order === 'cat_name') {
                        setOrder("-cat_name");
                    } else {
                        setOrder("cat_name");
                    }
                    fetchPets(currentPage)
                }}>{`Sort by Cat Name`}</button>
            </div>
        </div>
      <h2>Pets List</h2>
      {!isLoading ? <div className="pet-container">
        {pets?.map((pet) => (
            <PetCard pet={pet} fetchPets={() => fetchPets(currentPage)}/>
        ))}
      </div> : 'Loading...'}
      {/* Pagination buttons (replace with your preferred UI components) */}
      {totalPages > 1 && (
        <div className="pagination-container">
            <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
            >
            Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
            <button
                key={index + 1}
                onClick={() => handlePagination(index + 1)}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
                {index + 1}
            </button>
            ))}
            <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
            >
            Next
            </button>
        </div>
      )}
    </div>
  );
};

export default PetsList;
