import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="text-center bg-secondary p-3">
        <h1 className="mb-4">Cyber Gaming App</h1>
        <div className="btn-group-vertical">
          <h3 className="mb-3">You are...</h3>
          <Link to="/admin" className="btn btn-primary mb-3">Admin</Link>
          <Link to="/staff" className="btn btn-success mb-3">Staff</Link>
          <Link to="/customer" className="btn btn-info">Customer</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
