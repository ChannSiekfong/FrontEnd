import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { registerAPI } from '../api/authentication.api';


export const useRegister = () => {
  const navigate = useNavigate();
  const registerUser = async (username, email, hash_password, confirm_password) => {
    const data = await registerAPI(username, email, hash_password, confirm_password);

    if (data.status === "success") {
      navigate('/login');
    }

    return data;
  }
  return { registerUser };
}
