import React from "react";
import "../Style/Mainstyle/footer.css"; // Import CSS file
import { Link ,useNavigate } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="custom-footer mt-5">
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>We provide high-quality web development solutions to enhance your online presence.</p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
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
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: abhisheksahni0077@gamil.com</p>
            <p>Phone: +91 62845 72866</p>

            {/* Social Media Icons */}
            <div className="social-icons">
              <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>

        <hr />

        {/* Footer Copyright */}
        <div className="text-center">
          <p className="mb-0">&copy; 2025 NovelRead. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
