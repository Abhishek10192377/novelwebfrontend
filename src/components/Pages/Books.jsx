import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Books = () => {
  const [readCategory, setReadCategory] = useState([]);
  const [totalReader, setTotalReader] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategory = async () => {
    try {
      const response = await axios.get("https://novelwebbsckend.onrender.com/api/read_category");
      setReadCategory(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = async (id) => {
    try {
      const response = await axios.get(`https://novelwebbsckend.onrender.com/api/category_reader/${id}`);
      setTotalReader(response.data.data);
    } catch (error) {
      console.error("Error incrementing category views:", error);
    }
  };

  // Handle the button click to open the modal with category details
  const handleShowModal = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    fetchCategory();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="hero text-center text-white  py-4" style={{background:"black"}}>
        <h1 className="display-5 fw-bold mb-2" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
          📚 Book Categories
        </h1>
        <p className="lead" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)' }}>
          Explore different categories and find your next great read.
        </p>
      </div>

      <div className="container border p-5 shadow-lg">
  <div className="row g-4">
    {readCategory.map((category) => (
      <div key={category._id} className="col-sm-12 col-md-6 col-lg-4 text-center">
        <Link
          to={`/category/${category._id}`}
          onClick={() => handleCategoryClick(category._id)}
          style={{ textDecoration: 'none' }}
        >
          {category.image && (
            <img
              src={category.image}
              alt={category.title}
              className="img-fluid"
              style={{
                height: '400px',
                width: '80%',
                borderRadius: '8px',
                margin: '0 auto',
                display: 'block',
                border:'5px solid black'
              }}
            />
          )}
        </Link>

       
        <div className="mt-3">
          <h5
            className="fw-bold mb-3"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' }}
          >
            {category.title}
          </h5>

          <button
            className="btn btn-gradient btn-sm px-4 py-2"
            onClick={() => handleShowModal(category)}
            style={{
              background: 'linear-gradient(135deg, #007bff, #6610f2)',
              border: '1px solid black',
              borderRadius: '25px',
              color: 'white',
              fontWeight: '500',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = 'linear-gradient(135deg, #0056b3, #520dc2)')
            }
            onMouseLeave={(e) =>
              (e.target.style.background = 'linear-gradient(135deg, #007bff, #6610f2)')
            }
          >
            View Details
          </button>
        </div>

      </div>
    ))}
  </div>
</div>





      {/* Modal for Category Details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
            {selectedCategory?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
          }}
        >
          {selectedCategory?.image && (
            <img
              src={selectedCategory.image}
              alt={selectedCategory.title}
              style={{
                width: '80%',
                maxWidth: '200px',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '1.5rem',
              }}
            />
          )}
          <p
            style={{
              fontSize: '1.1rem',
              color: '#555',
              lineHeight: '1.6',
              marginBottom: '2rem',
              maxWidth: '80%',
              textAlign: 'center',
            }}
          >
            {selectedCategory?.category_description}
          </p>
        </Modal.Body>
        <Modal.Footer
          style={{
            justifyContent: 'center',
            backgroundColor: '#f9f9f9',
            borderTop: '1px solid #ddd',
            padding: '1rem 2rem',
          }}
        >
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Books;
