import React from "react";

export interface Item {
  id: number;
  icon: JSX.Element;
  name: string;
  path: string;
}
export interface IUser {
  _id: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: number;
  pictureProf: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IButton {
  text: React.ReactNode;
  onClick?: () => void | any;
  disable?: any;
  className?: string;
  type?: "reset" | "submit";
}
export interface IPageN {
  text: string;
}
export interface IProduct {
  _id: string;
  stock: number;
  status: boolean;
  category: string;
  imageUrl: string;
  name: string;
  summary: string;
  description: string;
  price: number;
}
export interface ICardProduct {
  _id: string;
  imageUrl: string;
  name: string;
  summary: string;
  description: string;
  price: number;
}
export interface IDropDown {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface IAlert {
  message: string;
  onConfirm?: () => void;
  onCancle?: () => void;
}
export interface ICategories {
  _id: string;
  name: string;
  description: string;
}

export interface ISuccessMes {
  onCancle?: () => void;
  message: string;
  HomeMes?: string;
}

export interface IRoles {
  _id: string;
  name: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface SignUpValues {
  userName: string;
  email: string;
  password: string;
  role: string;
}
