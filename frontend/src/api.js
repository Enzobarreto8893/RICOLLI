import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia a la URL de tu backend

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
