import { ObjectId } from "bson";
import React from "react"

export interface ProductType {
    _id?: ObjectId,
    name: string,
    price: number,
    qty: number,
    description: string,
    img: string,
}

export interface ProductProps {
    prod: {
        name: string;
        price: number;
        qty: number;
        description: string;
        img: string;
    };
    index: number;
}

export interface FormData {
    email: string,
    password: string
}

export type ProductsList = ProductType[]

export interface LoginFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
    msg: string;
}