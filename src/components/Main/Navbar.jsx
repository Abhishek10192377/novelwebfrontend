import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Mainstyle/navbar.css";
import Cookies from 'js-cookie'
import { Modal, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
  const [showModal, setShowModal]= useState(false)
  const navigate = useNavigate();
  const auth = Cookies.get("email");

  useEffect(() => {
    const offcanvasElement = document.getElementById("offcanvasNavbar");
    const offcanvas = new bootstrap.Offcanvas(offcanvasElement);

    const closeHandler = () => offcanvas.hide();

    document.querySelectorAll(".nav-link, .btn-close").forEach((element) => {
      element.addEventListener("click", closeHandler);
    });

    return () => {
      document.querySelectorAll(".nav-link, .btn-close").forEach((element) => {
        element.removeEventListener("click", closeHandler);
      });
    };
  }, []);

  const handleLogout = () => {
    toast.success("Logout Successful")
    setTimeout(() => {
      Cookies.remove("token"); 
      Cookies.remove("email"); 
      navigate("/home"); 
      window.location.reload();
    }, 500);
  };

  return (
    <>
    <ToastContainer/>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/home">📖 NovelWeb</Link>

          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="custom-toggler-icon">☰</span>
          </button>

          <div
            className="offcanvas offcanvas-end custom-offcanvas"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">📖 NovelRead</h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>  
            <div className="offcanvas-body">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/books">Books</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/favorite">Favorite</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  {auth ? (
                    <button className="btn custom-btn" onClick={()=>setShowModal(true)}>Logout</button>
                  ) : (
                    <Link to="/userlogin" className="btn custom-btn">Login</Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        
        </div>
      </nav>
      <Modal 
          show={showModal}
          onHide={()=>setShowModal(false)}
          centered
          dialogClassName=""
          >
          <div
          className="container fw-bold text-center"
          style={{
            maxWidth:'300px',
            height:'200px',
            padding:'2rem',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center'
          }}
          >
          <h5 className="mb-4 text-danger">Are you sure you want to logout?</h5>
           <div className="d-flex justify-content-around">
            <Button variant="success" onClick={()=> setShowModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
           </div>
          </div>
        </Modal>
    </>
  );
};

export default Navbar;
