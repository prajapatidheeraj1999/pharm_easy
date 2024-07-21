"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setToken, setUserId } from '@/store/cartSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('https://dummyjson.com/auth/login', { username, password });
      const { token,id} = response.data;
      console.log("response",response)

      // Save the toke sessionStorage or cookie
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem("userId",id)
      dispatch(setUserId(id))
      dispatch(setToken(token))


      // Redirect to the dashboard or home page
      router.push('/');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg sm:w-11/12 md:w-full lg:w-4/12">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-primary-100"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-primary-100"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-primary-default rounded-md hover:opacity-90 focus:outline-none focus:opacity-90"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
