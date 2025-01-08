"use client";
import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../../components/DefaultLayout';
import axiosInstance from '../../../lib/axiosInstance';
import { FaCheck, FaTimes, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminOwners = () => {
  const [ownersData, setOwnersData] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    const fetchOwnersData = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setOwnersData(response.data);
      } catch (error) {
        console.error('Error fetching owners data:', error);
      }
    };

    fetchOwnersData();
  }, []);

  const toggleStatus = async (ownerId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.patch(
        `/users/${ownerId}`,
        { isActive: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the owner status in state
        const updatedOwnersData = ownersData.map((owner) =>
          owner.id === ownerId ? { ...owner, isActive: !currentStatus } : owner
        );
        setOwnersData(updatedOwnersData);
      }
    } catch (error) {
      console.error('Error updating owner status:', error);
    }
  };

  const handleChangeStatus = (ownerId, currentStatus) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to change the status of this owner.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        toggleStatus(ownerId, currentStatus);
        Swal.fire(
          'Changed!',
          'The status has been changed.',
          'success'
        );
      }
    });
  };

  const handleViewClick = (owner) => {
    setSelectedOwner(owner);
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
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone Number</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {ownersData.map((owner, index) => (
                <tr key={owner.id} className="text-center border-b">
                  <td className="py-2">{String(index + 1).padStart(2, '0')}</td>
                  <td className="py-2">{owner.name}</td>
                  <td className="py-2">{owner.email}</td>
                  <td className="py-2">{owner.phone_number}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleChangeStatus(owner.id, owner.isActive)}
                      className={`inline-flex items-center px-2 py-1 border rounded-lg ${owner.isActive ? 'bg-green-200' : 'bg-red-200'}`}
                    >
                      {owner.isActive ? <FaCheck className="text-green-600 mr-1" /> : <FaTimes className="text-red-600 mr-1" />}
                      {owner.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-2 flex justify-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleViewClick(owner)}>
                      <FaEye />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedOwner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Modal content for viewing owner details */}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default AdminOwners;