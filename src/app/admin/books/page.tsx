"use client";
import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../../components/DefaultLayout';
import axiosInstance from '../../../lib/axiosInstance';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Books = () => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooksData(response.data);
      } catch (error) {
        console.error('Error fetching books data:', error);
      }
    };

    fetchBooksData();
  }, []);

  const toggleStatus = async (bookId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.patch(
        `/books/${bookId}`,
        { isActive: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the book status in state
        const updatedBooksData = booksData.map((book) =>
          book.id === bookId ? { ...book, isActive: !currentStatus } : book
        );
        setBooksData(updatedBooksData);
      }
    } catch (error) {
      console.error('Error updating book status:', error);
    }
  };

  const handleChangeStatus = (bookId, currentStatus) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to change the status of this book.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        toggleStatus(bookId, currentStatus);
        Swal.fire(
          'Changed!',
          'The status has been changed.',
          'success'
        );
      }
    });
  };

  return (
    <DefaultLayout>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Admin / Books</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">No.</th>
                <th className="py-2">Title</th>
                <th className="py-2">Author</th>
                <th className="py-2">Description</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {booksData.map((book, index) => (
                <tr key={book.id} className="text-center border-b">
                  <td className="py-2">{String(index + 1).padStart(2, '0')}</td>
                  <td className="py-2">{book.title}</td>
                  <td className="py-2">{book.author}</td>
                  <td className="py-2">{book.description}</td>
                  <td className="py-2">{book.quantity}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleChangeStatus(book.id, book.isActive)}
                      className={`inline-flex items-center px-2 py-1 border rounded-lg ${book.isActive ? 'bg-green-200' : 'bg-red-200'}`}
                    >
                      {book.isActive ? <FaCheck className="text-green-600 mr-1" /> : <FaTimes className="text-red-600 mr-1" />}
                      {book.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => handleChangeStatus(book.id, book.isActive)}
                      className="inline-flex items-center px-2 py-1 border rounded-lg bg-blue-200 hover:bg-blue-300"
                    >
                      <FaEdit className="text-blue-600 mr-1" />
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Books;