import axios from './helpers/axios';
import { UserData } from '../types';

type UserResponse = {
  users: UserData[];
  total?: number;
};

export async function getAllUsers(): Promise<UserData[]> {
  const response = await axios.get<UserResponse>('/users');
  const allUsers = response.data.users;
  return allUsers;
}

export async function getUserById(id: number): Promise<UserData> {
  const response = await axios.get<UserData>(`/users/${id}`);
  const user: UserData = response.data;
  return user;
}

export async function getUsersPerPage(
  limit: number,
  skip: number,
): Promise<UserResponse> {
  const response = await axios.get<UserResponse>(
    `/users?limit=${limit}&skip=${skip}`,
  );
  const users = response.data;
  return users;
}

export async function getUsersByName(name: string): Promise<UserData[]> {
  const response = await axios.get(
    `https://dummyjson.com/users/search?q=${name}`,
  );
  return response.data;
}
