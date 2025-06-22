// src/components/Navbar.js
import React from 'react';
import { Link, useBeforeUnload, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button"




function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth()

  

  //the handleLogout function doesn't change the value of the state of isAuthenticated so it is always true and the Navbar be always be displayed even when you logout

  // const handleLogout = () => {
  //   // In a real app, this would clear auth tokens (e.g., from localStorage)
  //   console.log("Logging out...");
  //   localStorage.removeItem('userToken'); // Example: remove a dummy token
  //   navigate('/login'); // Redirect to login page
  
  // };

  //background: '#333',

  return (
    <nav style={{  padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: 0, fontSize: '20px' }}>Anti-Sleep App</h1>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
        <li style={{ marginLeft: '20px' }}><Link to="/dashboard" className='visited:text-blue-700 no-underline hover:underline hover:underline-offset-10 hover:decoration-2'>Dashboard</Link></li>
        <li style={{ marginLeft: '20px' }}><Link to="/heatmaps" className='no-underline hover:underline hover:underline-offset-10 hover:decoration-2'>Heatmaps</Link></li>
        <li style={{ marginLeft: '20px' }}><Link to="/report" className='no-underline hover:underline hover:underline-offset-10 hover:decoration-2'>Report</Link></li>
      </ul>
      <Button className="p-[1rem] w-[5rem] cursor-pointer" onClick={logout}>Logout</Button>
    </nav>
  );
}

export default Navbar;