import axios from './helpers/axios';
import { UserData } from '../types';

type UserResponse = {
  users: UserData[];
  total?: number;
};

export const getAllUsers = async (): Promise<UserData[]> => {
  const response = await axios.get<UserResponse>('/users');
  const allUsers = response.data.users;
  return allUsers;
};

export const getUserById = async (id: number): Promise<UserData> => {
  const response = await axios.get<UserData>(`/users/${id}`);
  const user: UserData = response.data;
  return user;
};

export const getUsersPerPage = async (
  limit: number,
  skip: number,
): Promise<UserResponse> => {
  const response = await axios.get<UserResponse>(
    `/users?limit=${limit}&skip=${skip}`,
  );
  const users = response.data;
  return users;
};

export const getUsersByName = async (name: string): Promise<UserData[]> => {
  const response = await axios.get(
    `https://dummyjson.com/users/search?q=${name}`,
  );
  return response.data;
};
