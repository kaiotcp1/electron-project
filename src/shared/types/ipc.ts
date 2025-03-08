export interface Customer {
  _id: string;
  _rev?: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
  address?: string;
  phone?: string;
};

export interface NewCustomer {
  name: string;
  address?: string
  email: string;
  role: string;
  phone?: string;
  status: boolean;
};

export interface ProjectInfo {
  electron: string;
  node: string;
  chrome: string;
  v8: string;
}