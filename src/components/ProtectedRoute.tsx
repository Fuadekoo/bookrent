"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import axios from 'axios';
import DefaultLayout from './DefaultLayout';
import { SetUser } from '../redux/usersSlice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.users);

  const validateToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        'http://localhost:5000/api/users/get-user-by-id',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      dispatch(HideLoading());
      if (response.data.success) {
        dispatch(SetUser(response.data.data));
      } else {
        localStorage.removeItem('token');
        message.error(response.data.message);
        router.push('/login');
      }
    } catch (error) {
      localStorage.removeItem('token');
      message.error(error.message);
      dispatch(HideLoading());
      router.push('/login');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken();
    } else {
      router.push('/login');
    }
  }, []);

  return <div>{user && <DefaultLayout>{children}</DefaultLayout>}</div>;
};

export default ProtectedRoute;