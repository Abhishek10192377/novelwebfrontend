import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Style/Pagestyle/Details.css';
const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBooks = async () => {
      try {
        const res = await axios.get(`https://novelwebbsckend.onrender.com/api/books/category/${id}`);
        const fetchedBooks = res.data.data;
        setBooks(fetchedBooks);

        if (fetchedBooks.length > 0 && fetchedBooks[0].category) {
          setCategoryName(fetchedBooks[0].category.title);
        } else {
          setCategoryName("Selected Category");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [id]);

  const addToFavorite = async (bookId) => {
    const token = Cookies.get("token");

    if (!token) {
      toast.warning("Please login to add favorites.");
      setTimeout(() => {
        navigate("/userlogin");
      }, 1500);
      return;
    }

    try {
      const res = await axios.post(
        "https://novelwebbsckend.onrender.com/api/Adduserfavroute",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data || "Book added to favourites!");
    } catch (error) {
      toast.error(error.response?.data || "Error adding to favourites.");
    }
  };

if (loading) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}


  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={1000} />
      <Link to="/books" className="btn btn-secondary mb-3">← Back to Categories</Link>
      <h2 className="text-center fw-bold mb-4">{categoryName} Books</h2>

      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {books.map((book) => (
          <div key={book._id} className="col">
            <div className="card h-100 text-center p-3 border-0 shadow-sm d-flex flex-column">
              <img
                src={book.image || "default-cover.jpg"}
                alt={book.title}
                className="card-img-top rounded"
                style={{
                  height: "330px",
                  width: "100%",
                }}
              />
              <div className="card-body px-0 d-flex flex-column justify-content-between">
                <div>
                  <h6 className="fw-bold mt-3">{book.title}</h6>
                  <p className="text-muted mb-2"><i className="fw-bold">By:</i> {book.author}</p>
                  <p className="text-muted mb-2">{book.details}</p>
                </div>
                <div className="mt-auto d-flex align-items-center justify-content-evenly gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => navigate(`/readpage/${book._id}`)}
                  >
                    Read Now
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => addToFavorite(book._id)}
                  >
                    <i className="bi bi-bookmark-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
