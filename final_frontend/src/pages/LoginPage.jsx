import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';


function LoginPage() {
  const { login } = useAuth(); // login(token) from context
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and mark user as authenticated
        login(data.access); // Calls your context function
        localStorage.setItem("refresh_token", data.refresh); // Optional
      } else {
        setMessage(data.detail || 'Invalid credentials');
      }
    } catch (error) {
      setMessage('Something went wrong. Try again.');
    }
  };

//   return (
//     <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#add8e6', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//       <h2>Login</h2>
//       <p>Enter your credentials to access your dashboard</p>

//       {message && <p style={{ color: 'red' }}>{message}</p>}

//       <form onSubmit={handleSubmit} style={{ width: '300px', textAlign: 'left' }}>
//         <div style={{ marginBottom: '15px' }}>
//           <label>Username</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//             style={{ width: '100%', padding: '8px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             style={{ width: '100%', padding: '8px' }}
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             width: '100%',
//             padding: '10px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer'
//           }}
//         >
//           Login
//         </button>
//       </form>
//       <Button variant="destructive" className="ml-2">Destructive</Button>
//     </div>
//   );
// }




  return (
  <div className="bg-blue-400 min-h-screen">
    {message && <p style={{ color: 'red' }}>{message}</p>}

    <form className="m-auto p-[8rem] w-[18rem]" onSubmit={handleSubmit}>
        <div className="m-[1rem] w-full">
          <label >username</label>
          <Input className=" p-[1rem] my-[0.5rem]" placeholder="username" type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          />
        </div>

        <div className="m-[1rem] w-full">
          <label >password</label>
          <Input className=" p-[1rem] my-[0.5rem]" placeholder="password" type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          />
        </div>

        <Button className="p-[1rem] w-[20rem] m-[1rem] cursor-pointer" size="sm" 
        type="submit"
        >
          Submit
        </Button>
    </form>
  </div>
   
  )
}


 export default LoginPage;


