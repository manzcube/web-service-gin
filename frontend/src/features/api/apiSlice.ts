import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductsList, Product } from "./types";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/"
    }),
    endpoints: (builder) => ({
        // Here we're using unkown[] as fallback type so we don't have type error. But this should be changed to Product[] in production
        getAllProducts: builder.query<ProductsList, void>({
            query: () =>  ({
                url: "/products",
                method: "GET",
            })
        }),
        getOneProducts: builder.query<Product, { id: string }>({
            query: (id) =>  ({
                url: "/products",
                method: "GET",
            })
        }),
        createProduct: builder.mutation<Product, { body: Product }>({
            query: (body) =>  ({
                url: "/products",
                method: "POST",
                body,
            })
        }),
        updateProduct: builder.mutation<Product, { body: Product, id: string}>({
            query: ({ body, id }) =>  ({
                url: `/products/${id}`,
                method: "PUT",
                body,
            })
        }),
        deleteProduct: builder.mutation<Product, {id: string}>({
            query: (id) =>  ({
                url: `/products/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const { 
    useGetAllProductsQuery, 
    useCreateProductMutation, 
    useDeleteProductMutation,
    useGetOneProductsQuery, 
    useUpdateProductMutation 
} = apiSlice