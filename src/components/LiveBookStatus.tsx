import React from 'react';
import { FaSearch, FaEllipsisV } from 'react-icons/fa';

const LiveBookStatus = () => {
  const bookStatusData = [
    { id: 1, bookNo: '6465', owner: 'Nardos T', ownerAvatar: '/ab.jpg', status: 'Rented', statusColor: 'bg-red-500', price: '40 Birr' },
    { id: 2, bookNo: '5665', owner: 'Harry M', ownerAvatar: '/ab.jpg', status: 'Free', statusColor: 'bg-blue-500', price: '0.0 Birr' },
    { id: 3, bookNo: '1755', owner: 'Tesfu N', ownerAvatar: '/ab.jpg', status: 'Free', statusColor: 'bg-blue-500', price: '0.0 Birr' },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold"></h2>
        <div className="flex items-center">
          <button className="text-gray-500 hover:text-gray-700 mr-4">
            <FaSearch />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">Book no.</th>
            <th className="py-2 px-4 border-b">Owner</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Price</th>
          </tr>
        </thead>
        <tbody>
          {bookStatusData.map((book, index) => (
            <tr key={book.id}>
              <td className="py-2 px-4 border-b">{String(index + 1).padStart(2, '0')}</td>
              <td className="py-2 px-4 border-b">{book.bookNo}</td>
              <td className="py-2 px-4 border-b flex items-center">
                <img src={book.ownerAvatar} alt={book.owner} className="w-6 h-6 rounded-full mr-2" />
                {book.owner}
              </td>
              <td className="py-2 px-4 border-b">
              <span className={`w-3 h-3 ${book.statusColor} rounded-full mr-2`}>.</span> 
              {book.status}
              </td>
              <td className="py-2 px-4 border-b">{book.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveBookStatus;
