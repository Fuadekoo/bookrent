import React from 'react';
import Link from 'next/link';
import DefaultLayout from '../../../components/DefaultLayout';

const Books = () => {
  const booksData = [
    { id: 1, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
    { id: 2, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
    { id: 3, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
    { id: 4, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
    { id: 5, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
    { id: 6, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
    { id: 7, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
    { id: 8, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
    { id: 9, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
    { id: 10, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
  ];

  return (
    <DefaultLayout>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h1 className="text-center text-2xl font-bold mb-6">Books</h1>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-200 text-left">No.</th>
              <th className="py-3 px-4 bg-gray-200 text-left">Author</th>
              <th className="py-3 px-4 bg-gray-200 text-left">Owner</th>
              <th className="py-3 px-4 bg-gray-200 text-left">Category</th>
              <th className="py-3 px-4 bg-gray-200 text-left">Book Name</th>
              <th className="py-3 px-4 bg-gray-200 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {booksData.map((book, index) => (
              <tr key={book.id} className="border-b">
                <td className="py-3 px-4">{String(index + 1).padStart(2, '0')}</td>
                <td className="py-3 px-4">{book.author}</td>
                <td className="py-3 px-4 flex items-center">
                  <img src="/ab.jpg" alt="Profile" className="w-8 h-8 rounded-full mr-3" />
                  {book.owner}
                </td>
                <td className="py-3 px-4">{book.category}</td>
                <td className="py-3 px-4">{book.bookName}</td>
                <td className="py-3 px-4">
                  <span className="text-green-600">{book.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default Books;
