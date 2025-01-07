"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, location, phone_number: phoneNumber }),
    });

    const data = await response.json();
    if (response.ok) {
      router.push('/login'); // Redirect to the login page or any other page
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex w-full">
        <div className="w-1/2 bg-blue-900 flex items-center justify-center">
          <div className="text-white text-6xl flex flex-col items-center">
            <img src="/path-to-your-image.png" alt="Your Image" className="mb-4" />
            <i className="fas fa-book"></i>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Book Rent</h1>
            <h2 className="text-xl mb-6 text-center">Signup as Owner</h2>
            <form onSubmit={handleRegister} className="rounded pt-6 pb-8 mb-4 ml-0">
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
              <div className="mb-4 relative">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
                />
                <label
                  className="absolute left-2 -top-2.5  px-1 text-sm text-gray-700 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-700"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mb-4 relative">
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
                />
                <label
                  className="absolute left-2 -top-2.5  px-1 text-sm text-gray-700 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-700"
                  htmlFor="location"
                >
                  Location
                </label>
              </div>
              <div className="mb-4 relative">
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
                />
                <label
                  className="absolute left-2 -top-2.5  px-1 text-sm text-gray-700 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-700"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
              </div>
              <label className="inline-flex items-center mt-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
                <span className="ml-2 text-gray-700">I accept the Terms and Conditions</span>
              </label>
              {error && <p className="text-red-500 text-xs italic">{error}</p>}
              <div className="flex items-center justify-between mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                  SIGN UP
                </button>
              </div>
              <div className="text-center mt-4">
                <span>Already have an account?</span><a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
