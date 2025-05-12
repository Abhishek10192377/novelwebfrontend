import React, { useEffect, useState } from 'react';
import Crousle from '../Main/Crousle';
import '../Style/Pagestyle/Home.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from 'js-cookie';
import { Modal, Button } from 'react-bootstrap';
const Home = () => {
    const [readCategory, setReadCategory] = useState([]);
    const [popularbook, setPopularbook] = useState([]);
    const [shownewbook, setShownewbook] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleShowModal = (category) => {
        setSelectedCategory(category);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCategory(null);
    };

    const fetchCategory = async () => {
        try {
            const response = await axios.get("https://novelwebbsckend.onrender.com/api/read_category");
            setReadCategory(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchPopularBook = async () => {
        try {
            const response = await axios.get("https://novelwebbsckend.onrender.com/api/books/popular");
            setPopularbook(response.data.data);
        } catch (error) {
            console.error("Error fetching popular books:", error);
        }
    };

    const fetchLatestBook = async () => {
        try {
            const response = await axios.get("https://novelwebbsckend.onrender.com/api/books/shownewBook");
            setShownewbook(response.data.data);
        } catch (error) {
            console.error("Error fetching new books:", error);
        }
    };

    useEffect(() => {
        fetchCategory();
        fetchPopularBook();
        fetchLatestBook();
        window.scrollTo(0, 0);
    }, []);
    

    useEffect(() => {
        const token = Cookies.get("token");

        if (token) {
            axios.get("https://novelwebbsckend.onrender.com/api/protected", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setData(response.data);
                })
                .catch(err => {
                    setError('Error fetching protected data: ' + err.message);
                });
        } else {
            setError('Please log in then you can read books');
        }

        fetchCategory();
        window.scrollTo(0, 0);

    }, [navigate]);


    const horizontalSliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 3 } },
            { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 320, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <>
            <Crousle />
            {error && <div className="alert alert-danger text-center">{error}</div>}
            {data && <div className="alert alert-success text-center">Welcome, {data.user?.name || "User"}!</div>}

            <div className="hero-section text-center p-5 bg-light">
                <h1 className="display-1 fw-bold">Welcome to NovelWeb</h1>
                <p className="lead">Read amazing stories. Dive into a world of creativity!</p>
            </div>

            {/* Popular Novels */}
            <div className="container mt-4">
                <h2 className="mb-4">🔥 Popular Novels</h2>
                <Slider {...horizontalSliderSettings}>
                    {popularbook.map((book) => (
                        <div key={book._id}>
                            <div className="card d-flex flex-column h-100 position-relative">
                                {book.isPopular && (
                                    <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">⭐ Popular</span>
                                )}
                                {book.image && (
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="card-img-top"
                                        style={{ height: '400px', width: '100%', }}
                                    />
                                )}
                                <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: '130px' }}>
                                    <h5 className="card-title fw-bold">{book.title}</h5>
                                    <div className="mt-auto">
                                        <button
                                            className="btn btn-success btn-sm mt-2"
                                            onClick={() => navigate(`/readpage/${book._id}`)}
                                        >
                                            Read Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* New Arrivals */}
            <div className="container mt-5">
                <h2 className="mb-4">📚 New Arrivals</h2>
                <Slider {...horizontalSliderSettings}>
                    {shownewbook.map((book) => (
                        <div key={book._id}>
                            <div className="card d-flex flex-column h-100 position-relative">
                                {book && (
                                    <span className="badge bg-primary position-absolute top-0 start-0 m-2">🆕 New</span>
                                )}
                                {book.image && (
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="card-img-top"
                                        style={{ height: '400px', width: '100%', }}
                                    />
                                )}
                                <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: '130px' }}>
                                    <h5 className="card-title fw-bold">{book.title}</h5>
                                    <div className="mt-auto">
                                        <button
                                            className="btn btn-success btn-sm mt-2"
                                            onClick={() => navigate(`/readpage/${book._id}`)}
                                        >
                                            Read Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Categories */}
            <div className="container my-5">
                <h2 className="mb-4  fw-bold display-6 fancy-title">🧾 Books Categories</h2>
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
                                                height: 'auto',
                                                maxHeight: '60vh',
                                                width: '100%',
                                                borderRadius: '8px',
                                                margin: '0 auto',
                                                display: 'block',
                                                border: '5px solid black',
                                                objectFit: 'cover',
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

export default Home;
