import axios from 'axios';
import { UserData, UserResponse } from '../types';

const API_USERS_URL = 'https://dummyjson.com/users';

export const getAllUsers = async (): Promise<UserData[]> => {
  const response = await axios.get<UserResponse>(`${API_USERS_URL}`);
  const allUsers = response.data.users;
  return allUsers;
};

export const getUserById = async (id: number): Promise<UserData> => {
  const response = await axios.get<UserData>(`${API_USERS_URL}/${id}`);
  const user: UserData = response.data;
  return user;
};

export const getUsersPerPage = async (
  limit: number,
  skip: number,
): Promise<UserResponse> => {
  const response = await axios.get<UserResponse>(
    `${API_USERS_URL}`, {
      params: {
        limit,
        skip,
      },
    });
    return response.data;
};

export const getUserByName = async (name: string): Promise<UserData> => {
  const response = await axios.get(`https://dummyjson.com/users/search`, {
    params: {
      q: name,
    },
  });
  const [user] = response.data.users;
  return user;
};
