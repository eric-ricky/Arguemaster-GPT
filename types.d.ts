export interface IUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  phone: string;
  createdAt?: string;
}

export interface IHistory {
  id: string;
  issue: string;
  position: string;
  argument: string;
}
