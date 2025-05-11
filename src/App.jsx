import './App.css';
import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Main/Navbar';
import Footer from './components/Main/Footer';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Books from './components/Pages/Books';
import Favorite from './components/Pages/Favorite';
import Details from './components/Pages/Details';
import Readpage from './components/Pages/Readpage';
import UserLogin from './components/userlogin/UserLogin';
import UserRegister from './components/userlogin/UserRegister';
import Forgetpassword from './components/userlogin/Forgetpassword';

function App() {
  const auth = Cookies.get("email");

  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Books />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path='/userlogin' element={<UserLogin />} />
          <Route path='/userregister' element={<UserRegister />} />
          <Route path='/forgetpassword' element={<Forgetpassword />} />
          <Route path="/category/:id" element={<Details />} />
          <Route path="/readpage/:id" element={auth ? <Readpage /> : <UserLogin />} />
          <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
