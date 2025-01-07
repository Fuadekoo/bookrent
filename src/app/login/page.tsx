"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../lib/axiosInstance';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/auth', { email, password });
      const data = response.data;
      localStorage.setItem('token', data.token); // Save token to local storage
      router.push('/'); // Redirect to the home page or any other page
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex w-full">
        <div className="w-1/2 bg-blue-950 flex items-center justify-center">
          <div className="text-white text-6xl flex flex-col items-center">
            <img src="/path-to-your-image.png" alt="Your Image" className="mb-4" />
            <i className="fas fa-book"></i>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Book Rent</h1>
            <form onSubmit={handleLogin} className="rounded pt-6 pb-8 mb-4 ml-0">
              <div className="mb-4 relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
                />
                <label
                  className="absolute left-2 -top-2.5 px-1 text-sm text-gray-700 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-700"
                  htmlFor="email"
                >
                  Email address
                </label>
              </div>
              <div className="mb-4 relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
                />
                <label
                  className="absolute left-2 -top-2.5  px-1 text-sm text-gray-700 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              {error && <p className="text-red-500 text-xs italic">{error}</p>}
              <div className="flex items-center justify-between mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
              </div>
              <div className="text-center mt-4">
                <span>Don't have an account?</span><a href="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Register
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;