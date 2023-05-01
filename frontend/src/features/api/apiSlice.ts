import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductsList, ProductType } from "./types";

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
        getOneProducts: builder.query<ProductType, { id: string }>({
            query: (id) =>  ({
                url: "/products",
                method: "GET",
            })
        }),
        createProduct: builder.mutation<ProductType, { body: ProductType }>({
            query: (body) =>  ({
                url: "/products",
                method: "POST",
                body,
            })
        }),
        updateProduct: builder.mutation<ProductType, { body: ProductType, id: string}>({
            query: ({ body, id }) =>  ({
                url: `/products/${id}`,
                method: "PUT",
                body,
            })
        }),
        deleteProduct: builder.mutation<ProductType, {id: string}>({
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