import axios from 'axios';
import { UserData, UserResponse } from '../../types';

const API_USERS_URL = 'https://dummyjson.com/users';

export const getUserById = async (USER_ID: number): Promise<UserData> => {
  const response = await axios.get<UserData>(`${API_USERS_URL}/${USER_ID}`);
  const user: UserData = response.data;
  return user;
};

export const getUsersPerPage = async (
  limit: number,
  skip: number,
): Promise<UserResponse> => {
  const response = await axios.get<UserResponse>(`${API_USERS_URL}`, {
    params: {
      limit,
      skip,
    },
  });
  return response.data;
};

export const searchUsersByQuery = async (
  USER_NAME: string,
  signal: AbortSignal,
): Promise<UserData[]> => {
  try {
    const response = await axios.get(`https://dummyjson.com/users/search`, {
      params: {
        q: USER_NAME,
      },
      signal,
    });
    return response.data.users;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
