import React from "react"
import type { FormData } from "../features/api/types"

export const checkData = (formData: FormData) => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}")
    const {email, password} = formData
    if (!regex.test(email)) {
        return { isValid: false, msg: "Email Not Valid"}
    }
    else if (!(password.length > 4)) {
        return { isValid: false, msg: "Password Too Short"}
    }
    return { isValid: true, msg: "Successfully Signed In!"}
}

export const onChange = (setFormData: React.Dispatch<React.SetStateAction<{
    email: string;
    password: string;
}>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target as HTMLInputElement
    setFormData((prevState) => ({
        ...prevState,
        [result.id]: result.value
    }))
}
