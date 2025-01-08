// filepath: /C:/Users/Fuad/Documents/project/bookrent/src/app/owner/bookUpload/page.tsx
"use client";
import React, { useState } from 'react';
import DefaultLayout from '../../../components/DefaultLayout';
import axiosInstance from '../../../lib/axiosInstance';

const Page = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    quantity: 0,
    coverPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('author', formData.author);
    form.append('description', formData.description);
    form.append('quantity', formData.quantity);
    form.append('coverPhoto', formData.coverPhoto);
    
    


    try {
        console.log('form title', form.title);
      const response = await axiosInstance.post('/books', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Book uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading book:', error);
    }
  };

  return (
    <DefaultLayout>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Upload Book</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverPhoto">
              Cover Photo
            </label>
            <input
              type="file"
              id="coverPhoto"
              name="coverPhoto"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Upload Book
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Page;