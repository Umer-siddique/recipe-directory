
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// styles
import './App.css';
// components and pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Singup/Signup';
import Create from './pages/Create/Create';
import Search from './pages/search/Search'
import Navbar from './components/Navbar';
import Recipe from './pages/recipe/Recipe';
import Update from './pages/update/Update';


function App() {

  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search/>}/>
          <Route path="/recipes/:id" element={<Recipe/>}/>
          <Route path="/update/:id" element={<Update/>}/>
          <Route path="*" element={<h1 className="loading">Errro 404!  Page Not Found</h1>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
