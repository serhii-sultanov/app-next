export type AddressData = {
  address: string;
  city: string;
  postalCode: string;
  state: string;
};

export type UserData = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  address?: AddressData;
};

// coordinates: {
//   lat: number;
//   lng: number;
// };
