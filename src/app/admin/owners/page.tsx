"use client";
import React, { useState } from 'react';
import { FaTrash, FaEye, FaCheck } from 'react-icons/fa';
import DefaultLayout from '../../../components/DefaultLayout';

const AdminOwners = () => {
  const [selectedOwner, setSelectedOwner] = useState(null);

  const ownersData = [
    { id: 1, owner: 'Nardos T', email: 'nardos@gmail.com', location: 'Addis Ababa', phone: '0911555555', uploads: 15, status: 'Active' },
    { id: 2, owner: 'John Doe', email: 'john@gmail.com', location: 'Adama', phone: '0911222333', uploads: 10, status: 'Inactive' },
    { id: 3, owner: 'Jane Smith', email: 'jane@gmail.com', location: 'Dire Dawa', phone: '0911445566', uploads: 20, status: 'Active' },
    { id: 4, owner: 'Michael Johnson', email: 'michael@gmail.com', location: 'Gondar', phone: '0911667788', uploads: 8, status: 'Active' },
  ];

  const handleViewClick = (owner) => {
    setSelectedOwner(owner);
  };

  const handleCloseModal = () => {
    setSelectedOwner(null);
  };

  return (
    <DefaultLayout>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Admin / Owners</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">No.</th>
                <th className="py-2">Owner</th>
                <th className="py-2">Uploads</th>
                <th className="py-2">Location</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {ownersData.map((owner, index) => (
                <tr key={owner.id} className="text-center border-b">
                  <td className="py-2">{String(index + 1).padStart(2, '0')}</td>
                  <td className="py-2">{owner.owner}</td>
                  <td className="py-2">{owner.uploads} Books</td>
                  <td className="py-2">{owner.location}</td>
                  <td className="py-2">
                    <div className={`inline-flex items-center px-2 py-1 border rounded-lg bg-green-200`}>
                      <FaCheck className="text-green-500 mr-1" />
                      {owner.status}
                    </div>
                  </td>
                  <td className="py-2 flex justify-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleViewClick(owner)}>
                      <FaEye />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                  <td className="py-2">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded">Approve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedOwner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Owner Details</h2>
              <p><strong>Name:</strong> {selectedOwner.owner}</p>
              <p><strong>Email:</strong> {selectedOwner.email}</p>
              <p><strong>Location:</strong> {selectedOwner.location}</p>
              <p><strong>Phone Number:</strong> {selectedOwner.phone}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default AdminOwners;
