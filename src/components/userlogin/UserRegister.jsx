import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Spinner } from 'react-bootstrap';

const UserRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { name, email, password, phone } = formData;

    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (!phone) {
      toast.error("Phone Number is required");
      return;
    }
    if (phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }
    if (!email) {
      toast.error("Email is required");
      return;
    }
    const emailex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailex.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    if (password.length < 6 || password.length > 8) {
      toast.error("Password must be between 6 and 8 characters long");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post("https://novelwebbsckend.onrender.com/api/userregister/insert", formData);
      toast.success("User Registered Successfully...");
      setShowModal(true);
      setFormData({ name: "", email: "", password: "", phone: "" });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        console.error("Error inserting data:", error);
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode) {
      toast.error("Enter verification code");
      return;
    }
    try {
      setIsLoading(true);
      await axios.post("https://novelwebbsckend.onrender.com/api/userverify", {
        code: verificationCode
      });
      toast.success("Registered Successfully");
      setShowModal(false);
      setFormData({ name: "", email: "", password: "", phone: "" });
      setVerificationCode("");
      navigate("/userlogin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h3 className="text-center mb-4">Register</h3>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your contact"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPasswordCheck"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="showPasswordCheck">
                Show Password
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-2" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : 'Register'}
            </button>
          </form>
          <p className="text-center mb-2">Already have an account?</p>
          <Link to="/userlogin" className="btn btn-outline-primary w-100 text-decoration-none">
            Login
          </Link>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <div className="p-4 text-center">
            <h5 className="mb-3 text-danger">Enter Verification Code</h5>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button variant="success" onClick={handleVerify} disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : 'Verify'}
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default UserRegister;
