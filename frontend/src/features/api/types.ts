import { ObjectId } from "bson";
import React from "react"

export interface Product {
    _id?: ObjectId,
    name: string,
    price: number,
    quantity: number,
    description: string,
}

export interface FormData {
    email: string,
    password: string
}

export type ProductsList = Product[]

export interface LoginFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData
}