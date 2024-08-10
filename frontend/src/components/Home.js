import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 

export default function Home() {
  return (
    <div className='container'>
      <h1>Welcome to Weather App!</h1>
      <Button variant="primary">
        <Link to="/weather" style={{ color: 'white', textDecoration: 'none' }}>
          Getting Started
        </Link>
      </Button>
    </div>
  );
}
