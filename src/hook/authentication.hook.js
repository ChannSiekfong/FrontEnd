import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginAPI, registerAPI, logoutAPI } from '../api/authentication.api';


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

export const useLogin = () => {
  const navigate = useNavigate();
  const loginUser = async (email, hash_password) => {
    const data = await loginAPI(email, hash_password);
    navigate('/profiles');
    return data;
  }
  return { loginUser };
}

export const useLogout = () => {
  const navigate = useNavigate();
  const logoutUser = async () => {
    const data = await logoutAPI();
    if (data.status === "success") {
      navigate('/login');
    }
    return data;
  }
  return { logoutUser };
}
