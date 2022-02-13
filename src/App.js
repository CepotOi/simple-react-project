import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Error404 from './pages/Error404';

function App() {
  return (
    <div className="App">
      <nav>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/contact">contact</Link></li>
        <li><Link to="/blogs">Blog</Link></li>
        <li><Link to="/">Home</Link></li>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blogs" element={<Blog />} />
        <Route path="blogs/:id" element={<BlogDetails />} />
        <Route path="*" element={<Error404 status="404" message="Page Not Found" />} />
      </Routes>
    </div>
  );
}

export default App;
