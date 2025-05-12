import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handelChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    const emailex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailex.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (password.length < 6 || password.length > 8) {
      toast.error("Password must be between 6 and 8 characters long");
      return;
    }

    try {
      let response = await axios.post("https://novelwebbsckend.onrender.com/api/userlogin/insert", formData, {
        withCredentials: true,
      });
      const { email, token } = response.data;

      if (token) {
        // Conditionally set secure cookie only in production
        const isProduction = window.location.protocol === "https:";
        Cookies.set("token", token, {
          expires: 7,
          sameSite: 'Strict',
          ...(isProduction && { secure: true })
        });

        Cookies.set("email", email, {
          expires: 7,
          sameSite: 'Strict',
          ...(isProduction && { secure: true })
        });

        toast.success("Login successfully");

        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1500);

        return;
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
          <h3 className="text-center mb-3">Login</h3>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handelChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-control"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handelChange}
              />
            </div>

            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPasswordCheck"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label text-dark" htmlFor="showPasswordCheck">
                Show Password
              </label>
            </div>

            <div className="mb-3 text-end fw-bold ">
              <Link className='text-secondary text-decoration-none' to="/forgetpassword">Forget Password?</Link>
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>

            <div className="mt-2 text-center">
              <Link className='text-secondary text-decoration-none fw-bold' to="/userregister">Don't have an account? Register</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
