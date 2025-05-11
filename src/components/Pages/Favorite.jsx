import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal, Button, Spinner } from 'react-bootstrap';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchFavorite = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/userlogin");
      return;
    }

    try {
      const res = await axios.get("https://novelwebbsckend.onrender.com/api/userfavrouteshow", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(res.data.favouriteBooks || []);
    } catch (error) {
      console.log(error.response?.data || "Error cannot show favourites.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (_id) => {
    setDeleteId(_id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    const token = Cookies.get("token");
    setShowModal(false);

    try {
      const res = await axios.delete("https://novelwebbsckend.onrender.com/api/userfavrouteremove", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { bookId: deleteId }
      });

      setFavorites((prev) => prev.filter((book) => book._id !== deleteId));
    } catch (error) {
      alert(error.response?.data || "Error removing favorite.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFavorite();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-center mb-4">Your Favorite Books</h2>

      {loading ? (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    <Spinner animation="border" variant="primary" />
  </div>
) : favorites.length === 0 ? (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    <p className="text-center text-muted fs-5">No favorite books found.</p>
  </div>
) : (
  <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
    {favorites.map((book) => (
      <div key={book._id} className="col">
        <div className="card h-100 text-center p-3 border-0 shadow-sm px-0 d-flex flex-column flex-grow-1">
          <img
            src={book.image || "default-cover.jpg"}
            alt={book.title}
            className="card-img-top rounded"
            style={{ height: "240px", objectFit: "cover" }}
          />
          <div className="card-body px-0">
            <h6 className="fw-bold mt-3">{book.title}</h6>
            <p className="text-muted mb-2"><i className="fw-bold">By:</i> {book.author}</p>
            <p className="text-muted mb-2">{book.details}</p>
            <div className="d-flex justify-content-center  mt-2">
              <button
                className="btn btn-success btn-sm"
                onClick={() => navigate(`/readpage/${book._id}`)}
              >
                Read Now
              </button>
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => confirmDelete(book._id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

      {/* Confirmation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName=""
      >
        <div
          className="container fw-bold text-center"
          style={{
            maxWidth: '300px',
            height: '200px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
         <h5 className="mb-4 text-danger">Are you sure you want to remove this book?</h5>
          <div className="d-flex justify-content-around">
            <Button variant="success" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirmed}>
              Remove
            </Button>
          </div>
        </div>
      </Modal>


    </div>
  );
};

export default Favorite;
