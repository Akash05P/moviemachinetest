import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Appbar() {
  const [movieName, setMovieName] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!movieName) return;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: 'c45a857c193f6302f2b5061c3b85e743',
            language: 'en-US',
            query: movieName,
            page: 1,
          },
        }
      );

      navigate('/search', { state: { results: response.data.results } });
      setMovieName('');
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-gray-800">
      <Container>
        <Navbar.Brand href="#home" className="text-white">MovieDb</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className="nav-link text-white" to="/popular">Popular</NavLink>
            <NavLink className="nav-link text-white" to="/toprated">Top Rated</NavLink>
            <NavLink className="nav-link text-white" to="/upcoming">Upcoming</NavLink>
          </Nav>
        </Navbar.Collapse>
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)} 
            placeholder="Movie Name" 
            className="p-2 rounded-lg focus:outline-none"
          />
          <button 
            className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
            onClick={handleSearch} 
          >
            Search
          </button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Appbar;
