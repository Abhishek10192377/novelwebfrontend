import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import myimage from '../../assets/profile.jpg'
const About = () => {
  const [loading, setLoading] = useState(false)
  const [readTestimonial, setreadTestimonial] = useState([])
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Retrieve token from cookies
    const token = Cookies.get('token');
    if (!token) {
      toast.error("You Need to log in first");
      setLoading(false);
      return;
    }

    // Retrieve form data
    const message = event.target.message.value;
    const file = event.target.image.files[0];

    // Check if file and message are provided
    if (!file) {
      toast.error("Profile Photo Is required");
      setLoading(false);
      return;
    }
    if (!message) {
      toast.error("Write Comment");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('message', message);
    formData.append('file', file);

    try {
      const response = await axios.post("https://novelwebbsckend.onrender.com/api/usercomment", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success("Comment added successfully!");
      console.log("Inserted:", response.data);
      event.target.reset(); // Reset form after submission
    } catch (error) {
      console.error("Error inserting data:", error);
      toast.error("Error inserting data");
    } finally {
      setLoading(false)
    }
  };

  /////  show data in testimonial/////////
  const fetchuserdata = async () => {
    try {
      const response = await axios.get(" https://novelwebbsckend.onrender.com/api/userdatashow")
      setreadTestimonial(response.data.userdata)
      console.log(response.data.userdata);

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
    fetchuserdata()
  }, []);



  return (
    <div>
      {/* Hero Section with Parallax Effect */}
      <ToastContainer autoClose={1000} />
      <div
        className="hero text-center text-white py-5"
        style={{
          background: "black",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div >
          <h1 className="display-3 fw-bold animate__animated animate__fadeIn">Welcome to NovelWeb</h1>
          <p className="lead animate__animated animate__fadeIn animate__delay-1s">
            Your ultimate destination for novel enthusiasts
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <img
              src={myimage}
              className="img-fluid rounded-circle shadow-lg"
              alt="About NovelRead"
              style={{ maxHeight: "400px", objectFit: "cover", width: "400px" }}
            />
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold mb-3 text-dark">About NovelWeb</h2>
            <p className="text-muted">
              NovelWeb is an innovative platform designed to connect readers with a vast collection of novels across various genres. Whether you love mystery, romance, or sci-fi, we have something for everyone.
            </p>
            <p className="text-muted">
              Our mission is to cultivate a love for reading by offering a user-friendly, engaging platform for book lovers worldwide. With a well-curated collection, we bring literature closer to you.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className=" text-white py-5"  style={{background:"black"}}>
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Why Choose NovelWeb?</h2>
          <div className="row g-4">
            {[{
              icon: "📚", title: "Wide Collection", text: "Thousands of novels across all genres at your fingertips."
            }, {
              icon: "🔎", title: "Easy Search", text: "Find your next favorite book with our smart search system."
            }, {
              icon: "💡", title: "Personalized Experience", text: "Customized recommendations based on your reading history."
            }].map((feature, index) => (
              <div key={index} className="col-md-4">
                <div
                  className="feature p-4 rounded-3 bg-secondary bg-opacity-25 shadow-lg text-center"
                  style={{ transition: "transform 0.3s", cursor: "default" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <div className="fs-1 mb-3">{feature.icon}</div>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">What Our Readers Say</h2>
          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {readTestimonial
                .filter(user => Array.isArray(user.comments) && user.comments.length > 0)
                .map((testimonial, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                    <div className="container p-4 rounded-3 bg-white shadow-sm mx-auto text-center" style={{ width: "90%" }}>
                      {testimonial.comments.map((comment, i) => (
                        <div key={i} className="d-flex align-items-center gap-3 mb-2">
                          <img
                            src={comment.image}
                            className="rounded-circle mb-3"
                            alt={`Comment ${i}`}
                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                          />
                          <p className="text-muted fst-italic">"{comment.message}"</p>
                        </div>
                      ))}
                      <h5 className="fw-bold fst-italic">{testimonial.name}</h5>
                    </div>
                  </div>
                ))}

            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-5">Add Your Comments</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <form className="p-4 rounded-3 shadow-sm bg-white" onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label fw-bold">Profile Image</label>
                <input
                  type="file"
                  id="image"
                  name="file"
                  className="form-control"
                  placeholder="Your Image URL"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-bold">Comment</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button type="submit" disabled={loading} className="btn btn-dark w-100 rounded-pill">
                {loading ? 'sending...' : 'send'}
              </button>

            </form>
          </div>
          <div className="col-md-6">
            <div className="p-4 rounded-3 shadow-sm bg-white h-100">
              <h4 className="d-flex align-items-center mb-3">
                <span className="me-2">📍</span> Our Location
              </h4>
              <p className="text-muted">123 Novel Street, Booktown, BK 45678</p>
              <h4 className="d-flex align-items-center mb-3">
                <span className="me-2">📧</span> Email Us
              </h4>
              <p className="text-muted">support@novelread.com</p>
              <h4 className="d-flex align-items-center mb-3">
                <span className="me-2">📞</span> Call Us
              </h4>
              <p className="text-muted">+123 456 7890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
